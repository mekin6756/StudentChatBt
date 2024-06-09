import { NextFunction, Request, Response } from "express"
import { AppDataSource} from "../data-source";
import { Complaint, Doubts, Faculty, Feedback, GeneralForm, Leave, Session, Student, User } from "../entity/schema";
import { DialogueOption, FormDialogue } from "../fsm";
import { getSentenceSimilarity } from "../ml/similarity";
import { DropdownElementType } from "../form";
import { OtherForm } from "../forms";
import { StudentFSM } from "../dialogues.ts/student";
import { Equal } from "typeorm";

export class FormController {
    private userRepository = AppDataSource.getRepository(User)
    private sessionRepository = AppDataSource.getRepository(Session)
    private facultyRepository = AppDataSource.getRepository(Faculty)

    async getDoubts(request: Request, response: Response, next: NextFunction) {
        let session = request.cookies["sessionToken"];

        let sessObj = await this.sessionRepository.findOne({
            where: {
                sessionToken: session
            },
            relations: {
                user: true
            }
        });
        if (sessObj == null)
            return {
                success: false,
                reason: "expired"
            }
        let userType = sessObj.user.type;
        if (userType === "faculty") {
            let doubtRepository = AppDataSource.getRepository(Doubts);
            let doubts = await doubtRepository.find({
                where: {
                    faculty: {
                        user: {
                            id: sessObj.user.id
                        }
                    }
                },
                relations: {
                    subject: true,
                    student: true,
                }
            });
            return {
                success: true,
                doubts: doubts
            }
        }
        return {
            success: false,
            reason: "unauthorized"
        }
    }

    async getLeaves(request: Request, response: Response, next: NextFunction) {
        let session = request.cookies["sessionToken"];

        let sessObj = await this.sessionRepository.findOne({
            where: {
                sessionToken: session
            },
            relations: {
                user: true
            }
        });
        if (sessObj == null)
            return {
                success: false,
                reason: "expired"
            }
        let userType = sessObj.user.type;
        if (userType === "faculty") {
            let facultyObj = await this.facultyRepository.findOne({
                where: {
                    user: {
                        id: sessObj.user.id
                    }
                }
            });

            if (facultyObj.counsellor) {
                let leaveRepository = AppDataSource.getRepository(Leave);
                let leaves = await leaveRepository.find({
                    where: {
                        student: {
                            counsellor: {
                                id: Equal(facultyObj.id)
                            }
                        }
                    },
                    relations: {
                        student: true
                    }
                });
                return {
                    success: true,
                    leaves: leaves
                }
            } else {
                return {
                    success: false,
                    reason: "unauthorized"
                }
            }
        }
        if (userType === "student") {
            let leaveRepository = AppDataSource.getRepository(Leave);
            let leaves = await leaveRepository.find({
                where: {
                    student: {
                        user: {
                            id: sessObj.user.id
                        }
                    }
                }
            });
            return {
                success: true,
                leaves: leaves
            }
        }
    }

    async getFeedbacks(request: Request, response: Response, next: NextFunction) {
        let session = request.cookies["sessionToken"];

        let sessObj = await this.sessionRepository.findOne({
            where: {
                sessionToken: session
            },
            relations: {
                user: true
            }
        });
        if (sessObj == null)
            return {
                success: false,
                reason: "expired"
            }
        let userType = sessObj.user.type;
        if (userType === "faculty") {
            let feedbackRepository = AppDataSource.getRepository(Feedback);
            let feedbackDb = await feedbackRepository.find({
                where: {
                    subject: {
                        faculty: {
                            user: {
                                id: sessObj.user.id
                            }
                        }
                    }
                },
                relations: {
                    options: true,
                    subject: true
                }
            });
            // Calculate scores for each subject, for each option for the feedback
            let feedbackPerSubject = new Map<string, Feedback[]>();
            for (const feedback of feedbackDb) {
                if (feedbackPerSubject.has(feedback.subject.subjectCode))
                    feedbackPerSubject.get(feedback.subject.subjectCode)?.push(feedback);
                else
                    feedbackPerSubject.set(feedback.subject.subjectCode, [feedback]);
            }
            let feedbackState = StudentFSM.states.get("feedback_form") as FormDialogue;
            let fieldDisplays = new Map(feedbackState.form.fields.filter(x => x.id !== "subject" && x.id !== "otherinput").map(y => {
                return [y.id, {
                    question: y.name,
                    options: new Map((y.inputType as DropdownElementType).options.map(z => [z.id, z.display]))
                }];
            }));
            let subjectDictObj = new Object();
            for (const [subjectId, feedbacks] of feedbackPerSubject) {
                let optionAccumulator = new Map<string, Map<string, number>>();
                let otherInputs = [];

                // Add the blanks
                for (const [key, value] of fieldDisplays) {
                    optionAccumulator.set(value.question, new Map([...value.options.values()].map(x => [x, 0])));
                }

                for (const feedback of feedbacks) {
                    for (const option of feedback.options) {
                        if (option.question === "otherinput") {
                            otherInputs.push(option.reply);
                            continue;
                        }

                        let optDisplays = fieldDisplays.get(option.question);

                        let optQ = optDisplays.question;
                        let optR = optDisplays.options.get(option.reply);
                        
                        if (optionAccumulator.has(optQ)) {
                            let optReply = optionAccumulator.get(optQ);
                            if (optReply.has(optR))
                                optReply.set(optR, optReply.get(optR) + 1);
                            else
                                optReply.set(optR, 1);
                            optionAccumulator.set(optQ, optReply);
                        } else {
                            let optReply = new Map<string, number>();
                            optReply.set(optR, 1);
                            optionAccumulator.set(optQ, optReply);
                        }
                    }
                }
                
                let subjectObj = new Object();
                for (const [key, value] of optionAccumulator) {
                    subjectObj[key] = new Object();
                    let total = 0;
                    for (const [key2, value2] of value) {
                        total += value2;
                    }
                    for (const [key2, value2] of value) {
                        subjectObj[key][key2] = value2 / total;
                    }
                }
                subjectDictObj[subjectId] = subjectObj;
                subjectDictObj[subjectId]["otherinputs"] = otherInputs;
            }

            return {
                success: true,
                feedbacks: subjectDictObj
            }
        }
    }

    async getOtherForms(request: Request, response: Response, next: NextFunction) {
        let session = request.cookies["sessionToken"];

        let sessObj = await this.sessionRepository.findOne({
            where: {
                sessionToken: session
            },
            relations: {
                user: true
            }
        });
        if (sessObj == null)
            return {
                success: false,
                reason: "expired"
            }
        let userType = sessObj.user.type;
        if (userType === "faculty") {
            let facultyObj = await this.facultyRepository.findOne({
                where: {
                    user: {
                        id: sessObj.user.id
                    }
                }
            });
            if (facultyObj.counsellor) {
                let otherRepository = AppDataSource.getRepository(GeneralForm);
                let allForms = await otherRepository.find({
                    where: {
                        student: {
                            counsellor: {
                                id: Equal(facultyObj.id)
                            }
                        }
                    },
                    relations: {
                        student: true
                    }
                });

                return {
                    success: true,
                    forms: allForms
                }
            } else {
                return {
                    success: false,
                    reason: "unauthorized"
                }
            }
        }

        return {
            success: false,
            reason: "unauthorized"
        }
    }

    async getComplaints(request: Request, response: Response, next: NextFunction) {
        let session = request.cookies["sessionToken"];

        let sessObj = await this.sessionRepository.findOne({
            where: {
                sessionToken: session
            },
            relations: {
                user: true
            }
        });
        if (sessObj == null)
            return {
                success: false,
                reason: "expired"
            }
        let userType = sessObj.user.type;
        if (userType === "faculty") {
            let facultyObj = await this.facultyRepository.findOne({
                where: {
                    user: {
                        id: sessObj.user.id
                    }
                }
            });
            if (facultyObj.counsellor) {
                let otherRepository = AppDataSource.getRepository(Complaint);
                let allForms = await otherRepository.find({
                    where: {
                        student: {
                            counsellor: {
                                id: Equal(facultyObj.id)
                            }
                        }
                    },
                    relations: {
                        student: true
                    }
                });

                return {
                    success: true,
                    forms: allForms
                }
            } else {
                return {
                    success: false,
                    reason: "unauthorized"
                }
            }
        }

        return {
            success: false,
            reason: "unauthorized"
        }
    }

    async updateStatus(request: Request, response: Response, next: NextFunction) {
        let session = request.cookies["sessionToken"];

        let sessObj = await this.sessionRepository.findOne({
            where: {
                sessionToken: session
            },
            relations: {
                user: true
            }
        });
        if (sessObj == null)
            return {
                success: false,
                reason: "expired"
            }
        
        let jsonBody = request.body;
        if (jsonBody.type === "leave") {
            let leaveRepo = AppDataSource.getRepository(Leave);
            await leaveRepo.update({
                id: jsonBody.id
            }, {
                status: jsonBody.status
            });
            return {
                success: true,
                reason: "updated"
            }
        }
        if (jsonBody.type === "doubt") {
            let doubtRepo = AppDataSource.getRepository(Doubts);
            await doubtRepo.update({
                id: jsonBody.id
            }, {
                status: jsonBody.status
            });
            return {
                success: true,
                reason: "updated"
            }
        }

        return {
            success: false,
            reason: "unauthorized"
        }
    }
}