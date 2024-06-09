import { NextFunction, Request, Response } from "express";
import { DialogueOption } from "../fsm";
export declare class DialogueController {
    private userRepository;
    private sessionRepository;
    advanceDialogue(request: Request, response: Response, next: NextFunction): Promise<{
        success: boolean;
        reason: string;
    } | {
        state: string;
        type: "user" | "database" | "databaseEval" | "form" | "input";
        display: string[];
        options: DialogueOption[];
        form?: import("../form").FormDefinition;
        data?: any;
        success: boolean;
        reason?: undefined;
    }>;
    chooseBestOption(request: Request, response: Response, next: NextFunction): Promise<{
        success: boolean;
        option: string;
    } | {
        success: boolean;
        option?: undefined;
    }>;
    submitForm(request: Request, response: Response, next: NextFunction): Promise<{
        success: boolean;
        reason: string;
    } | {
        state: string;
        type: "user" | "database" | "databaseEval" | "form" | "input";
        display: string[];
        options: DialogueOption[];
        form?: import("../form").FormDefinition;
        data?: any;
        success: boolean;
        reason?: undefined;
    }>;
}
