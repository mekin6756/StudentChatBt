import { NextFunction, Request, Response } from "express";
export declare class StudentController {
    private userRepository;
    private sessionRepository;
    one(request: Request, response: Response, next: NextFunction): Promise<{
        name: string;
        branch: string;
        email: string;
        batch: string;
        idNo: number;
    }>;
}
