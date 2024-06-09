import { AppDataSource } from "../data-source";
import { Result, Fees, Notice, Leave, Student, Doubts, Feedback, Options, Complaint, GeneralForm, Subject } from "../entity/schema";
import { LeaveForm, DoubtForm, FeedbackForm, ComplaintForm, OtherForm } from "../forms";
import { FSM } from "../fsm";

export const StudentFSM = new FSM([
    {
        id: "root",
        display: ["Hello student, what would you like to do?"],
        type: "user",
        options: [
            {
                display: "Exam results",
                nextStateId: "results_root",
            },
            {
                display: "Fee payment",
                nextStateId: "fees_root",
            },
            {
                display: "Notices",
                nextStateId: "notices_root",
            },
            {
                display: "Forms",
                nextStateId: "forms_root",
            },
            {
                display: "Schedule",
                nextStateId: "schedule_root"
            },
            {
                display: "Doubts",
                nextStateId: "doubts_root"
            }
        ],
    },
    {
        id: "root_back",
        display: [],
        type: "user",
        options: [
            {
                display: "Back",
                nextStateId: "root",
            },
        ],
    },
    {
        id: "results_root",
        type: "databaseEval",
        display: ["Which semester results would you like to see?"],
        optionFunc: async (userId: number, data: any) => {
            let storageSource = AppDataSource.getRepository(Result);
            let results = await storageSource.find({
                where: {
                    student: {
                        id: userId,
                    },
                },
            });
            let semList = [...new Set(results.map((x) => x.semester))];

            return semList.map((x) => {
                return {
                    display: `Sem ${x}`,
                    nextStateId: "results_semester",
                    data: x,
                };
            });
        },
    },
    {
        id: "results_semester",
        type: "database",
        retrieveFunc: async (userId: number, data: any) => {
            let storageSource = AppDataSource.getRepository(Result);
            let results = await storageSource.find({
                where: {
                    semester: data,
                    student: {
                        id: userId,
                    },
                },
                relations: {
                    subject: true
                }
            });
            return {
                nextState: "root_back",
                data: results,
            };
        },
        displayFunc: (data: any) => {
            let results = data as Result[];
            let strs = ["Your results for the specified semester are:"];
            for (let result of results) {
                strs.push(`${result.subject.subjectCode} of ${result.credits} credits: ${result.grade}`);
            }
            strs.push(`SPI: ${results[0].spi} | CPI: ${results[0].cpi}`);
            return strs;
        },
    },
    {
        id: "fees_root",
        type: "database",
        retrieveFunc: async (userId: number, data: any) => {
            let storageSource = AppDataSource.getRepository(Fees);
            let fees = await storageSource.find({
                where: {
                    student: {
                        id: userId,
                    },
                },
            });
            return {
                nextState: "root_back",
                data: fees,
            };
        },
        displayFunc: (data: any) => {
            let fees = data as Fees[];
            let strs = ["You have paid the following fees:"];
            let hasPendingFees = false;
            for (let fee of fees) {
                if (fee.paid) strs.push(`Semester ${fee.semester} fee of ${fee.amount} Rupees`);
                else hasPendingFees = true;
            }
            if (hasPendingFees) {
                strs.push("You have the following pending fees:");
                for (let fee of fees) {
                    if (!fee.paid) strs.push(`Semester ${fee.semester} fee of ${fee.amount} Rupees`);
                }
            } else {
                strs.push("You have no pending fees");
            }

            return strs;
        },
    },
    {
        id: "notices_root",
        type: "databaseEval",
        display: ["Which type of notices would you like to browse?"],
        optionFunc: async (userId: number) => {
            let noticeSource = AppDataSource.getRepository(Notice);
            let noticeTypes = await noticeSource.createQueryBuilder().select("type").distinct(true).getRawMany();
            return noticeTypes.map((x) => {
                return {
                    nextStateId: "notices_type",
                    data: x.type,
                    display: x.type,
                };
            });
        },
    },
    {
        id: "notices_type",
        type: "databaseEval",
        display: ["Which notice would you like to see?"],
        optionFunc: async (userId: number, data: any) => {
            let noticeSource = AppDataSource.getRepository(Notice);
            let notices = await noticeSource.find({
                where: {
                    type: data,
                },
            });
            return notices.map((x) => {
                return {
                    display: x.title,
                    nextStateId: "notices_view",
                    data: x.id,
                };
            });
        },
    },
    {
        id: "notices_view",
        type: "database",
        retrieveFunc: async (userId: number, data: any) => {
            let noticeSource = AppDataSource.getRepository(Notice);
            let notice = await noticeSource.findOne({
                where: {
                    id: data,
                },
            });
            return {
                nextState: "root_back",
                data: notice,
            };
        },
        displayFunc: (data: any) => {
            let notice = data as Notice;
            return [notice.content];
        },
    },
    {
        id: "forms_root",
        type: "databaseEval",
        display: ["Which of the forms would you like to submit?"],
        optionFunc: async (userId: number) => {
            let leaveSource = AppDataSource.getRepository(Leave);
            let leave = await leaveSource.findOne({
                where: {
                    student: {
                        id: userId
                    },
                    status: "pending"
                }
            });
            let opts = [
                {
                    display: "Leave Application",
                    nextStateId: leave === null ? "leave_form" : "leave_form_pending",
                },
                {
                    display: "Feedback Form",
                    nextStateId: "feedback_form",
                },
                {
                    display: "Complaint Form",
                    nextStateId: "complaint_form",
                },
                {
                    display: "Other Form",
                    nextStateId: "other_form",
                },
                {
                    display: "Back",
                    nextStateId: "root",
                },
            ];
            return opts;
        }
    },
    {
        id: "invalid_form_data",
        type: "databaseEval",
        display: ["Invalid details passed to form. Please fill the form with correct details."],
        optionFunc: async (userId: number, data: any) => {
            let studentSource = AppDataSource.getRepository(Student);
            let student = await studentSource.findOne({
                where: {
                    id: userId,
                },
            });
            return [{
                nextStateId: data,
                display: "Back",
            }]
        }
    },
    {
        id: "form_success",
        type: "user",
        display: ["Form submitted successfully!"],
        options: [{
            display: "Back",
            nextStateId: "root",
        }]
    },
    {
        id: "leave_form",
        type: "form",
        cancelState: "forms_root",
        display: ["Fill below given form for your leave application"],
        form: LeaveForm,
        submitFn: async (userId, data) => {
            let studentSource = AppDataSource.getRepository(Student);
            let student = await studentSource.findOne({
                where: {
                    id: userId,
                },
            });
            for (const val of Object.values(data)) { // Validate form
                if (val === null || (typeof val === "string" && val.trim() === "")) {
                    return {
                        nextState: "invalid_form_data",
                        data: "leave_form"
                    }
                }
            }
            let leaveSource = AppDataSource.getRepository(Leave);
            let leave = leaveSource.create({
                startDate: data.startdate,
                endDate: data.enddate,
                description: data.description,
                status: "pending",
                student: student,
                type: data.leavetype,
            });
            await leaveSource.save(leave);
            return {
                nextState: "form_success",
                data: null,
            };
        },
    },
    {
        id: "leave_form_pending",
        type: "user",
        display: ["You already have a leave form submitted! Please wait for it to be approved"],
        options: [
            {
                display: "Back",
                nextStateId: "forms_root",
            }
        ]
    },
    {
        id: "doubt_form",
        type: "form",
        cancelState: "doubts_root",
        display: ["Fill below given form for your doubt"],
        form: DoubtForm,
        submitFn: async (userId, data) => {
            let studentSource = AppDataSource.getRepository(Student);
            let student = await studentSource.findOne({
                where: {
                    id: userId,
                },
            });
            let subjectSource = AppDataSource.getRepository(Subject);
            let subject = await subjectSource.findOne({
                where: {
                    id: data.subject
                }
            });
            let doubtSource = AppDataSource.getRepository(Doubts);
            let doubt = doubtSource.create({
                date: new Date(Date.now()),
                faculty: data.faculty,
                subject: subject,
                semester: student.semester,
                topic: data.topic,
                content: data.description,
                status: "pending",
                student: student,
            });
            await doubtSource.save(doubt);
            return {
                nextState: "form_success",
                data: null,
            };
        },
    },
    {
        id: "feedback_form",
        type: "form",
        cancelState: "forms_root",
        display: ["Fill below given form for feedback"],
        form: FeedbackForm,
        submitFn: async (userId, data) => {
            for (const val of Object.values(data)) { // Validate form
                if (val === null || (typeof val === "string" && val.trim() === "")) {
                    return {
                        nextState: "invalid_form_data",
                        data: "feedback_form"
                    }
                }
            }
            let studentSource = AppDataSource.getRepository(Student);
            let student = await studentSource.findOne({
                where: {
                    id: userId,
                },
            });
            let subjectSource = AppDataSource.getRepository(Subject);
            let subject = await subjectSource.findOne({
                where: {
                    subjectCode: data.subject
                }
            });
            let feedbackSource = AppDataSource.getRepository(Feedback);
            let feedback = feedbackSource.create({
                subject: subject,
                student: student,
                options: []
            });
            let optionSource = AppDataSource.getRepository(Options);
            feedback.options = Object.keys(data).filter(x => x !== "subject").map(x => 
                optionSource.create({
                    feedback: feedback,
                    question: x,
                    reply: data[x]
                })
            );
            let savedFeedback = await feedbackSource.save(feedback);
            feedback.options.forEach(x => x.feedback = savedFeedback);
            await optionSource.save(feedback.options);
            return {
                nextState: "form_success",
                data: null,
            };
        },
    },
    {
        id: "complaint_form",
        type: "form",
        cancelState: "forms_root",
        display: ["Fill below given form to register complaint"],
        form: ComplaintForm,
        submitFn: async (userId, data) => {
                for (const val of Object.values(data)) { // Validate form
                if (val === null || (typeof val === "string" && val.trim() === "")) {
                    return {
                        nextState: "invalid_form_data",
                        data: "complaint_form"
                    }
                }
            }
            let studentSource = AppDataSource.getRepository(Student);
            let student = await studentSource.findOne({
                where: {
                    id: userId,
                },
            });
            let complaintSource = AppDataSource.getRepository(Complaint);
            let complaint = complaintSource.create({
                category: data.complainttype,
                content: data.description,
                date: new Date(Date.now()),
                title: data.topic,
                student: student,
            });
            await complaintSource.save(complaint);
            return {
                nextState: "form_success",
                data: null,
            };
        },
    },
    {
        id: "other_form",
        type: "form",
        cancelState: "forms_root",
        display: ["Fill form of other type"],
        form: OtherForm,
        submitFn: async (userId, data) => {
            for (const val of Object.values(data)) { // Validate form
                if (val === null || (typeof val === "string" && val.trim() === "")) {
                    return {
                        nextState: "invalid_form_data",
                        data: "other_form"
                    }
                }
            }
            let studentSource = AppDataSource.getRepository(Student);
            let student = await studentSource.findOne({
                where: {
                    id: userId,
                },
            });
            let formSource = AppDataSource.getRepository(GeneralForm);
            let form = formSource.create({
                topic: data.topic,
                description: data.description,
                student: student,
            });
            await formSource.save(form);
            return {
                nextState: "form_success",
                data: null,
            };
        },
    },
    {
        id: "schedule_root",
        type: "database",
        retrieveFunc: async (userId, data) => {
            let studentSource = AppDataSource.getRepository(Student);
            let results = await studentSource.createQueryBuilder('student')
               .innerJoin('student.schedules', 'schedule')
               .innerJoin('schedule.subject', 'subject')
               .innerJoin('subject.faculty', 'faculty') 
               .where('student.id = :id', { id: userId })
               .andWhere('student.semester = schedule.semester')
               .select(['schedule.date, schedule.duration, subject.subjectCode', 'subject.subjectTitle, faculty.name']).getRawMany();
            let schedule = { days: [[], [], [], [], []] };
            let subjectNames: Map<string, string> = new Map();
            for (const result of results) {
                let facultyInitials = (result.name as string).split(' ').map(x => x[0].toUpperCase()).join('');
                let date = new Date(result.date);
                let hours = date.getHours();
                let slotIndex = (hours >= 14) ? hours - 11 : hours - 10; 
                let slot = { slotIndex: slotIndex, duration: result.duration as number, subjectCode: result.subjectCode as string, subjectName: result.subjectTitle as string, facultyName: facultyInitials };
                subjectNames.set(slot.subjectCode, slot.subjectName);
                schedule.days[date.getDay() - 1].push(slot);
            }
            return {
                nextState: "root_back",
                data: {
                    type: "schedule",
                    schedule: schedule,
                    subjectNames: subjectNames
                }
            }
        },
        displayFunc: (data: any) => {
            let subjectNameLegend = ["Subjects:"];
            for (const [key, value] of (data.subjectNames as Map<string, string>))
            {
                subjectNameLegend.push(`${key}: ${value}`);    
            }
            return [`Here is your schedule: \n${subjectNameLegend.join('\n')}`];
        }
    },
    {
        id: "doubts_root",
        type: "user",
        display: ["What do you have in mind?"],
        options: [{
            display: "Ask a doubt",
            nextStateId: "doubt_form",
        }, {
                display: "Pending doubts",
                nextStateId: "doubt_view",
        }, {
            display: "Back",
            nextStateId: "root",
        }]
    },
    {
        id: "doubt_view",
        type: "database",
        retrieveFunc: async (userId, data) => {
            let doubtRepository = AppDataSource.getRepository(Doubts);
            let pendingDoubts = await doubtRepository.find({
                where: {
                    student: {
                        id: userId
                    },
                    status: "pending"
                }
            });
            return {
                data: pendingDoubts,
                nextState: "root_back"
            }
        },
        displayFunc: (data) => {
            let doubts = data as Doubts[]
            if (doubts.length === 0) {
                return ["You don't have any pending doubts"]
            } else {
                return ["Here are your pending doubts:"].concat(doubts.map(doubt => doubt.topic));
            }
        }
    }
]);
