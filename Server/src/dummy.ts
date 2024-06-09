import { AppDataSource } from "./data-source";
import { Result, Fees, Notice, Leave, Student, Doubts, Feedback, Options, Complaint, GeneralForm, Subject, Faculty, Schedule, User, Attendence } from "./entity/schema";

export async function addDummyStudents() {
    let fnames = [
        "John",
        "Jack",
        "Jill",
        "Jane",
        "Judy",
        "Jim",
        "Joe",
        "Jenny",
        "George",
        "Gloria",
        "Gerry",
        "Grace",
        "Gloria",
    ];
    let lnames = [
        "Doe",
        "Duff",
        "Duck",
        "Doe",
        "Duck",
        "King",
        "Trump",
        "Smith",
        "Jimmy",
        "Jones",
    ];

    for (let i = 10; i < 60; i++) {
        let userSource = AppDataSource.getRepository(User);
        let user = userSource.create();
        user.passwordHash = "$2b$10$LkxlR12S9.kgE/G8pxfLzeb6b.MvPwoW79tuo5.GtG9CnHCNmONlu";
        user.type = "student";
        user.userId = `IT3${i}`;
        let savedUser = await userSource.save(user);

        let studentSource = AppDataSource.getRepository(Student);
        let stud = studentSource.create();
        stud.batch = ["A", "B", "C", "D"][Math.floor(Math.random() * 4)];
        stud.branch = "IT";
        stud.contact = Math.floor(Math.random() * 1000000000).toString();
        stud.email = fnames[Math.floor(Math.random() * fnames.length)] + "." + lnames[Math.floor(Math.random() * lnames.length)] + "@gmail.com";
        stud.name = fnames[Math.floor(Math.random() * fnames.length)] + " " + lnames[Math.floor(Math.random() * lnames.length)];
        let semDecision = [1, 2][Math.floor(Math.random() * 2)];
        stud.semester = semDecision === 1 ? 1 : 2;
        stud.user = savedUser;
        let attendanceDb = AppDataSource.getRepository(Attendence);
        let attendances = await attendanceDb.find();
        stud.attendences = attendances;
        let scheduleDb = AppDataSource.getRepository(Schedule);
        let schedules = await scheduleDb.find();
        stud.schedules = schedules;
        let savedStudent = await studentSource.save(stud);
        let resultDb = AppDataSource.getRepository(Result);
        let subjects = AppDataSource.getRepository(Subject);
        let fees = AppDataSource.getRepository(Fees);
        let allSubs = await subjects.find();
        let studSubs = [];
        for (let sub of allSubs) {
            let subRes = resultDb.create();
            subRes.cpi = Math.random() * 10;
            subRes.spi = Math.random() * 10;

            let semDecision = [1, 2][Math.floor(Math.random() * 2)];
            subRes.semester = semDecision === 1 ? 1 : 2;

            subRes.credits = [1, 2, 3, 4][Math.floor(Math.random() * 4)].toString();
            subRes.grade = ["AA", "AB", "BB", "BC"][Math.floor(Math.random() * 4)] as "AA" | "BB" | "CC" | "AB" | "BC" | "CD" | "DD" | "FP" | "NP";
            subRes.subject = sub;
            subRes.student = savedStudent;
            let savedSub = await resultDb.save(subRes);
            studSubs.push(savedSub);
        }
        savedStudent.results = studSubs;
        savedStudent = await studentSource.save(savedStudent);
        for (let j = 0; j < semDecision; j++) {
            let fee = fees.create();
            fee.amount = 65000;
            fee.paid = [false, true][Math.floor(Math.random() * 2)];
            fee.semester = j + 1 as Fees["semester"];
            fee.student = savedStudent;
            await fees.save(fee);
        }
    }
}

export async function deleteRandomAttendances() {
    let attendanceDb = AppDataSource.getRepository(Attendence);
    let attendances = await attendanceDb.find();
    for (let attendance of attendances) {
        if (Math.random() < 0.1) {
            await attendanceDb.remove(attendance);
        }
    }
}