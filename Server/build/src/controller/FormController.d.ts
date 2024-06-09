import { NextFunction, Request, Response } from "express";
import { Complaint, Doubts, GeneralForm, Leave } from "../entity/schema";
export declare class FormController {
    private userRepository;
    private sessionRepository;
    private facultyRepository;
    getDoubts(request: Request, response: Response, next: NextFunction): Promise<{
        success: boolean;
        reason: string;
        doubts?: undefined;
    } | {
        success: boolean;
        doubts: Doubts[];
        reason?: undefined;
    }>;
    getLeaves(request: Request, response: Response, next: NextFunction): Promise<{
        success: boolean;
        reason: string;
        leaves?: undefined;
    } | {
        success: boolean;
        leaves: Leave[];
        reason?: undefined;
    }>;
    getFeedbacks(request: Request, response: Response, next: NextFunction): Promise<{
        success: boolean;
        reason: string;
        feedbacks?: undefined;
    } | {
        success: boolean;
        feedbacks: Object;
        reason?: undefined;
    }>;
    getOtherForms(request: Request, response: Response, next: NextFunction): Promise<{
        success: boolean;
        reason: string;
        forms?: undefined;
    } | {
        success: boolean;
        forms: GeneralForm[];
        reason?: undefined;
    }>;
    getComplaints(request: Request, response: Response, next: NextFunction): Promise<{
        success: boolean;
        reason: string;
        forms?: undefined;
    } | {
        success: boolean;
        forms: Complaint[];
        reason?: undefined;
    }>;
    updateStatus(request: Request, response: Response, next: NextFunction): Promise<{
        success: boolean;
        reason: string;
    }>;
}
