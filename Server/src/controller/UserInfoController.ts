import { AppDataSource } from "../data-source"
import { NextFunction, Request, Response } from "express"
import { AdminUser, Faculty, Session, Student } from "../entity/schema"

export class UserInfoController {

    private userRepository = AppDataSource.getRepository(Student)
    private sessionRepository = AppDataSource.getRepository(Session);

    async one(request: Request, response: Response, next: NextFunction) {
        let sessionToken = request.cookies["sessionToken"];
        if (sessionToken === undefined) {
            response.sendStatus(403);
            return;
        }

        let sess = await this.sessionRepository.findOne({
            where: {
                sessionToken: sessionToken
            },
            relations: {
                user: true
            }
        });

        if (sess == null) {
            response.sendStatus(403);
            return;
        }

        if (sess.user.type === "student") {

            let studentRepository = AppDataSource.getRepository(Student);
            let student = await studentRepository.findOne({
                where: {
                    user: {
                        id: sess.user.id
                    }
                }
            });

            return {
                name: student.name,
                branch: student.branch,
                email: student.email,
                batch: student.batch,
                idNo: sess.user.id,
                type: "student"
            }
        }
        if (sess.user.type === "faculty") {
            let facultyRepository = AppDataSource.getRepository(Faculty);
            let faculty = await facultyRepository.findOne({
                where: {
                    user: {
                        id: sess.user.id
                    }
                }
            });

            return {
                name: faculty.name,
                branch: faculty.branch,
                batch: "",
                email: faculty.email,
                idNo: faculty.id,
                type: faculty.counsellor ? "counsellor" : "faculty"
            }
        }

        if (sess.user.type === "admin") {
            let adminRespository = AppDataSource.getRepository(AdminUser);
            let admin = await adminRespository.findOne({
                where: {
                    user: {
                        id: sess.user.id
                    }
                }
            });

            return {
                name: admin.name,
                branch: "Administration",
                batch: "",
                email: admin.email,
                idNo: admin.id,
                type: "admin"
            }
        }
    }

}