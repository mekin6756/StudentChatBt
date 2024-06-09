import { AppDataSource } from "../data-source";
import { Result, Fees, Notice, Leave, Student, Doubts, Feedback, Options, Complaint, GeneralForm, Subject, Faculty, Schedule } from "../entity/schema";
import { LeaveForm, DoubtForm, FeedbackForm, ComplaintForm, OtherForm } from "../forms";
import { FSM } from "../fsm";

export const FacultyFSM = new FSM([
    {
        id: "root",
        type: "database",
        retrieveFunc: async (userId, data) => {
            let facultySource = AppDataSource.getRepository(Faculty);
            let faculty = await facultySource.findOne({
                where: {
                    id: userId
                }
            });
            return {
                nextState: "faculty_opts",
                data: faculty.name
            }
        },
        displayFunc: (data) => {
            return ["Hello " + data + ", what would you like to do?"]
        }
    },
    {
        id: "faculty_opts",
        type: "user",
        display: [],
        options: [
            {
                display: "Attendance",
                nextStateId: "attendance_root",
            },
            {
                display: "Student Inquiry",
                nextStateId: "student_inquiry"
            },
            {
                display: "Doubts",
                nextStateId: "doubts_root"
            },
            {
                display: "Schedule",
                nextStateId: "schedule_root"
            }
        ]
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
        id: "attendance_root",
        type: "databaseEval",
        display: ["Choose a subject for which you want to see attendance"],
        optionFunc: async (userId, data) => {
            let subjectSource = AppDataSource.getRepository(Subject);
            let subjects = await subjectSource.find({
                where: {
                    faculty: {
                        id: userId
                    }
                }
            });
            return subjects.map(x => {
                return {
                    display: x.subjectCode + ": " + x.subjectTitle,
                    nextStateId: "attendance_subject",
                    data: x.id
                }
            });
        },
    },
    {
        id: "doubts_root",
        type: "database",
        retrieveFunc: async (userId, data) => {
            let doubtSource = AppDataSource.getRepository(Doubts);
            let pendingDoubts = await doubtSource.find({
                where: {
                    faculty: {
                        id: userId
                    },
                    status: "pending"
                },
                relations: {
                    student: true,
                    subject: true
                }
            });
            return {
                data: pendingDoubts,
                nextState: "root_back"
            }
        },
        displayFunc: (data) => {
            let doubts = data as Doubts[];
            if (doubts.length === 0) {
                return ["You have no pending doubts from students to resolve"];
            } else {
                return ["Here are the pending doubts from students:"].concat(doubts.map(d => {
                    return `${d.student.name} has a doubt for subject ${d.subject.subjectCode}: ${d.topic}`
                }));
            }
        }
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
                .where('faculty.id = :id', { id: userId })
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
            for (const [key, value] of (data.subjectNames as Map<string, string>)) {
                subjectNameLegend.push(`${key}: ${value}`);
            }
            return [`Here is your schedule: \n${subjectNameLegend.join('\n')}`];
        }
    },
    {
        id: "student_inquiry",
        type: "input",
        display: ["Enter the ID of the student you want to inquire about"],
        evalFn: async (userId: number, data: any, input: string) => {
            let studentSource = AppDataSource.getRepository(Student);
            let stud = await studentSource.findOne({
                where: {
                    user: {
                        userId: input.trim()
                    }
                }
            });
            if (stud !== null) {
                return {
                    data: stud.id,
                    nextState: "student_inquiry_ask"
                }
            } else {
                return {
                    nextState: "student_inquiry_not_found",
                    data: null
                }
            }
        }
    },
    {
        id: "student_inquiry_ask",
        type: "user",
        display: ["What would you like to know about the student?"],
        options: [{
            display: "Personal Info",
            nextStateId: "student_inquiry_personal",
        }, {
            display: "Results",
            nextStateId: "student_inquiry_results"
        }, {
            display: "Subjects",
            nextStateId: "student_inquiry_subjects"
        }]
    },
    {
        id: "student_inquiry_not_found",
        type: "user",
        display: ["No such student found!"],
        options: [{
            display: "Back",
            nextStateId: "root"
        }]
    },
    {
        id: "student_inquiry_personal",
        type: "database",
        retrieveFunc: async (userId, data) => {
            let studentSource = AppDataSource.getRepository(Student);
            let student = await studentSource.findOne({
                where: {
                    id: data
                },
            });
            return {
                data: student,
                nextState: "root_back"
            }
        },
        displayFunc: (data) => {
            let student = data as Student;
            return [
                `Name: ${student.name}`,
                `Branch: ${student.branch}`,
                `Email: ${student.email}`,
                `Contact: ${student.contact}`,
            ]
        }
    },
    {
        id: "student_inquiry_subjects",
        type: "database",
        retrieveFunc: async (userId, data) => {
            let studentSource = AppDataSource.getRepository(Student);

            let results = await studentSource.createQueryBuilder('student')
                .innerJoin('student.schedules', 'schedule')
                .innerJoin('schedule.subject', 'subject')
                .where('student.id = :id', { id: data })
                .select(['subject.subjectCode', 'subject.subjectTitle']).distinct(true).getRawMany();

            return {
                data: results,
                nextState: "root_back"
            }
        },
        displayFunc: (data) => {
            let results = data as { subject_subjectCode: string, subject_subjectTitle: string }[];
            return results.map(x => `${x.subject_subjectCode}: ${x.subject_subjectTitle}`);
        }
    },
    {
        id: "student_inquiry_results",
        type: "databaseEval",
        display: ["Which semester results would you like to see?"],
        optionFunc: async (userId: number, data: any) => {
            let storageSource = AppDataSource.getRepository(Result);
            let results = await storageSource.find({
                where: {
                    student: {
                        id: data,
                    },
                },
            });
            let semList = [...new Set(results.map((x) => x.semester))];

            return semList.map((x) => {
                return {
                    display: `Sem ${x}`,
                    nextStateId: "student_inquiry_results_semester",
                    data: {
                        student: data,
                        semester: x
                    },
                };
            });
        },
    },
    {
        id: "student_inquiry_results_semester",
        type: "database",
        retrieveFunc: async (userId: number, data: any) => {
            let storageSource = AppDataSource.getRepository(Result);
            let results = await storageSource.find({
                where: {
                    semester: data.semester,
                    student: {
                        id: data.student,
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
            let strs = ["The student's results for the specified semester are:"];
            for (let result of results) {
                strs.push(`${result.subject.subjectCode} of ${result.credits} credits: ${result.grade}`);
            }
            strs.push(`SPI: ${results[0].spi} | CPI: ${results[0].cpi}`);
            return strs;
        },
    },
    {
        id: "attendance_subject",
        type: "user",
        display: ["What do you want to know regarding the attendance of your specified subject?"],
        options: [{
            display: "Average Attendance",
            nextStateId: "attendance_subject_avg"
        }, {
            display: "Student's Attendance",
            nextStateId: "attendance_subject_student"
        }]
    },
    {
        id: "attendance_subject_student",
        type: "input",
        display: ["Which student's attendance would you like to see?"],
        evalFn: async (userId: number, data: any, input: string) => {
            let studentSource = AppDataSource.getRepository(Student);
            let stud = await studentSource.findOne({
                where: {
                    user: {
                        userId: input.trim()
                    }
                }
            });
            if (stud !== null) {
                return {
                    data: {
                        subject: data.data,
                        student: stud.id
                    },
                    nextState: "attendance_subject_student_result"
                }
            } else {
                return {
                    nextState: "student_inquiry_not_found",
                    data: null
                }
            }
        },
    },
    {
        id: "attendance_subject_student_result",
        type: "database",
        retrieveFunc: async (userId: number, data: any) => {
            let d = data as { student: number, subject: number };
            let studentSource = AppDataSource.getRepository(Student);
            let stud = await studentSource.findOne({
                where: {
                    id: d.student
                }
            });
            let soFar = (await studentSource.createQueryBuilder('student')
                .innerJoin('student.schedules', 'schedule')
                .innerJoin('schedule.subject', 'subject')
                .where('student.id = :id', { id: d.student })
                .andWhere('subject.id = :id', { id: d.subject }).getRawMany()).length;
            let attended = (await studentSource.createQueryBuilder('student')
                .innerJoin('student.schedules', 'schedule')
                .innerJoin('schedule.subject', 'subject')
                .innerJoin('student.attendences', 'attendence')
                .where('student.id = :id', { id: d.student })
                .andWhere('subject.id = :id', { id: d.subject })
                .andWhere('attendence.subject = subject.id').getRawMany()).length;
            
            return {
                nextState: "root_back",
                data: {
                    proper: soFar !== 0,
                    ratio: soFar !== 0 ? Math.min(attended / soFar, 1) : 0
                }
            }
        },
        displayFunc: (data: any) => {
            if (data.proper) {
                return [`The student has ${data.ratio * 100}% attendance in the specified subject.`];
            } else {
                return [`The student does not have any attendance in the specified subject.`];
            }
        }
    },
    {
        id: "attendance_subject_avg",
        type: "database",
        retrieveFunc: async (userId: number, data: any) => {
            let d = data as number
            let studentSource = AppDataSource.getRepository(Student);
            let soFar = (await studentSource.createQueryBuilder('student')
                .innerJoin('student.schedules', 'schedule')
                .innerJoin('schedule.subject', 'subject')
                .where('subject.id = :id', { id: d })
                .andWhere('schedule.semester = student.semester').getRawMany()).length;
            let attended = (await studentSource.createQueryBuilder('student')
                .innerJoin('student.schedules', 'schedule')
                .innerJoin('schedule.subject', 'subject')
                .innerJoin('student.attendences', 'attendence')
                .where('subject.id = :id', { id: d })
                .andWhere('attendence.subject = subject.id')
                .andWhere('schedule.semester = student.semester').getRawMany()).length;
            return {
                nextState: "root_back",
                data: {
                    proper: soFar !== 0,
                    ratio: soFar !== 0 ? Math.min(attended / soFar, 1) : 0
                }
            }
        },
        displayFunc: (data: any) => {
            if (data.proper) {
                return [`The average attendance of the specified subject is ${data.ratio * 100}%.`];
            } else {
                return [`There is no attendance in the specified subject.`];
            }
        }
    }
]);