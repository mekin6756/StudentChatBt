import { AuthController } from "./controller/AuthController";
import { DialogueController } from "./controller/DialogueController";
import { UserInfoController } from "./controller/UserInfoController";
import { FormController } from "./controller/FormController";
export declare const Routes: ({
    method: string;
    route: string;
    controller: typeof UserInfoController;
    action: string;
} | {
    method: string;
    route: string;
    controller: typeof AuthController;
    action: string;
} | {
    method: string;
    route: string;
    controller: typeof DialogueController;
    action: string;
} | {
    method: string;
    route: string;
    controller: typeof FormController;
    action: string;
})[];
