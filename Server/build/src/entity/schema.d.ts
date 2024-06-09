import { BaseEntity, Relation } from 'typeorm';
export declare class User extends BaseEntity {
    id: number;
    userId: string;
    passwordHash: string;
    type: "student" | "faculty" | "admin";
    sessions: Relation<Session>[];
}
export declare class Session extends BaseEntity {
    id: number;
    sessionToken: string;
    user: Relation<User>;
    expireDate: Date;
}
export declare class Student extends BaseEntity {
    id: number;
    name: string;
    email: string;
    contact: string;
    branch: string;
    batch: string;
    semester: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8;
    fees: Relation<Fees>[];
    complaints: Relation<Complaint>[];
    feedbacks: Relation<Feedback>[];
    attendences: Relation<Attendence>[];
    schedules: Relation<Schedule>[];
    results: Relation<Result>[];
    doubts: Relation<Result>[];
    leaves: Relation<Leave>[];
    forms: Relation<GeneralForm>[];
    counsellor: Relation<Faculty>;
    user: Relation<User>;
}
export declare class Faculty extends BaseEntity {
    id: number;
    name: string;
    email: string;
    contact: string;
    branch: string;
    counsellor: boolean;
    user: Relation<User>;
    students: Relation<Student>[];
    subjects: Relation<Subject>[];
    doubts: Relation<Doubts>[];
}
export declare class AdminUser extends BaseEntity {
    id: number;
    name: string;
    email: string;
    contact: string;
    user: Relation<User>;
}
export declare class Notice extends BaseEntity {
    id: number;
    datetime: string;
    type: string;
    content: string;
    title: string;
    expiry: string;
}
export declare class Fees extends BaseEntity {
    id: number;
    semester: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8;
    paid: boolean;
    amount: number;
    student: Relation<Student>;
}
export declare class Complaint extends BaseEntity {
    id: number;
    category: string;
    title: string;
    content: string;
    date: Date;
    student: Relation<Student>;
}
export declare class Feedback extends BaseEntity {
    id: number;
    subject: Relation<Subject>;
    student: Relation<Student>;
    options: Relation<Options>[];
}
export declare class Options extends BaseEntity {
    id: number;
    question: string;
    reply: string;
    feedback: Relation<Feedback>;
}
export declare class Attendence extends BaseEntity {
    id: number;
    date: Date;
    subject: Relation<Subject>;
    semester: number;
}
export declare class Schedule extends BaseEntity {
    id: number;
    date: Date;
    subject: Relation<Subject>;
    semester: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8;
    duration: number;
}
export declare class Result extends BaseEntity {
    id: number;
    credits: string;
    subject: Relation<Subject>;
    semester: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8;
    grade: "AA" | "BB" | "CC" | "AB" | "BC" | "CD" | "DD" | "FP" | "NP";
    cpi: number;
    spi: number;
    student: Relation<Student>;
}
export declare class Doubts extends BaseEntity {
    id: number;
    subject: Relation<Subject>;
    semester: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8;
    content: string;
    topic: string;
    faculty: Relation<Faculty>;
    date: Date;
    status: "resolved" | "pending";
    student: Relation<Student>;
}
export declare class Subject extends BaseEntity {
    id: number;
    subjectCode: string;
    subjectTitle: string;
    doubts: Relation<Doubts>[];
    schedules: Relation<Schedule>[];
    results: Relation<Result>[];
    attendences: Relation<Attendence>[];
    feedbacks: Relation<Feedback>[];
    faculty: Relation<Faculty>;
}
export declare class Leave extends BaseEntity {
    id: number;
    type: string;
    startDate: Date;
    endDate: Date;
    description: string;
    status: "pending" | "approved" | "rejected";
    student: Relation<Student>;
}
export declare class GeneralForm extends BaseEntity {
    id: number;
    topic: string;
    description: string;
    student: Relation<Student>;
}
