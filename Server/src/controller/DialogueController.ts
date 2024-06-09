import { NextFunction, Request, Response } from "express"
import { AppDataSource } from "../data-source";
import { Faculty, Session, Student, User } from "../entity/schema";
import { DialogueOption, FSM, FSMState } from "../fsm";
import { getSentenceSimilarity } from "../ml/similarity";
import { StudentFSM } from "../dialogues.ts/student";
import { FacultyFSM } from "../dialogues.ts/faculty";

export class DialogueController {
    private userRepository = AppDataSource.getRepository(User)
    private sessionRepository = AppDataSource.getRepository(Session)

    async advanceDialogue(request: Request, response: Response, next: NextFunction) {
        let jsonBody = request.body;
        let session = request.cookies["sessionToken"];
        let chosenState = jsonBody.chosenState;
        let params = jsonBody.params;

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
        if (userType === "student") {
            let studentRepository = AppDataSource.getRepository(Student);
            let student = await studentRepository.findOne({
                where: {
                    user: {
                        id: sessObj.user.id
                    }
                }
            });

            let transitionResult = await StudentFSM.transition(student.id, chosenState, params);

            return {
                success: true,
                ...transitionResult
            }
        }

        if (userType === "faculty") {
            let facultyRepository = AppDataSource.getRepository(Faculty);
            let faculty = await facultyRepository.findOne({
                where: {
                    user: {
                        id: sessObj.user.id
                    }
                }
            });

            return {
                success: true,
                ...await FacultyFSM.transition(faculty.id, chosenState, params)
            }
        }

        return {
            success: false,
            reason: "notfound"
        }
    }

    async chooseBestOption(request: Request, response: Response, next: NextFunction) {
        let jsonBody = request.body;
        let userInput = (jsonBody.userInput as string).toLowerCase().trim();
        let options = jsonBody.chatOptions as DialogueOption[];

        let similarityMap = new Map<DialogueOption, number>();

        console.log(`Received similarity event for ${options.length} options`);

        for (let opt of options) {
            let similarity = await getSentenceSimilarity(userInput, opt.display.toLowerCase().trim());
            console.log(`Similarity ${similarity} for ${userInput} vs ${opt.display}`);
            similarityMap.set(opt, similarity);
        }

        let highestSimilarityEl: DialogueOption = null;
        for (const [key, value] of similarityMap) {
            if (value > 0.3 && (highestSimilarityEl === null || similarityMap.get(highestSimilarityEl) < value)) {
                highestSimilarityEl = key;
            }
        }
        if (highestSimilarityEl !== null) {
            return {
                success: true,
                option: highestSimilarityEl.display
            }
        } else {
            return {
                success: false
            }
        }
    }

    async submitForm(request: Request, response: Response, next: NextFunction) {
        let jsonBody = request.body;
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
        
        let formData = jsonBody.formData;
        let state = jsonBody.state;

        let userObj: number;
        let fsmState: FSMState;
        let fsm: FSM;

        let userType = sessObj.user.type;
        if (userType === "student") {
            let studentRepository = AppDataSource.getRepository(Student);
            let student = await studentRepository.findOne({
                where: {
                    user: {
                        id: sessObj.user.id
                    }
                }
            });
            userObj = student.id;

            fsmState = StudentFSM.states.get(state);
            fsm = StudentFSM;
        }

        if (userType === "faculty") {
            let facultyRepository = AppDataSource.getRepository(Faculty);
            let faculty = await facultyRepository.findOne({
                where: {
                    user: {
                        id: sessObj.user.id
                    }
                }
            });
            userObj = faculty.id;

            fsmState = FacultyFSM.states.get(state);
            fsm = FacultyFSM;
        }

        if (fsmState.type === "form") {
            let transitionState = await fsmState.submitFn(userObj, formData);
            let afterTransitionState = await fsm.transition(userObj, transitionState.nextState, transitionState.data);
            return {
                success: true,
                ...afterTransitionState
            }
        }

        return {
            success: false,
            reason: "invalid"
        }
    }
}