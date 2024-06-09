import { DropdownElementType, FormDefinition } from "./form";

export interface DialogueOption {
    display: string,
    nextStateId: string,
    data?: any
}

export interface UserDialogue {
    id: string,
    type: "user",
    display: string[],
    options: DialogueOption[],
}

export interface DatabaseDialogue {
    id: string,
    type: "database",
    retrieveFunc: (userId: number, data: any) => Promise<{ nextState: string, data: any }>,
    displayFunc: (data: any) => string[],
}

export interface DatabaseOptionEvalDialogue {
    id: string,
    type: "databaseEval",
    display: string[],
    optionFunc: (userId: number, data: any) => Promise<DialogueOption[]>,
}

export interface FormDialogue {
    id: string,
    type: "form",
    display: string[],
    form: FormDefinition,
    submitFn: (userId: number, data: any) => Promise<{ nextState: string, data: any }>,
    cancelState: string
}

export interface InputDialogue {
    id: string,
    type: "input",
    display: string[],
    evalFn: (userId: number, data: any, input: string) => Promise<{ nextState: string, data: any }>,
}

export type FSMState = UserDialogue | DatabaseDialogue | DatabaseOptionEvalDialogue | FormDialogue | InputDialogue;

export interface TransitionResult {
    state: string,
    type: FSMState["type"],
    display: string[],
    options: DialogueOption[],
    form?: FormDefinition,
    data?: any
}

export class FSM {
    states: Map<string, FSMState>;

    constructor(states: FSMState[]) {
        this.states = new Map();
        for (const state of states) {
            this.states.set(state.id, state);
        }
    }

    async transition(studentId: number, chosenState: string, params: any): Promise<TransitionResult> {
        let newState = this.states.get(chosenState);
        switch (newState.type) {
            case "user":
                return {
                    state: chosenState,
                    type: "user",
                    display: newState.display,
                    options: newState.options.map(x => {
                        return {
                            display: x.display,
                            nextStateId: x.nextStateId,
                            data: x.data ?? params // Pass through
                        }
                    }),
                }
            
            case "database":
                let data = await newState.retrieveFunc(studentId, params);
                let fmt = await newState.displayFunc(data.data);
                let nextState = this.states.get(data.nextState) as UserDialogue; // Constraint
                let options = nextState.options;
                let strs = fmt.concat(nextState.display);
                return {
                    state: chosenState,
                    type: "database",
                    display: strs,
                    options: options,
                    data: data.data
                }

            case "databaseEval":
                let opts = await newState.optionFunc(studentId, params);
                return {
                    state: chosenState,
                    type: "databaseEval",
                    display: newState.display,
                    options: opts
                }

            case "form":
                let newFields = await Promise.all(newState.form.fields.map(async (field) => {
                    if (field.inputType.type === "dropdowndb") {
                        let options = await field.inputType.optionQuery(studentId);
                        return {
                            id: field.id,
                            placeholder: field.placeholder,
                            required: field.required,
                            name: field.name,
                            inputType: {
                                type: "dropdown",
                                options: options
                            }
                        }
                    } else {
                        return field;
                    }
                }));
                let ourForm: FormDefinition = {
                    fields: newFields as FormDefinition["fields"],
                    long: newState.form.long
                }

                return {
                    state: chosenState,
                    type: "form",
                    display: newState.display,
                    options: [{
                        display: "Cancel",
                        nextStateId: newState.cancelState,
                    }],
                    form: ourForm
                }
        
            case "input":
                if (params === undefined || params.input === undefined) {
                    return {
                        state: chosenState,
                        type: "input",
                        display: newState.display,
                        options: [],
                        data: params
                    }
                } else {
                    let evalState = await newState.evalFn(studentId, params, params.input);
                    return await this.transition(studentId, evalState.nextState, evalState.data);
                }
        }
    }
}