import { BaseEntity, PrimaryGeneratedColumn, Column, Entity, ManyToOne, OneToMany, OneToOne, JoinColumn, Relation, JoinTable, ManyToMany } from 'typeorm';

@Entity()
export class User extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    userId: string

    @Column()
    passwordHash: string

    @Column()
    type: "student" | "faculty" | "admin"

    @OneToMany('Session', 'user')
    sessions: Relation<Session>[]
}

@Entity()
export class Session extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    sessionToken: string

    @ManyToOne('User', 'sessions')
    user: Relation<User>

    @Column()
    expireDate: Date
}

@Entity()
export class Student extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    name: string

    @Column()
    email: string

    @Column()
    contact: string
    
    @Column()
    branch: string

    @Column()
    batch: string

    @Column()
    semester: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8

    @OneToMany('Fees', 'student')
    fees: Relation<Fees>[]

    @OneToMany('Complaint', 'student')
    complaints: Relation<Complaint>[]

    @OneToMany('Feedback', 'student')
    feedbacks: Relation<Feedback>[]

    @ManyToMany('Attendence')
    @JoinTable()
    attendences: Relation<Attendence>[]

    @ManyToMany('Schedule')
    @JoinTable()
    schedules: Relation<Schedule>[]

    @OneToMany('Result', 'student')
    results: Relation<Result>[]

    @OneToMany('Doubts', 'student')
    doubts: Relation<Result>[]

    @OneToMany('Leave', 'student')
    leaves: Relation<Leave>[]

    @OneToMany('GeneralForm', 'student')
    forms: Relation<GeneralForm>[]

    @ManyToOne('Faculty', 'students')
    counsellor: Relation<Faculty>

    @OneToOne('User')
    @JoinColumn()
    user: Relation<User>
}

@Entity()
export class Faculty extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    name: string

    @Column()
    email: string

    @Column()
    contact: string
    
    @Column()
    branch: string

    @Column()
    counsellor: boolean
        
    @OneToOne('User')
    @JoinColumn()
    user: Relation<User>

    @OneToMany('Student', 'counsellor')
    students: Relation<Student>[]

    @OneToMany('Subject', 'faculty')
    subjects: Relation<Subject>[]

    @OneToMany('Doubts', 'faculty')
    doubts: Relation<Doubts>[]
}

@Entity()
export class AdminUser extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    name: string

    @Column()
    email: string

    @Column()
    contact: string

    @OneToOne('User')
    @JoinColumn()
    user: Relation<User>
}

@Entity()
export class Notice extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    datetime: string

    @Column()
    type: string

    @Column()
    content: string

    @Column()
    title: string
    
    @Column()
    expiry: string
}


@Entity()
export class Fees extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    semester: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8
    @Column()
    paid: boolean

    @Column()
    amount: number

    @ManyToOne('Student', 'fees')
    @JoinColumn()
    student: Relation<Student>
}


@Entity()
export class Complaint extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    category: string

    @Column()
    title: string

    @Column()
    content: string

    @Column()
    date: Date

    @ManyToOne('Student', 'complaints')
    student: Relation<Student>
}

@Entity()
export class Feedback extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number

    @JoinColumn()
    @ManyToOne('Subject', 'feedbacks')
    subject: Relation<Subject>

    @ManyToOne('Student', 'feedbacks')
    student: Relation<Student>

    @OneToMany('Options', 'feedback')
    options: Relation<Options>[]
}


@Entity()
export class Options extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    question: string

    @Column()
    reply: string

    @ManyToOne('Feedback', 'options')
    feedback: Relation<Feedback>
}



@Entity()
export class Attendence extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    date: Date

    @JoinColumn()
    @ManyToOne('Subject', 'attendences')
    subject: Relation<Subject>

    @Column()
    semester: number
}

@Entity()
export class Schedule extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    date: Date

    @JoinColumn()
    @ManyToOne('Subject', 'schedules')
    subject: Relation<Subject>

    @Column()
    semester: 1|2|3|4|5|6|7|8

    @Column()
    duration: number
}


@Entity()
export class Result extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    credits: string

    @JoinColumn()
    @ManyToOne('Subject', 'results')
    subject: Relation<Subject>

    @Column()
    semester: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8
    
    @Column()
    grade: "AA"|"BB"|"CC"|"AB"|"BC"|"CD"|"DD"|"FP"|"NP"
    
    @Column()
    cpi: number

    @Column()
    spi: number

    @ManyToOne('Student', 'results')
    student: Relation<Student>
    
}


@Entity()
export class Doubts extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number

    @JoinColumn()
    @ManyToOne('Subject', 'doubts')
    subject: Relation<Subject>

    @Column()
    semester: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8

    @Column()
    content: string

    @Column()
    topic: string

    @ManyToOne('Faculty', 'doubts')
    faculty: Relation<Faculty>;

    @Column()
    date : Date

    @Column()
    status: "resolved" | "pending"
    
    @ManyToOne('Student', 'doubts')
    student: Relation<Student>
    
}

@Entity()
export class Subject extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    subjectCode: string

    @Column()
    subjectTitle: string

    @OneToMany('Doubts', 'subject')
    doubts: Relation<Doubts>[]

    @OneToMany('Schedule', 'subject')
    schedules: Relation<Schedule>[]

    @OneToMany('Result', 'subject')
    results: Relation<Result>[]

    @OneToMany('Attendence', 'subject')
    attendences: Relation<Attendence>[]

    @OneToMany('Feedback', 'subject')
    feedbacks: Relation<Feedback>[]

    @ManyToOne('Faculty', 'subjects')
    faculty: Relation<Faculty>
}

@Entity()
export class Leave extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    type: string

    @Column()
    startDate: Date

    @Column()
    endDate: Date

    @Column()
    description: string
    
    @Column()
    status: "pending" | "approved" | "rejected"

    @ManyToOne('Student', 'leaves')
    student: Relation<Student>
}

@Entity()
export class GeneralForm extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    topic: string

    @Column()
    description: string

    @ManyToOne('Student', 'forms')
    student: Relation<Student>
}