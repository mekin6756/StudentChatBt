import "reflect-metadata";
import { DataSource } from "typeorm";
import {
    Student,
    Notice,
    Fees,
    Complaint,
    Attendence,
    Schedule,
    Result,
    User,
    Session,
    Feedback,
    Options,
    Doubts,
    Subject,
    GeneralForm,
    Leave,
    Faculty,
    AdminUser,
} from "./entity/schema";
import { FSM } from "./fsm";
import { TextElement, TextAreaElement, DateElement, DropdownElement, DropdownOption } from "./form";
import { ComplaintForm, DoubtForm, FeedbackForm, LeaveForm, OtherForm } from "./forms";

export const AppDataSource = new DataSource({
    type: "sqlite",
    database: "database.sqlite",
    synchronize: true,
    logging: false,
    entities: [Student, Faculty, AdminUser, Notice, Fees, Complaint, Attendence, Schedule, Result, User, Session, Feedback, Options, Doubts, Subject, Leave, GeneralForm],
    migrations: [],
    subscribers: [],
});

