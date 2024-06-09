export interface FormDefinition {
    fields: {
        id: string;
        placeholder: string;
        name: string;
        inputType: FormInputType;
        required: boolean;
    }[];
    long?: boolean;
}
export interface TextElementType {
    type: "text";
    min?: number;
    max?: number;
}
export interface TextAreaElementType {
    type: "textarea";
}
export interface NumberElementType {
    type: "number";
    min?: number;
    max?: number;
}
export interface DateElementType {
    type: "date";
    min?: string;
    max?: string;
}
export interface DropdownElementType {
    type: "dropdown";
    options: {
        id: string;
        display: string;
        value: string;
    }[];
}
export interface DropdownDBElementType {
    type: "dropdowndb";
    optionQuery: (userId: number) => Promise<DropdownElementType["options"]>;
}
export type FormInputType = TextElementType | TextAreaElementType | NumberElementType | DateElementType | DropdownElementType | DropdownDBElementType;
export declare function TextElement(min?: number, max?: number): TextElementType;
export declare function TextAreaElement(): TextAreaElementType;
export declare function NumberElement(min?: number, max?: number): NumberElementType;
export declare function DateElement(min?: string, max?: string): DateElementType;
export declare function DropdownElement(options: {
    id: string;
    display: string;
    value: string;
}[]): DropdownElementType;
export declare function DropdownOption(value: string, display: string): DropdownElementType["options"][0];
export declare function DropdownDBElement(optionFn: DropdownDBElementType["optionQuery"]): DropdownDBElementType;
