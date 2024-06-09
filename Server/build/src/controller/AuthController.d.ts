import { NextFunction, Request, Response } from "express";
import { User } from "../entity/schema";
export declare class AuthController {
    private userRepository;
    private studentRepository;
    private sessionRepository;
    login(request: Request, response: Response, next: NextFunction): Promise<{
        success: boolean;
    }>;
    trySessionLogin(request: Request, response: Response, next: NextFunction): Promise<{
        success: boolean;
    }>;
    register(request: Request, response: Response, next: NextFunction): Promise<{
        success: boolean;
    }>;
    static getUserForSession(sessionToken: string): Promise<User>;
}
