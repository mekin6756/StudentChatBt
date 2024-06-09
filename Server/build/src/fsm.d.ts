import { FormDefinition } from "./form";
export interface DialogueOption {
    display: string;
    nextStateId: string;
    data?: any;
}
export interface UserDialogue {
    id: string;
    type: "user";
    display: string[];
    options: DialogueOption[];
}
export interface DatabaseDialogue {
    id: string;
    type: "database";
    retrieveFunc: (userId: number, data: any) => Promise<{
        nextState: string;
        data: any;
    }>;
    displayFunc: (data: any) => string[];
}
export interface DatabaseOptionEvalDialogue {
    id: string;
    type: "databaseEval";
    display: string[];
    optionFunc: (userId: number, data: any) => Promise<DialogueOption[]>;
}
export interface FormDialogue {
    id: string;
    type: "form";
    display: string[];
    form: FormDefinition;
    submitFn: (userId: number, data: any) => Promise<{
        nextState: string;
        data: any;
    }>;
    cancelState: string;
}
export interface InputDialogue {
    id: string;
    type: "input";
    display: string[];
    evalFn: (userId: number, data: any, input: string) => Promise<{
        nextState: string;
        data: any;
    }>;
}
export type FSMState = UserDialogue | DatabaseDialogue | DatabaseOptionEvalDialogue | FormDialogue | InputDialogue;
export interface TransitionResult {
    state: string;
    type: FSMState["type"];
    display: string[];
    options: DialogueOption[];
    form?: FormDefinition;
    data?: any;
}
export declare class FSM {
    states: Map<string, FSMState>;
    constructor(states: FSMState[]);
    transition(studentId: number, chosenState: string, params: any): Promise<TransitionResult>;
}
