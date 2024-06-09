import { AppDataSource } from "../data-source"
import { NextFunction, Request, Response } from "express"
import { Session, Student, User } from "../entity/schema"
import * as bcrypt from "bcrypt";
import { Util } from "../util";
import { FindOperator, LessThanOrEqual } from "typeorm";

export class AuthController {

    private userRepository = AppDataSource.getRepository(User)
    private studentRepository = AppDataSource.getRepository(Student)
    private sessionRepository = AppDataSource.getRepository(Session)

    async login(request: Request, response: Response, next: NextFunction) {
        let jsonBody = request.body;
        let id = jsonBody.id;
        let password = jsonBody.password;

        let user = await this.userRepository.findOne({
            where: {
                userId: id
            }
        });

        if (user == null) {
            return {
                success: false
            }
        }  

        let res = await bcrypt.compare(password, user.passwordHash);
        if (!res) {
            return {
                success: false
            }
        }

        let currentDate = new Date(Date.now());
        let session = await this.sessionRepository.createQueryBuilder()
            .select("sessionToken")
            .where("session.userId = :id", { id })
            .andWhere("session.expireDate > :currentDate", { currentDate }).getOne();
        
        if (session == null) {
            let sess = this.sessionRepository.create({
                expireDate: new Date(Date.now() + 1000 * 60 * 60 * 24 * 7), // 7 days session
                sessionToken: Util.randomString(32),
                user: user
            });
            this.sessionRepository.save(sess);
            response.cookie("sessionToken", sess.sessionToken, { maxAge: 1000 * 60 * 60 * 24 * 7 });
            response.json({
                success: true,
                sessionToken: sess.sessionToken
            });
        } else {
            response.cookie("sessionToken", session.sessionToken, { maxAge: 1000 * 60 * 60 * 24 * 7 });
            response.json({
                success: true,
                sessionToken: session.sessionToken
            });
        }
    }

    async trySessionLogin(request: Request, response: Response, next: NextFunction) {
        let jsonBody = request.body;
        let sessionToken = jsonBody.sessionToken;

        let session = await this.sessionRepository.findOne({
            where: {
                sessionToken: sessionToken
            }
        });

        if (session == null) {
            return {
                success: false
            }
        } else {
            return {
                success: true
            }
        }
    }

    async register(request: Request, response: Response, next: NextFunction) {
        let jsonBody = request.body;
        let name = jsonBody.name;
        let id = jsonBody.id;
        let password = jsonBody.password;

        let userId = await this.userRepository.findOne({
            where: {
                userId: id
            }
        });

        if (userId != null) {
            return {
                success: false
            }
        }

        let pwdHash = await bcrypt.hash(password, 10);
        let user = await this.userRepository.create({
            userId: id,
            passwordHash: pwdHash,
            type: "student"
        });

        this.userRepository.save(user);

        let student = await this.studentRepository.create({
            name: name,
            email: jsonBody.email,
            batch: jsonBody.batch,
            contact: jsonBody.contact,
            branch: jsonBody.branch,
            user: user
        });

        this.studentRepository.save(student);

       

        return {
            success: true
        }
    }

    static async getUserForSession(sessionToken: string) {
        let sessionRepository = AppDataSource.getRepository(Session)
        let sess = await sessionRepository.find({
            where: {
                sessionToken: sessionToken
            },
            relations: {
                user: true
            }
        });
        if (sess.length == 0) {
            return null;
        }
        return sess[0].user;
    }

}