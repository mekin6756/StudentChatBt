export interface Schedule {
    days: ScheduleDay[]
}

export type ScheduleDay = SubjectSlot[];

export interface SubjectSlot {
    subjectCode: string,
    subjectName: string,
    slotIndex: number,
    duration: number,
    facultyName: string
}