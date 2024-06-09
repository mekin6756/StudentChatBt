export interface FormDefinition {
    fields: {
        id: string,
        placeholder: string,
        name: string,
        inputType: FormInputType,
        required: boolean,
    }[],
    long?: boolean
}

export interface TextElementType {
    type: "text",
    min?: number,
    max?: number
}

export interface TextAreaElementType {
    type: "textarea",
}

export interface NumberElementType {
    type: "number",
    min?: number,
    max?: number
}

export interface DateElementType {
    type: "date",
    min?: string,
    max?: string
}


export interface DropdownElementType {
    type: "dropdown",
    options: {
        id: string,
        display: string,
        value: string
    }[]
}

export type FormInputType =
    TextElementType |
    TextAreaElementType |
    NumberElementType |
    DateElementType |
    DropdownElementType;

export function TextElement(min?: number, max?: number): TextElementType {
    return {
        type: "text",
        min,
        max
    }
}

export function TextAreaElement(): TextAreaElementType {
    return {
        type: "textarea"
    }
}

export function NumberElement(min?: number, max?: number): NumberElementType {
    return {
        type: "number",
        min,
        max
    }
}

export function DateElement(min? : string, max?: string): DateElementType {
    return {
        type: "date",
        min,
        max
    }
}

export function DropdownElement(options: { id: string, display: string, value: string }[]): DropdownElementType {
    return {
        type: "dropdown",
        options
    }
}