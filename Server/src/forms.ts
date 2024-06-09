import { AppDataSource } from "./data-source";
import { Schedule, Student, Subject } from "./entity/schema";
import { DropdownElement, DropdownOption, DateElement, TextAreaElement, TextElement, FormDefinition, DropdownDBElement } from "./form";

export const LeaveForm: FormDefinition = {
    fields: [
        {
            id: "leavetype",
            name: "Type of leave ",
            placeholder: "select leave type.",
            required: true,
            inputType: DropdownElement([
                DropdownOption("sickleave", "Sick Leave"),
                DropdownOption("personalleave", "Personal Leave"),
                DropdownOption("academicleave", "Academic Leave"),
                DropdownOption("specialcircumstanceleave", "Special Circumstance Leave"),
                DropdownOption("extracurricularleave", "Extracurricular Activity Leave"),
            ]),
        },
        {
            id: "startdate",
            name: "Start Date",
            placeholder: "",
            required: true,
            inputType: DateElement("now", "enddate"),
        },
        {
            id: "enddate",
            name: "End Date",
            placeholder: "",
            required: true,
            inputType: DateElement("startdate"),
        },
        {
            id: "description",
            name: "Description",
            placeholder: "Enter your description.",
            required: true,
            inputType: TextAreaElement(),
        },
    ],
};

export const DoubtForm: FormDefinition = {
    fields: [
        {
            id: "subject",
            name: "Subject",
            placeholder: "Select your Subject.",
            required: true,
            inputType: DropdownDBElement(async (userId: number) => {
                let studentSource = AppDataSource.getRepository(Student);
                let student = await studentSource.findOne({
                    where: {
                        id: userId
                    }
                });
                let results = await studentSource.createQueryBuilder('student')
                    .innerJoin('student.schedules', 'schedule')
                    .innerJoin('schedule.subject', 'subject')
                    .where('student.id = :id', { id: student.id })
                    .select(['subject.id, subject.subjectCode', 'subject.subjectTitle']).distinct(true).getRawMany();
                
                return results.map(x => DropdownOption(x.subject_id, x.subject_subjectTitle));
            }),
        },
        {
            id: "faculty",
            name: "Faculty",
            placeholder: "Select faculty.",
            required: true,
            inputType: DropdownDBElement(async (userId: number) => {
                let studentSource = AppDataSource.getRepository(Student);
                let student = await studentSource.findOne({
                    where: {
                        id: userId
                    }
                });
                let results = await studentSource.createQueryBuilder('student')
                    .innerJoin('student.schedules', 'schedule')
                    .innerJoin('schedule.subject', 'subject')
                    .innerJoin('subject.faculty', 'faculty')
                    .where('student.id = :id', { id: student.id })
                    .select(['faculty.id', 'faculty.name']).distinct(true).getRawMany();
                
                return results.map(x => DropdownOption(x.faculty_id, x.faculty_name));
            })
        },
        {
            id: "topic",
            name: "Topic",
            placeholder: "Enter topic of your complaint.",
            required: true,
            inputType: TextElement(),
        },
        {
            id: "description",
            name: "Description",
            placeholder: "Enter your description.",
            required: true,
            inputType: TextAreaElement(),
        },
    ],
};

export const FeedbackForm: FormDefinition = {
    long: true,
    fields: [
        {
            id: "subject",
            name: "Subject",
            placeholder: "Select Subject.",
            required: true,
            inputType: DropdownDBElement(async (userId: number) => {
                let studentSource = AppDataSource.getRepository(Student);
                let student = await studentSource.findOne({
                    where: {
                        id: userId
                    }
                });
                let results = await studentSource.createQueryBuilder('student')
                    .innerJoin('student.schedules', 'schedule')
                    .innerJoin('schedule.subject', 'subject')
                    .where('student.id = :id', { id: student.id })
                    .select(['subject.subjectCode', 'subject.subjectTitle']).distinct(true).getRawMany();
                
                return results.map(x => DropdownOption(x.subject_subjectCode, x.subject_subjectTitle));
            }),
        },
        {
            id: "q1",
            name: "About what percent of the class meetings (including tutorials / labs) did you attend?",
            placeholder: "",
            required: true,
            inputType: DropdownElement([
                DropdownOption("a1", "81% to 100 %"),
                DropdownOption("b1", "61% to 80%"),
                DropdownOption("c1", "41% to 60%"),
                DropdownOption("d1", "Not more than 40%"),
            ]),
        },
        {
            id: "q2",
            name: "How many hours per week on average did you spend on this course (Beyond class / tutorial / lab meetings' hours)?",
            placeholder: "",
            required: true,
            inputType: DropdownElement([
                DropdownOption("a2", "Nil"),
                DropdownOption("b2", "1 to 2 hrs"),
                DropdownOption("c2", "3 to 4 hrs"),
                DropdownOption("d2", "4 to 5 hrs"),
                DropdownOption("e2", "More than 5 hrs"),
            ]),
        },
        {
            id: "q3",
            name: "Teacher's preparation of the subject taught and for the organized conduction of the class/lab meetings",
            placeholder: "",
            required: true,
            inputType: DropdownElement([
                DropdownOption("a3", "Excellent"),
                DropdownOption("b3", "Very Good"),
                DropdownOption("c3", "Good"),
                DropdownOption("d3", "Fair"),
            ]),
        },
        {
            id: "q4",
            name: "Quality of the Material (Teaching aids, presentation slides, etc) used",
            placeholder: "",
            required: true,
            inputType: DropdownElement([
                DropdownOption("a4", "Excellent"),
                DropdownOption("b4", "Very Good"),
                DropdownOption("c4", "Good"),
                DropdownOption("d4", "Fair"),
            ]),
        },
        {
            id: "q5",
            name: "Ability of the Teacher to Explain",
            placeholder: "",
            required: true,
            inputType: DropdownElement([
                DropdownOption("a5", "Excellent"),
                DropdownOption("b5", "Very Good"),
                DropdownOption("c5", "Good"),
                DropdownOption("d5", "Fair"),
            ]),
        },
        {
            id: "q6",
            name: "Punctuality and Regularity of the Teacher",
            placeholder: "",
            required: true,
            inputType: DropdownElement([
                DropdownOption("a6", "Excellent"),
                DropdownOption("b6", "Very Good"),
                DropdownOption("c6", "Good"),
                DropdownOption("d6", "Fair"),
            ]),
        },
        {
            id: "q7",
            name: "Opportunities given for discussion in the class/lab (Interaction with students)",
            placeholder: "",
            required: true,
            inputType: DropdownElement([
                DropdownOption("a7", "Excellent"),
                DropdownOption("b7", "Very Good"),
                DropdownOption("c7", "Good"),
                DropdownOption("d7", "Fair"),
            ]),
        },
        {
            id: "q8",
            name: "Ability of the teacher to clarify students' doubts",
            placeholder: "",
            required: true,
            inputType: DropdownElement([
                DropdownOption("a8", "Excellent"),
                DropdownOption("b8", "Very Good"),
                DropdownOption("c8", "Good"),
                DropdownOption("d8", "Fair"),
            ]),
        },
        {
            id: "q9",
            name: "Quality of Questions in Mid Semester Theory Tests, Quizzes, and Assignments",
            placeholder: "",
            required: true,
            inputType: DropdownElement([
                DropdownOption("a9", "Excellent"),
                DropdownOption("b9", "Very Good"),
                DropdownOption("c9", "Good"),
                DropdownOption("d9", "Fair"),
            ]),
        },
        {
            id: "q10",
            name: "Declaration of Timely Results of Mid Sem Tests and Quizzes along with Necessary Feedback",
            placeholder: "",
            required: true,
            inputType: DropdownElement([
                DropdownOption("a10", "Excellent"),
                DropdownOption("b10", "Very Good"),
                DropdownOption("c10", "Good"),
                DropdownOption("d10", "Fair"),
            ]),
        },
        {
            id: "otherinput",
            name: "Any other inputs you may wish to share about the teacher(s) involved in this course.",
            placeholder: "Enter your description.",
            required: false,
            inputType: TextAreaElement(),
        },
    ],
};

export const ComplaintForm: FormDefinition = {
    fields: [
        {
            id: "complainttype",
            name: "Complaint Type",
            placeholder: "select type of complaint.",
            required: true,
            inputType: DropdownElement([
                DropdownOption("academic", "Academic"),
                DropdownOption("administrative", "Administrative"),
                DropdownOption("facilities", "Facilities"),
                DropdownOption("harassment", "Harassment"),
                DropdownOption("financial", "Financial"),
                DropdownOption("other", "Other"),
            ]),
        },
        {
            id: "topic",
            name: "Topic",
            placeholder: "Enter topic of complaint.",
            required: true,
            inputType: TextElement(),
        },
        {
            id: "description",
            name: "Description",
            placeholder: "Enter your description.",
            required: true,
            inputType: TextAreaElement(),
        },
    ],
};

export const OtherForm: FormDefinition = {
    fields: [
        {
            id: "topic",
            name: "Topic",
            placeholder: "Enter topic of form.",
            required: true,
            inputType: TextElement(),
        },
        {
            id: "description",
            name: "Description",
            placeholder: "Enter your description.",
            required: true,
            inputType: TextAreaElement(),
        },
    ],
};
