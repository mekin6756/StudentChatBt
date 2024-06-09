export interface Doubt {
    id: number
    subject: Subject
    semester: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8
    content: string
    topic: string
    date : string
    status: "resolved" | "pending"
    student: Student
}

export interface Subject {
    id: number
    subjectCode: string
    subjectTitle: string
}

export interface Student {
    id: number
    name: string
    email: string
    contact: string
    branch: string
    batch: string
}

export interface Leave {
    id: number
    type: string
    startDate: string
    endDate: string
    description: string
    status: "pending" | "approved" | "rejected"
    student: Student
}

export interface GeneralForm {
    id: number
    topic: string
    description: string
    student: Student
}

export interface Complaint {
    id: number
    category: string
    title: string
    content: string
    date: string
    student: Student
}