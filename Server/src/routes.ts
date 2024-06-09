import { AuthController } from "./controller/AuthController"
import { DialogueController } from "./controller/DialogueController"
import { UserInfoController } from "./controller/UserInfoController"
import { FormController } from "./controller/FormController"

export const Routes = [{
    method: "get",
    route: "/api/info",
    controller: UserInfoController,
    action: "one"
}, {
    method: "post",
    route: "/api/login",
    controller: AuthController,
    action: "login"
}, {
    method: "post",
    route: "/api/session",
    controller: AuthController,
    action: "trySessionLogin"
}, {
    method: "post",
    route: "/api/register",
    controller: AuthController,
    action: "register"
}, {
    method: "post",
    route: "/api/dialogue",
    controller: DialogueController,
    action: "advanceDialogue"
}, {
    method: "post",
    route: "/api/dialogue/choose",
    controller: DialogueController,
    action: "chooseBestOption"    
}, {
    method: "post",
    route: "/api/forms",
    controller: DialogueController,
    action: "submitForm"
}, {
    method: "get",
    route: "/api/doubts",
    controller: FormController,
    action: "getDoubts"
}, {
    method: "get",
    route: "/api/leaves",
    controller: FormController,
    action: "getLeaves"
}, {
    method: "get",
    route: "/api/feedbacks",
    controller: FormController,
    action: "getFeedbacks"
}, {
    method: "get",
    route: "/api/otherforms",
    controller: FormController,
    action: "getOtherForms"
}, {
    method: "get",
    route: "/api/complaints",
    controller: FormController,
    action: "getComplaints"
}, {
    method: "post",
    route: "/api/formstatus",
    controller: FormController,
    action: "updateStatus"
}]