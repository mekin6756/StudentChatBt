'use strict';

var express = require('express');
var bodyParser = require('body-parser');
require('reflect-metadata');
var typeorm = require('typeorm');
var bcrypt = require('bcrypt');
var use = require('@tensorflow-models/universal-sentence-encoder');
require('@tensorflow/tfjs-backend-cpu');
var cookieParser = require('cookie-parser');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

function _interopNamespace(e) {
    if (e && e.__esModule) return e;
    var n = Object.create(null);
    if (e) {
        Object.keys(e).forEach(function (k) {
            if (k !== 'default') {
                var d = Object.getOwnPropertyDescriptor(e, k);
                Object.defineProperty(n, k, d.get ? d : {
                    enumerable: true,
                    get: function () { return e[k]; }
                });
            }
        });
    }
    n["default"] = e;
    return Object.freeze(n);
}

var express__default = /*#__PURE__*/_interopDefaultLegacy(express);
var bodyParser__namespace = /*#__PURE__*/_interopNamespace(bodyParser);
var bcrypt__namespace = /*#__PURE__*/_interopNamespace(bcrypt);
var use__namespace = /*#__PURE__*/_interopNamespace(use);
var cookieParser__default = /*#__PURE__*/_interopDefaultLegacy(cookieParser);

/******************************************************************************
Copyright (c) Microsoft Corporation.

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
***************************************************************************** */

function __decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}

function __metadata(metadataKey, metadataValue) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(metadataKey, metadataValue);
}

function __awaiter(thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
}

typeof SuppressedError === "function" ? SuppressedError : function (error, suppressed, message) {
    var e = new Error(message);
    return e.name = "SuppressedError", e.error = error, e.suppressed = suppressed, e;
};

let User = class User extends typeorm.BaseEntity {
};
__decorate([
    typeorm.PrimaryGeneratedColumn(),
    __metadata("design:type", Number)
], User.prototype, "id", void 0);
__decorate([
    typeorm.Column(),
    __metadata("design:type", String)
], User.prototype, "userId", void 0);
__decorate([
    typeorm.Column(),
    __metadata("design:type", String)
], User.prototype, "passwordHash", void 0);
__decorate([
    typeorm.Column(),
    __metadata("design:type", String)
], User.prototype, "type", void 0);
__decorate([
    typeorm.OneToMany('Session', 'user'),
    __metadata("design:type", Array)
], User.prototype, "sessions", void 0);
User = __decorate([
    typeorm.Entity()
], User);
let Session = class Session extends typeorm.BaseEntity {
};
__decorate([
    typeorm.PrimaryGeneratedColumn(),
    __metadata("design:type", Number)
], Session.prototype, "id", void 0);
__decorate([
    typeorm.Column(),
    __metadata("design:type", String)
], Session.prototype, "sessionToken", void 0);
__decorate([
    typeorm.ManyToOne('User', 'sessions'),
    __metadata("design:type", Object)
], Session.prototype, "user", void 0);
__decorate([
    typeorm.Column(),
    __metadata("design:type", Date)
], Session.prototype, "expireDate", void 0);
Session = __decorate([
    typeorm.Entity()
], Session);
let Student = class Student extends typeorm.BaseEntity {
};
__decorate([
    typeorm.PrimaryGeneratedColumn(),
    __metadata("design:type", Number)
], Student.prototype, "id", void 0);
__decorate([
    typeorm.Column(),
    __metadata("design:type", String)
], Student.prototype, "name", void 0);
__decorate([
    typeorm.Column(),
    __metadata("design:type", String)
], Student.prototype, "email", void 0);
__decorate([
    typeorm.Column(),
    __metadata("design:type", String)
], Student.prototype, "contact", void 0);
__decorate([
    typeorm.Column(),
    __metadata("design:type", String)
], Student.prototype, "branch", void 0);
__decorate([
    typeorm.Column(),
    __metadata("design:type", String)
], Student.prototype, "batch", void 0);
__decorate([
    typeorm.Column(),
    __metadata("design:type", Number)
], Student.prototype, "semester", void 0);
__decorate([
    typeorm.OneToMany('Fees', 'student'),
    __metadata("design:type", Array)
], Student.prototype, "fees", void 0);
__decorate([
    typeorm.OneToMany('Complaint', 'student'),
    __metadata("design:type", Array)
], Student.prototype, "complaints", void 0);
__decorate([
    typeorm.OneToMany('Feedback', 'student'),
    __metadata("design:type", Array)
], Student.prototype, "feedbacks", void 0);
__decorate([
    typeorm.ManyToMany('Attendence'),
    typeorm.JoinTable(),
    __metadata("design:type", Array)
], Student.prototype, "attendences", void 0);
__decorate([
    typeorm.ManyToMany('Schedule'),
    typeorm.JoinTable(),
    __metadata("design:type", Array)
], Student.prototype, "schedules", void 0);
__decorate([
    typeorm.OneToMany('Result', 'student'),
    __metadata("design:type", Array)
], Student.prototype, "results", void 0);
__decorate([
    typeorm.OneToMany('Doubts', 'student'),
    __metadata("design:type", Array)
], Student.prototype, "doubts", void 0);
__decorate([
    typeorm.OneToMany('Leave', 'student'),
    __metadata("design:type", Array)
], Student.prototype, "leaves", void 0);
__decorate([
    typeorm.OneToMany('GeneralForm', 'student'),
    __metadata("design:type", Array)
], Student.prototype, "forms", void 0);
__decorate([
    typeorm.ManyToOne('Faculty', 'students'),
    __metadata("design:type", Object)
], Student.prototype, "counsellor", void 0);
__decorate([
    typeorm.OneToOne('User'),
    typeorm.JoinColumn(),
    __metadata("design:type", Object)
], Student.prototype, "user", void 0);
Student = __decorate([
    typeorm.Entity()
], Student);
let Faculty = class Faculty extends typeorm.BaseEntity {
};
__decorate([
    typeorm.PrimaryGeneratedColumn(),
    __metadata("design:type", Number)
], Faculty.prototype, "id", void 0);
__decorate([
    typeorm.Column(),
    __metadata("design:type", String)
], Faculty.prototype, "name", void 0);
__decorate([
    typeorm.Column(),
    __metadata("design:type", String)
], Faculty.prototype, "email", void 0);
__decorate([
    typeorm.Column(),
    __metadata("design:type", String)
], Faculty.prototype, "contact", void 0);
__decorate([
    typeorm.Column(),
    __metadata("design:type", String)
], Faculty.prototype, "branch", void 0);
__decorate([
    typeorm.Column(),
    __metadata("design:type", Boolean)
], Faculty.prototype, "counsellor", void 0);
__decorate([
    typeorm.OneToOne('User'),
    typeorm.JoinColumn(),
    __metadata("design:type", Object)
], Faculty.prototype, "user", void 0);
__decorate([
    typeorm.OneToMany('Student', 'counsellor'),
    __metadata("design:type", Array)
], Faculty.prototype, "students", void 0);
__decorate([
    typeorm.OneToMany('Subject', 'faculty'),
    __metadata("design:type", Array)
], Faculty.prototype, "subjects", void 0);
__decorate([
    typeorm.OneToMany('Doubts', 'faculty'),
    __metadata("design:type", Array)
], Faculty.prototype, "doubts", void 0);
Faculty = __decorate([
    typeorm.Entity()
], Faculty);
let AdminUser = class AdminUser extends typeorm.BaseEntity {
};
__decorate([
    typeorm.PrimaryGeneratedColumn(),
    __metadata("design:type", Number)
], AdminUser.prototype, "id", void 0);
__decorate([
    typeorm.Column(),
    __metadata("design:type", String)
], AdminUser.prototype, "name", void 0);
__decorate([
    typeorm.Column(),
    __metadata("design:type", String)
], AdminUser.prototype, "email", void 0);
__decorate([
    typeorm.Column(),
    __metadata("design:type", String)
], AdminUser.prototype, "contact", void 0);
__decorate([
    typeorm.OneToOne('User'),
    typeorm.JoinColumn(),
    __metadata("design:type", Object)
], AdminUser.prototype, "user", void 0);
AdminUser = __decorate([
    typeorm.Entity()
], AdminUser);
let Notice = class Notice extends typeorm.BaseEntity {
};
__decorate([
    typeorm.PrimaryGeneratedColumn(),
    __metadata("design:type", Number)
], Notice.prototype, "id", void 0);
__decorate([
    typeorm.Column(),
    __metadata("design:type", String)
], Notice.prototype, "datetime", void 0);
__decorate([
    typeorm.Column(),
    __metadata("design:type", String)
], Notice.prototype, "type", void 0);
__decorate([
    typeorm.Column(),
    __metadata("design:type", String)
], Notice.prototype, "content", void 0);
__decorate([
    typeorm.Column(),
    __metadata("design:type", String)
], Notice.prototype, "title", void 0);
__decorate([
    typeorm.Column(),
    __metadata("design:type", String)
], Notice.prototype, "expiry", void 0);
Notice = __decorate([
    typeorm.Entity()
], Notice);
let Fees = class Fees extends typeorm.BaseEntity {
};
__decorate([
    typeorm.PrimaryGeneratedColumn(),
    __metadata("design:type", Number)
], Fees.prototype, "id", void 0);
__decorate([
    typeorm.Column(),
    __metadata("design:type", Number)
], Fees.prototype, "semester", void 0);
__decorate([
    typeorm.Column(),
    __metadata("design:type", Boolean)
], Fees.prototype, "paid", void 0);
__decorate([
    typeorm.Column(),
    __metadata("design:type", Number)
], Fees.prototype, "amount", void 0);
__decorate([
    typeorm.ManyToOne('Student', 'fees'),
    typeorm.JoinColumn(),
    __metadata("design:type", Object)
], Fees.prototype, "student", void 0);
Fees = __decorate([
    typeorm.Entity()
], Fees);
let Complaint = class Complaint extends typeorm.BaseEntity {
};
__decorate([
    typeorm.PrimaryGeneratedColumn(),
    __metadata("design:type", Number)
], Complaint.prototype, "id", void 0);
__decorate([
    typeorm.Column(),
    __metadata("design:type", String)
], Complaint.prototype, "category", void 0);
__decorate([
    typeorm.Column(),
    __metadata("design:type", String)
], Complaint.prototype, "title", void 0);
__decorate([
    typeorm.Column(),
    __metadata("design:type", String)
], Complaint.prototype, "content", void 0);
__decorate([
    typeorm.Column(),
    __metadata("design:type", Date)
], Complaint.prototype, "date", void 0);
__decorate([
    typeorm.ManyToOne('Student', 'complaints'),
    __metadata("design:type", Object)
], Complaint.prototype, "student", void 0);
Complaint = __decorate([
    typeorm.Entity()
], Complaint);
let Feedback = class Feedback extends typeorm.BaseEntity {
};
__decorate([
    typeorm.PrimaryGeneratedColumn(),
    __metadata("design:type", Number)
], Feedback.prototype, "id", void 0);
__decorate([
    typeorm.JoinColumn(),
    typeorm.ManyToOne('Subject', 'feedbacks'),
    __metadata("design:type", Object)
], Feedback.prototype, "subject", void 0);
__decorate([
    typeorm.ManyToOne('Student', 'feedbacks'),
    __metadata("design:type", Object)
], Feedback.prototype, "student", void 0);
__decorate([
    typeorm.OneToMany('Options', 'feedback'),
    __metadata("design:type", Array)
], Feedback.prototype, "options", void 0);
Feedback = __decorate([
    typeorm.Entity()
], Feedback);
let Options = class Options extends typeorm.BaseEntity {
};
__decorate([
    typeorm.PrimaryGeneratedColumn(),
    __metadata("design:type", Number)
], Options.prototype, "id", void 0);
__decorate([
    typeorm.Column(),
    __metadata("design:type", String)
], Options.prototype, "question", void 0);
__decorate([
    typeorm.Column(),
    __metadata("design:type", String)
], Options.prototype, "reply", void 0);
__decorate([
    typeorm.ManyToOne('Feedback', 'options'),
    __metadata("design:type", Object)
], Options.prototype, "feedback", void 0);
Options = __decorate([
    typeorm.Entity()
], Options);
let Attendence = class Attendence extends typeorm.BaseEntity {
};
__decorate([
    typeorm.PrimaryGeneratedColumn(),
    __metadata("design:type", Number)
], Attendence.prototype, "id", void 0);
__decorate([
    typeorm.Column(),
    __metadata("design:type", Date)
], Attendence.prototype, "date", void 0);
__decorate([
    typeorm.JoinColumn(),
    typeorm.ManyToOne('Subject', 'attendences'),
    __metadata("design:type", Object)
], Attendence.prototype, "subject", void 0);
__decorate([
    typeorm.Column(),
    __metadata("design:type", Number)
], Attendence.prototype, "semester", void 0);
Attendence = __decorate([
    typeorm.Entity()
], Attendence);
let Schedule = class Schedule extends typeorm.BaseEntity {
};
__decorate([
    typeorm.PrimaryGeneratedColumn(),
    __metadata("design:type", Number)
], Schedule.prototype, "id", void 0);
__decorate([
    typeorm.Column(),
    __metadata("design:type", Date)
], Schedule.prototype, "date", void 0);
__decorate([
    typeorm.JoinColumn(),
    typeorm.ManyToOne('Subject', 'schedules'),
    __metadata("design:type", Object)
], Schedule.prototype, "subject", void 0);
__decorate([
    typeorm.Column(),
    __metadata("design:type", Number)
], Schedule.prototype, "semester", void 0);
__decorate([
    typeorm.Column(),
    __metadata("design:type", Number)
], Schedule.prototype, "duration", void 0);
Schedule = __decorate([
    typeorm.Entity()
], Schedule);
let Result = class Result extends typeorm.BaseEntity {
};
__decorate([
    typeorm.PrimaryGeneratedColumn(),
    __metadata("design:type", Number)
], Result.prototype, "id", void 0);
__decorate([
    typeorm.Column(),
    __metadata("design:type", String)
], Result.prototype, "credits", void 0);
__decorate([
    typeorm.JoinColumn(),
    typeorm.ManyToOne('Subject', 'results'),
    __metadata("design:type", Object)
], Result.prototype, "subject", void 0);
__decorate([
    typeorm.Column(),
    __metadata("design:type", Number)
], Result.prototype, "semester", void 0);
__decorate([
    typeorm.Column(),
    __metadata("design:type", String)
], Result.prototype, "grade", void 0);
__decorate([
    typeorm.Column(),
    __metadata("design:type", Number)
], Result.prototype, "cpi", void 0);
__decorate([
    typeorm.Column(),
    __metadata("design:type", Number)
], Result.prototype, "spi", void 0);
__decorate([
    typeorm.ManyToOne('Student', 'results'),
    __metadata("design:type", Object)
], Result.prototype, "student", void 0);
Result = __decorate([
    typeorm.Entity()
], Result);
let Doubts = class Doubts extends typeorm.BaseEntity {
};
__decorate([
    typeorm.PrimaryGeneratedColumn(),
    __metadata("design:type", Number)
], Doubts.prototype, "id", void 0);
__decorate([
    typeorm.JoinColumn(),
    typeorm.ManyToOne('Subject', 'doubts'),
    __metadata("design:type", Object)
], Doubts.prototype, "subject", void 0);
__decorate([
    typeorm.Column(),
    __metadata("design:type", Number)
], Doubts.prototype, "semester", void 0);
__decorate([
    typeorm.Column(),
    __metadata("design:type", String)
], Doubts.prototype, "content", void 0);
__decorate([
    typeorm.Column(),
    __metadata("design:type", String)
], Doubts.prototype, "topic", void 0);
__decorate([
    typeorm.ManyToOne('Faculty', 'doubts'),
    __metadata("design:type", Object)
], Doubts.prototype, "faculty", void 0);
__decorate([
    typeorm.Column(),
    __metadata("design:type", Date)
], Doubts.prototype, "date", void 0);
__decorate([
    typeorm.Column(),
    __metadata("design:type", String)
], Doubts.prototype, "status", void 0);
__decorate([
    typeorm.ManyToOne('Student', 'doubts'),
    __metadata("design:type", Object)
], Doubts.prototype, "student", void 0);
Doubts = __decorate([
    typeorm.Entity()
], Doubts);
let Subject = class Subject extends typeorm.BaseEntity {
};
__decorate([
    typeorm.PrimaryGeneratedColumn(),
    __metadata("design:type", Number)
], Subject.prototype, "id", void 0);
__decorate([
    typeorm.Column(),
    __metadata("design:type", String)
], Subject.prototype, "subjectCode", void 0);
__decorate([
    typeorm.Column(),
    __metadata("design:type", String)
], Subject.prototype, "subjectTitle", void 0);
__decorate([
    typeorm.OneToMany('Doubts', 'subject'),
    __metadata("design:type", Array)
], Subject.prototype, "doubts", void 0);
__decorate([
    typeorm.OneToMany('Schedule', 'subject'),
    __metadata("design:type", Array)
], Subject.prototype, "schedules", void 0);
__decorate([
    typeorm.OneToMany('Result', 'subject'),
    __metadata("design:type", Array)
], Subject.prototype, "results", void 0);
__decorate([
    typeorm.OneToMany('Attendence', 'subject'),
    __metadata("design:type", Array)
], Subject.prototype, "attendences", void 0);
__decorate([
    typeorm.OneToMany('Feedback', 'subject'),
    __metadata("design:type", Array)
], Subject.prototype, "feedbacks", void 0);
__decorate([
    typeorm.ManyToOne('Faculty', 'subjects'),
    __metadata("design:type", Object)
], Subject.prototype, "faculty", void 0);
Subject = __decorate([
    typeorm.Entity()
], Subject);
let Leave = class Leave extends typeorm.BaseEntity {
};
__decorate([
    typeorm.PrimaryGeneratedColumn(),
    __metadata("design:type", Number)
], Leave.prototype, "id", void 0);
__decorate([
    typeorm.Column(),
    __metadata("design:type", String)
], Leave.prototype, "type", void 0);
__decorate([
    typeorm.Column(),
    __metadata("design:type", Date)
], Leave.prototype, "startDate", void 0);
__decorate([
    typeorm.Column(),
    __metadata("design:type", Date)
], Leave.prototype, "endDate", void 0);
__decorate([
    typeorm.Column(),
    __metadata("design:type", String)
], Leave.prototype, "description", void 0);
__decorate([
    typeorm.Column(),
    __metadata("design:type", String)
], Leave.prototype, "status", void 0);
__decorate([
    typeorm.ManyToOne('Student', 'leaves'),
    __metadata("design:type", Object)
], Leave.prototype, "student", void 0);
Leave = __decorate([
    typeorm.Entity()
], Leave);
let GeneralForm = class GeneralForm extends typeorm.BaseEntity {
};
__decorate([
    typeorm.PrimaryGeneratedColumn(),
    __metadata("design:type", Number)
], GeneralForm.prototype, "id", void 0);
__decorate([
    typeorm.Column(),
    __metadata("design:type", String)
], GeneralForm.prototype, "topic", void 0);
__decorate([
    typeorm.Column(),
    __metadata("design:type", String)
], GeneralForm.prototype, "description", void 0);
__decorate([
    typeorm.ManyToOne('Student', 'forms'),
    __metadata("design:type", Object)
], GeneralForm.prototype, "student", void 0);
GeneralForm = __decorate([
    typeorm.Entity()
], GeneralForm);

const AppDataSource = new typeorm.DataSource({
    type: "sqlite",
    database: "database.sqlite",
    synchronize: true,
    logging: false,
    entities: [Student, Faculty, AdminUser, Notice, Fees, Complaint, Attendence, Schedule, Result, User, Session, Feedback, Options, Doubts, Subject, Leave, GeneralForm],
    migrations: [],
    subscribers: [],
});

class Util {
    static randomString(n) {
        let text = "";
        let possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
        for (let i = 0; i < n; i++)
            text += possible.charAt(Math.floor(Math.random() * possible.length));
        return text;
    }
}

class AuthController {
    constructor() {
        this.userRepository = AppDataSource.getRepository(User);
        this.studentRepository = AppDataSource.getRepository(Student);
        this.sessionRepository = AppDataSource.getRepository(Session);
    }
    login(request, response, next) {
        return __awaiter(this, void 0, void 0, function* () {
            let jsonBody = request.body;
            let id = jsonBody.id;
            let password = jsonBody.password;
            let user = yield this.userRepository.findOne({
                where: {
                    userId: id
                }
            });
            if (user == null) {
                return {
                    success: false
                };
            }
            let res = yield bcrypt__namespace.compare(password, user.passwordHash);
            if (!res) {
                return {
                    success: false
                };
            }
            let currentDate = new Date(Date.now());
            let session = yield this.sessionRepository.createQueryBuilder()
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
            }
            else {
                response.cookie("sessionToken", session.sessionToken, { maxAge: 1000 * 60 * 60 * 24 * 7 });
                response.json({
                    success: true,
                    sessionToken: session.sessionToken
                });
            }
        });
    }
    trySessionLogin(request, response, next) {
        return __awaiter(this, void 0, void 0, function* () {
            let jsonBody = request.body;
            let sessionToken = jsonBody.sessionToken;
            let session = yield this.sessionRepository.findOne({
                where: {
                    sessionToken: sessionToken
                }
            });
            if (session == null) {
                return {
                    success: false
                };
            }
            else {
                return {
                    success: true
                };
            }
        });
    }
    register(request, response, next) {
        return __awaiter(this, void 0, void 0, function* () {
            let jsonBody = request.body;
            let name = jsonBody.name;
            let id = jsonBody.id;
            let password = jsonBody.password;
            let userId = yield this.userRepository.findOne({
                where: {
                    userId: id
                }
            });
            if (userId != null) {
                return {
                    success: false
                };
            }
            let pwdHash = yield bcrypt__namespace.hash(password, 10);
            let user = yield this.userRepository.create({
                userId: id,
                passwordHash: pwdHash,
                type: "student"
            });
            this.userRepository.save(user);
            let student = yield this.studentRepository.create({
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
            };
        });
    }
    static getUserForSession(sessionToken) {
        return __awaiter(this, void 0, void 0, function* () {
            let sessionRepository = AppDataSource.getRepository(Session);
            let sess = yield sessionRepository.find({
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
        });
    }
}

let model = null;
function initializeModel() {
    return __awaiter(this, void 0, void 0, function* () {
        if (model === null)
            model = yield use__namespace.load();
    });
}
function getSentenceSimilarity(sentence1, sentence2) {
    return __awaiter(this, void 0, void 0, function* () {
        // uses Universal Sentence Encoder (U.S.E.):
        if (model === null)
            model = yield use__namespace.load();
        return yield embedSentences(sentence1, sentence2);
    });
}
function embedSentences(sentence1, sentence2) {
    return __awaiter(this, void 0, void 0, function* () {
        const sentences = [sentence1, sentence2];
        let embeddings = yield model.embed(sentences);
        const embeds = embeddings.arraySync();
        const sentence1Embedding = embeds[0];
        const sentence2Embedding = embeds[1];
        let similarity = getSimilarityPercent(sentence1Embedding, sentence2Embedding);
        return similarity;
    });
}
function getSimilarityPercent(embed1, embed2) {
    const similarity = cosineSimilarity(embed1, embed2);
    // cosine similarity -> % when doing text comparison, since cannot have -ve term frequencies: https://en.wikipedia.org/wiki/Cosine_similarity
    return similarity;
}
function cosineSimilarity(a, b) {
    // https://towardsdatascience.com/how-to-build-a-textual-similarity-analysis-web-app-aa3139d4fb71
    const magnitudeA = Math.sqrt(dotProduct(a, a));
    const magnitudeB = Math.sqrt(dotProduct(b, b));
    if (magnitudeA && magnitudeB) {
        // https://towardsdatascience.com/how-to-measure-distances-in-machine-learning-13a396aa34ce
        return dotProduct(a, b) / (magnitudeA * magnitudeB);
    }
    else {
        return 0;
    }
}
function dotProduct(a, b) {
    let sum = 0;
    for (let i = 0; i < a.length; i++) {
        sum += a[i] * b[i];
    }
    return sum;
}
// -------------------------------------------------
// function useModelToEmbedAllSentences(sentences, callback) {
//   require("@tensorflow/tfjs-node");
//   const use = require("@tensorflow-models/universal-sentence-encoder");
//   const fs = require("fs");
//   // uses Universal Sentence Encoder (U.S.E.):
//   use.load().then((model) => {
//     embedAllSentences(model, sentences, fs);
//   });
// }
// function embedAllSentences(model, sentences, fs) {
//   model.embed(sentences).then((embeddings) => {
//     const embeds = embeddings.arraySync();
//     if (fs) {
//       for (let i = 0; i < embeds.length; i++) {
//         const sentence = sentences[i];
//         const embed = embeds[i];
//         const addNewLine = i === 0 ? "" : "\n";
//         fs.appendFile("words.txt", addNewLine + sentence, function (err) {
//           if (err) throw err;
//           console.log(`Added word ${i}!`);
//         });
//         fs.appendFile("embeddings.txt", addNewLine + embed, function (err) {
//           if (err) throw err;
//           console.log(`Added embedding ${i}!`);
//         });
//       }
//       console.log("Done adding all words and embeddings (mapped by index).");
//     }
//   });
// }

function TextElement(min, max) {
    return {
        type: "text",
        min,
        max
    };
}
function TextAreaElement() {
    return {
        type: "textarea"
    };
}
function DateElement(min, max) {
    return {
        type: "date",
        min,
        max
    };
}
function DropdownElement(options) {
    return {
        type: "dropdown",
        options
    };
}
function DropdownOption(value, display) {
    return {
        id: value,
        value: value,
        display: display
    };
}
function DropdownDBElement(optionFn) {
    return {
        type: "dropdowndb",
        optionQuery: optionFn
    };
}

const LeaveForm = {
    fields: [
        {
            id: "leavetype",
            name: "Type of leave ",
            placeholder: "select leave type.",
            required: true,
            inputType: DropdownElement([
                DropdownOption("sickleave", "Sick Leave"),
                DropdownOption("personalleave", "Personal Leave"),
                DropdownOption("academicleave", "Academic Leave"),
                DropdownOption("specialcircumstanceleave", "Special Circumstance Leave"),
                DropdownOption("extracurricularleave", "Extracurricular Activity Leave"),
            ]),
        },
        {
            id: "startdate",
            name: "Start Date",
            placeholder: "",
            required: true,
            inputType: DateElement("now", "enddate"),
        },
        {
            id: "enddate",
            name: "End Date",
            placeholder: "",
            required: true,
            inputType: DateElement("startdate"),
        },
        {
            id: "description",
            name: "Description",
            placeholder: "Enter your description.",
            required: true,
            inputType: TextAreaElement(),
        },
    ],
};
const DoubtForm = {
    fields: [
        {
            id: "subject",
            name: "Subject",
            placeholder: "Select your Subject.",
            required: true,
            inputType: DropdownDBElement((userId) => __awaiter(void 0, void 0, void 0, function* () {
                let studentSource = AppDataSource.getRepository(Student);
                let student = yield studentSource.findOne({
                    where: {
                        id: userId
                    }
                });
                let results = yield studentSource.createQueryBuilder('student')
                    .innerJoin('student.schedules', 'schedule')
                    .innerJoin('schedule.subject', 'subject')
                    .where('student.id = :id', { id: student.id })
                    .select(['subject.id, subject.subjectCode', 'subject.subjectTitle']).distinct(true).getRawMany();
                return results.map(x => DropdownOption(x.subject_id, x.subject_subjectTitle));
            })),
        },
        {
            id: "faculty",
            name: "Faculty",
            placeholder: "Select faculty.",
            required: true,
            inputType: DropdownDBElement((userId) => __awaiter(void 0, void 0, void 0, function* () {
                let studentSource = AppDataSource.getRepository(Student);
                let student = yield studentSource.findOne({
                    where: {
                        id: userId
                    }
                });
                let results = yield studentSource.createQueryBuilder('student')
                    .innerJoin('student.schedules', 'schedule')
                    .innerJoin('schedule.subject', 'subject')
                    .innerJoin('subject.faculty', 'faculty')
                    .where('student.id = :id', { id: student.id })
                    .select(['faculty.id', 'faculty.name']).distinct(true).getRawMany();
                return results.map(x => DropdownOption(x.faculty_id, x.faculty_name));
            }))
        },
        {
            id: "topic",
            name: "Topic",
            placeholder: "Enter topic of your complaint.",
            required: true,
            inputType: TextElement(),
        },
        {
            id: "description",
            name: "Description",
            placeholder: "Enter your description.",
            required: true,
            inputType: TextAreaElement(),
        },
    ],
};
const FeedbackForm = {
    long: true,
    fields: [
        {
            id: "subject",
            name: "Subject",
            placeholder: "Select Subject.",
            required: true,
            inputType: DropdownDBElement((userId) => __awaiter(void 0, void 0, void 0, function* () {
                let studentSource = AppDataSource.getRepository(Student);
                let student = yield studentSource.findOne({
                    where: {
                        id: userId
                    }
                });
                let results = yield studentSource.createQueryBuilder('student')
                    .innerJoin('student.schedules', 'schedule')
                    .innerJoin('schedule.subject', 'subject')
                    .where('student.id = :id', { id: student.id })
                    .select(['subject.subjectCode', 'subject.subjectTitle']).distinct(true).getRawMany();
                return results.map(x => DropdownOption(x.subject_subjectCode, x.subject_subjectTitle));
            })),
        },
        {
            id: "q1",
            name: "About what percent of the class meetings (including tutorials / labs) did you attend?",
            placeholder: "",
            required: true,
            inputType: DropdownElement([
                DropdownOption("a1", "81% to 100 %"),
                DropdownOption("b1", "61% to 80%"),
                DropdownOption("c1", "41% to 60%"),
                DropdownOption("d1", "Not more than 40%"),
            ]),
        },
        {
            id: "q2",
            name: "How many hours per week on average did you spend on this course (Beyond class / tutorial / lab meetings' hours)?",
            placeholder: "",
            required: true,
            inputType: DropdownElement([
                DropdownOption("a2", "Nil"),
                DropdownOption("b2", "1 to 2 hrs"),
                DropdownOption("c2", "3 to 4 hrs"),
                DropdownOption("d2", "4 to 5 hrs"),
                DropdownOption("e2", "More than 5 hrs"),
            ]),
        },
        {
            id: "q3",
            name: "Teacher's preparation of the subject taught and for the organized conduction of the class/lab meetings",
            placeholder: "",
            required: true,
            inputType: DropdownElement([
                DropdownOption("a3", "Excellent"),
                DropdownOption("b3", "Very Good"),
                DropdownOption("c3", "Good"),
                DropdownOption("d3", "Fair"),
            ]),
        },
        {
            id: "q4",
            name: "Quality of the Material (Teaching aids, presentation slides, etc) used",
            placeholder: "",
            required: true,
            inputType: DropdownElement([
                DropdownOption("a4", "Excellent"),
                DropdownOption("b4", "Very Good"),
                DropdownOption("c4", "Good"),
                DropdownOption("d4", "Fair"),
            ]),
        },
        {
            id: "q5",
            name: "Ability of the Teacher to Explain",
            placeholder: "",
            required: true,
            inputType: DropdownElement([
                DropdownOption("a5", "Excellent"),
                DropdownOption("b5", "Very Good"),
                DropdownOption("c5", "Good"),
                DropdownOption("d5", "Fair"),
            ]),
        },
        {
            id: "q6",
            name: "Punctuality and Regularity of the Teacher",
            placeholder: "",
            required: true,
            inputType: DropdownElement([
                DropdownOption("a6", "Excellent"),
                DropdownOption("b6", "Very Good"),
                DropdownOption("c6", "Good"),
                DropdownOption("d6", "Fair"),
            ]),
        },
        {
            id: "q7",
            name: "Opportunities given for discussion in the class/lab (Interaction with students)",
            placeholder: "",
            required: true,
            inputType: DropdownElement([
                DropdownOption("a7", "Excellent"),
                DropdownOption("b7", "Very Good"),
                DropdownOption("c7", "Good"),
                DropdownOption("d7", "Fair"),
            ]),
        },
        {
            id: "q8",
            name: "Ability of the teacher to clarify students' doubts",
            placeholder: "",
            required: true,
            inputType: DropdownElement([
                DropdownOption("a8", "Excellent"),
                DropdownOption("b8", "Very Good"),
                DropdownOption("c8", "Good"),
                DropdownOption("d8", "Fair"),
            ]),
        },
        {
            id: "q9",
            name: "Quality of Questions in Mid Semester Theory Tests, Quizzes, and Assignments",
            placeholder: "",
            required: true,
            inputType: DropdownElement([
                DropdownOption("a9", "Excellent"),
                DropdownOption("b9", "Very Good"),
                DropdownOption("c9", "Good"),
                DropdownOption("d9", "Fair"),
            ]),
        },
        {
            id: "q10",
            name: "Declaration of Timely Results of Mid Sem Tests and Quizzes along with Necessary Feedback",
            placeholder: "",
            required: true,
            inputType: DropdownElement([
                DropdownOption("a10", "Excellent"),
                DropdownOption("b10", "Very Good"),
                DropdownOption("c10", "Good"),
                DropdownOption("d10", "Fair"),
            ]),
        },
        {
            id: "otherinput",
            name: "Any other inputs you may wish to share about the teacher(s) involved in this course.",
            placeholder: "Enter your description.",
            required: false,
            inputType: TextAreaElement(),
        },
    ],
};
const ComplaintForm = {
    fields: [
        {
            id: "complainttype",
            name: "Complaint Type",
            placeholder: "select type of complaint.",
            required: true,
            inputType: DropdownElement([
                DropdownOption("academic", "Academic"),
                DropdownOption("administrative", "Administrative"),
                DropdownOption("facilities", "Facilities"),
                DropdownOption("harassment", "Harassment"),
                DropdownOption("financial", "Financial"),
                DropdownOption("other", "Other"),
            ]),
        },
        {
            id: "topic",
            name: "Topic",
            placeholder: "Enter topic of complaint.",
            required: true,
            inputType: TextElement(),
        },
        {
            id: "description",
            name: "Description",
            placeholder: "Enter your description.",
            required: true,
            inputType: TextAreaElement(),
        },
    ],
};
const OtherForm = {
    fields: [
        {
            id: "topic",
            name: "Topic",
            placeholder: "Enter topic of form.",
            required: true,
            inputType: TextElement(),
        },
        {
            id: "description",
            name: "Description",
            placeholder: "Enter your description.",
            required: true,
            inputType: TextAreaElement(),
        },
    ],
};

class FSM {
    constructor(states) {
        this.states = new Map();
        for (const state of states) {
            this.states.set(state.id, state);
        }
    }
    transition(studentId, chosenState, params) {
        return __awaiter(this, void 0, void 0, function* () {
            let newState = this.states.get(chosenState);
            switch (newState.type) {
                case "user":
                    return {
                        state: chosenState,
                        type: "user",
                        display: newState.display,
                        options: newState.options.map(x => {
                            var _a;
                            return {
                                display: x.display,
                                nextStateId: x.nextStateId,
                                data: (_a = x.data) !== null && _a !== void 0 ? _a : params // Pass through
                            };
                        }),
                    };
                case "database":
                    let data = yield newState.retrieveFunc(studentId, params);
                    let fmt = yield newState.displayFunc(data.data);
                    let nextState = this.states.get(data.nextState); // Constraint
                    let options = nextState.options;
                    let strs = fmt.concat(nextState.display);
                    return {
                        state: chosenState,
                        type: "database",
                        display: strs,
                        options: options,
                        data: data.data
                    };
                case "databaseEval":
                    let opts = yield newState.optionFunc(studentId, params);
                    return {
                        state: chosenState,
                        type: "databaseEval",
                        display: newState.display,
                        options: opts
                    };
                case "form":
                    let newFields = yield Promise.all(newState.form.fields.map((field) => __awaiter(this, void 0, void 0, function* () {
                        if (field.inputType.type === "dropdowndb") {
                            let options = yield field.inputType.optionQuery(studentId);
                            return {
                                id: field.id,
                                placeholder: field.placeholder,
                                required: field.required,
                                name: field.name,
                                inputType: {
                                    type: "dropdown",
                                    options: options
                                }
                            };
                        }
                        else {
                            return field;
                        }
                    })));
                    let ourForm = {
                        fields: newFields,
                        long: newState.form.long
                    };
                    return {
                        state: chosenState,
                        type: "form",
                        display: newState.display,
                        options: [{
                                display: "Cancel",
                                nextStateId: newState.cancelState,
                            }],
                        form: ourForm
                    };
                case "input":
                    if (params === undefined || params.input === undefined) {
                        return {
                            state: chosenState,
                            type: "input",
                            display: newState.display,
                            options: [],
                            data: params
                        };
                    }
                    else {
                        let evalState = yield newState.evalFn(studentId, params, params.input);
                        return yield this.transition(studentId, evalState.nextState, evalState.data);
                    }
            }
        });
    }
}

const StudentFSM = new FSM([
    {
        id: "root",
        display: ["Hello student, what would you like to do?"],
        type: "user",
        options: [
            {
                display: "Exam results",
                nextStateId: "results_root",
            },
            {
                display: "Fee payment",
                nextStateId: "fees_root",
            },
            {
                display: "Notices",
                nextStateId: "notices_root",
            },
            {
                display: "Forms",
                nextStateId: "forms_root",
            },
            {
                display: "Schedule",
                nextStateId: "schedule_root"
            },
            {
                display: "Doubts",
                nextStateId: "doubts_root"
            }
        ],
    },
    {
        id: "root_back",
        display: [],
        type: "user",
        options: [
            {
                display: "Back",
                nextStateId: "root",
            },
        ],
    },
    {
        id: "results_root",
        type: "databaseEval",
        display: ["Which semester results would you like to see?"],
        optionFunc: (userId, data) => __awaiter(void 0, void 0, void 0, function* () {
            let storageSource = AppDataSource.getRepository(Result);
            let results = yield storageSource.find({
                where: {
                    student: {
                        id: userId,
                    },
                },
            });
            let semList = [...new Set(results.map((x) => x.semester))];
            return semList.map((x) => {
                return {
                    display: `Sem ${x}`,
                    nextStateId: "results_semester",
                    data: x,
                };
            });
        }),
    },
    {
        id: "results_semester",
        type: "database",
        retrieveFunc: (userId, data) => __awaiter(void 0, void 0, void 0, function* () {
            let storageSource = AppDataSource.getRepository(Result);
            let results = yield storageSource.find({
                where: {
                    semester: data,
                    student: {
                        id: userId,
                    },
                },
                relations: {
                    subject: true
                }
            });
            return {
                nextState: "root_back",
                data: results,
            };
        }),
        displayFunc: (data) => {
            let results = data;
            let strs = ["Your results for the specified semester are:"];
            for (let result of results) {
                strs.push(`${result.subject.subjectCode} of ${result.credits} credits: ${result.grade}`);
            }
            strs.push(`SPI: ${results[0].spi} | CPI: ${results[0].cpi}`);
            return strs;
        },
    },
    {
        id: "fees_root",
        type: "database",
        retrieveFunc: (userId, data) => __awaiter(void 0, void 0, void 0, function* () {
            let storageSource = AppDataSource.getRepository(Fees);
            let fees = yield storageSource.find({
                where: {
                    student: {
                        id: userId,
                    },
                },
            });
            return {
                nextState: "root_back",
                data: fees,
            };
        }),
        displayFunc: (data) => {
            let fees = data;
            let strs = ["You have paid the following fees:"];
            let hasPendingFees = false;
            for (let fee of fees) {
                if (fee.paid)
                    strs.push(`Semester ${fee.semester} fee of ${fee.amount} Rupees`);
                else
                    hasPendingFees = true;
            }
            if (hasPendingFees) {
                strs.push("You have the following pending fees:");
                for (let fee of fees) {
                    if (!fee.paid)
                        strs.push(`Semester ${fee.semester} fee of ${fee.amount} Rupees`);
                }
            }
            else {
                strs.push("You have no pending fees");
            }
            return strs;
        },
    },
    {
        id: "notices_root",
        type: "databaseEval",
        display: ["Which type of notices would you like to browse?"],
        optionFunc: (userId) => __awaiter(void 0, void 0, void 0, function* () {
            let noticeSource = AppDataSource.getRepository(Notice);
            let noticeTypes = yield noticeSource.createQueryBuilder().select("type").distinct(true).getRawMany();
            return noticeTypes.map((x) => {
                return {
                    nextStateId: "notices_type",
                    data: x.type,
                    display: x.type,
                };
            });
        }),
    },
    {
        id: "notices_type",
        type: "databaseEval",
        display: ["Which notice would you like to see?"],
        optionFunc: (userId, data) => __awaiter(void 0, void 0, void 0, function* () {
            let noticeSource = AppDataSource.getRepository(Notice);
            let notices = yield noticeSource.find({
                where: {
                    type: data,
                },
            });
            return notices.map((x) => {
                return {
                    display: x.title,
                    nextStateId: "notices_view",
                    data: x.id,
                };
            });
        }),
    },
    {
        id: "notices_view",
        type: "database",
        retrieveFunc: (userId, data) => __awaiter(void 0, void 0, void 0, function* () {
            let noticeSource = AppDataSource.getRepository(Notice);
            let notice = yield noticeSource.findOne({
                where: {
                    id: data,
                },
            });
            return {
                nextState: "root_back",
                data: notice,
            };
        }),
        displayFunc: (data) => {
            let notice = data;
            return [notice.content];
        },
    },
    {
        id: "forms_root",
        type: "databaseEval",
        display: ["Which of the forms would you like to submit?"],
        optionFunc: (userId) => __awaiter(void 0, void 0, void 0, function* () {
            let leaveSource = AppDataSource.getRepository(Leave);
            let leave = yield leaveSource.findOne({
                where: {
                    student: {
                        id: userId
                    },
                    status: "pending"
                }
            });
            let opts = [
                {
                    display: "Leave Application",
                    nextStateId: leave === null ? "leave_form" : "leave_form_pending",
                },
                {
                    display: "Feedback Form",
                    nextStateId: "feedback_form",
                },
                {
                    display: "Complaint Form",
                    nextStateId: "complaint_form",
                },
                {
                    display: "Other Form",
                    nextStateId: "other_form",
                },
                {
                    display: "Back",
                    nextStateId: "root",
                },
            ];
            return opts;
        })
    },
    {
        id: "invalid_form_data",
        type: "databaseEval",
        display: ["Invalid details passed to form. Please fill the form with correct details."],
        optionFunc: (userId, data) => __awaiter(void 0, void 0, void 0, function* () {
            let studentSource = AppDataSource.getRepository(Student);
            yield studentSource.findOne({
                where: {
                    id: userId,
                },
            });
            return [{
                    nextStateId: data,
                    display: "Back",
                }];
        })
    },
    {
        id: "form_success",
        type: "user",
        display: ["Form submitted successfully!"],
        options: [{
                display: "Back",
                nextStateId: "root",
            }]
    },
    {
        id: "leave_form",
        type: "form",
        cancelState: "forms_root",
        display: ["Fill below given form for your leave application"],
        form: LeaveForm,
        submitFn: (userId, data) => __awaiter(void 0, void 0, void 0, function* () {
            let studentSource = AppDataSource.getRepository(Student);
            let student = yield studentSource.findOne({
                where: {
                    id: userId,
                },
            });
            for (const val of Object.values(data)) { // Validate form
                if (val === null || (typeof val === "string" && val.trim() === "")) {
                    return {
                        nextState: "invalid_form_data",
                        data: "leave_form"
                    };
                }
            }
            let leaveSource = AppDataSource.getRepository(Leave);
            let leave = leaveSource.create({
                startDate: data.startdate,
                endDate: data.enddate,
                description: data.description,
                status: "pending",
                student: student,
                type: data.leavetype,
            });
            yield leaveSource.save(leave);
            return {
                nextState: "form_success",
                data: null,
            };
        }),
    },
    {
        id: "leave_form_pending",
        type: "user",
        display: ["You already have a leave form submitted! Please wait for it to be approved"],
        options: [
            {
                display: "Back",
                nextStateId: "forms_root",
            }
        ]
    },
    {
        id: "doubt_form",
        type: "form",
        cancelState: "doubts_root",
        display: ["Fill below given form for your doubt"],
        form: DoubtForm,
        submitFn: (userId, data) => __awaiter(void 0, void 0, void 0, function* () {
            let studentSource = AppDataSource.getRepository(Student);
            let student = yield studentSource.findOne({
                where: {
                    id: userId,
                },
            });
            let subjectSource = AppDataSource.getRepository(Subject);
            let subject = yield subjectSource.findOne({
                where: {
                    id: data.subject
                }
            });
            let doubtSource = AppDataSource.getRepository(Doubts);
            let doubt = doubtSource.create({
                date: new Date(Date.now()),
                faculty: data.faculty,
                subject: subject,
                semester: student.semester,
                topic: data.topic,
                content: data.description,
                status: "pending",
                student: student,
            });
            yield doubtSource.save(doubt);
            return {
                nextState: "form_success",
                data: null,
            };
        }),
    },
    {
        id: "feedback_form",
        type: "form",
        cancelState: "forms_root",
        display: ["Fill below given form for feedback"],
        form: FeedbackForm,
        submitFn: (userId, data) => __awaiter(void 0, void 0, void 0, function* () {
            for (const val of Object.values(data)) { // Validate form
                if (val === null || (typeof val === "string" && val.trim() === "")) {
                    return {
                        nextState: "invalid_form_data",
                        data: "feedback_form"
                    };
                }
            }
            let studentSource = AppDataSource.getRepository(Student);
            let student = yield studentSource.findOne({
                where: {
                    id: userId,
                },
            });
            let subjectSource = AppDataSource.getRepository(Subject);
            let subject = yield subjectSource.findOne({
                where: {
                    subjectCode: data.subject
                }
            });
            let feedbackSource = AppDataSource.getRepository(Feedback);
            let feedback = feedbackSource.create({
                subject: subject,
                student: student,
                options: []
            });
            let optionSource = AppDataSource.getRepository(Options);
            feedback.options = Object.keys(data).filter(x => x !== "subject").map(x => optionSource.create({
                feedback: feedback,
                question: x,
                reply: data[x]
            }));
            let savedFeedback = yield feedbackSource.save(feedback);
            feedback.options.forEach(x => x.feedback = savedFeedback);
            yield optionSource.save(feedback.options);
            return {
                nextState: "form_success",
                data: null,
            };
        }),
    },
    {
        id: "complaint_form",
        type: "form",
        cancelState: "forms_root",
        display: ["Fill below given form to register complaint"],
        form: ComplaintForm,
        submitFn: (userId, data) => __awaiter(void 0, void 0, void 0, function* () {
            for (const val of Object.values(data)) { // Validate form
                if (val === null || (typeof val === "string" && val.trim() === "")) {
                    return {
                        nextState: "invalid_form_data",
                        data: "complaint_form"
                    };
                }
            }
            let studentSource = AppDataSource.getRepository(Student);
            let student = yield studentSource.findOne({
                where: {
                    id: userId,
                },
            });
            let complaintSource = AppDataSource.getRepository(Complaint);
            let complaint = complaintSource.create({
                category: data.complainttype,
                content: data.description,
                date: new Date(Date.now()),
                title: data.topic,
                student: student,
            });
            yield complaintSource.save(complaint);
            return {
                nextState: "form_success",
                data: null,
            };
        }),
    },
    {
        id: "other_form",
        type: "form",
        cancelState: "forms_root",
        display: ["Fill form of other type"],
        form: OtherForm,
        submitFn: (userId, data) => __awaiter(void 0, void 0, void 0, function* () {
            for (const val of Object.values(data)) { // Validate form
                if (val === null || (typeof val === "string" && val.trim() === "")) {
                    return {
                        nextState: "invalid_form_data",
                        data: "other_form"
                    };
                }
            }
            let studentSource = AppDataSource.getRepository(Student);
            let student = yield studentSource.findOne({
                where: {
                    id: userId,
                },
            });
            let formSource = AppDataSource.getRepository(GeneralForm);
            let form = formSource.create({
                topic: data.topic,
                description: data.description,
                student: student,
            });
            yield formSource.save(form);
            return {
                nextState: "form_success",
                data: null,
            };
        }),
    },
    {
        id: "schedule_root",
        type: "database",
        retrieveFunc: (userId, data) => __awaiter(void 0, void 0, void 0, function* () {
            let studentSource = AppDataSource.getRepository(Student);
            let results = yield studentSource.createQueryBuilder('student')
                .innerJoin('student.schedules', 'schedule')
                .innerJoin('schedule.subject', 'subject')
                .innerJoin('subject.faculty', 'faculty')
                .where('student.id = :id', { id: userId })
                .andWhere('student.semester = schedule.semester')
                .select(['schedule.date, schedule.duration, subject.subjectCode', 'subject.subjectTitle, faculty.name']).getRawMany();
            let schedule = { days: [[], [], [], [], []] };
            let subjectNames = new Map();
            for (const result of results) {
                let facultyInitials = result.name.split(' ').map(x => x[0].toUpperCase()).join('');
                let date = new Date(result.date);
                let hours = date.getHours();
                let slotIndex = (hours >= 14) ? hours - 11 : hours - 10;
                let slot = { slotIndex: slotIndex, duration: result.duration, subjectCode: result.subjectCode, subjectName: result.subjectTitle, facultyName: facultyInitials };
                subjectNames.set(slot.subjectCode, slot.subjectName);
                schedule.days[date.getDay() - 1].push(slot);
            }
            return {
                nextState: "root_back",
                data: {
                    type: "schedule",
                    schedule: schedule,
                    subjectNames: subjectNames
                }
            };
        }),
        displayFunc: (data) => {
            let subjectNameLegend = ["Subjects:"];
            for (const [key, value] of data.subjectNames) {
                subjectNameLegend.push(`${key}: ${value}`);
            }
            return [`Here is your schedule: \n${subjectNameLegend.join('\n')}`];
        }
    },
    {
        id: "doubts_root",
        type: "user",
        display: ["What do you have in mind?"],
        options: [{
                display: "Ask a doubt",
                nextStateId: "doubt_form",
            }, {
                display: "Pending doubts",
                nextStateId: "doubt_view",
            }, {
                display: "Back",
                nextStateId: "root",
            }]
    },
    {
        id: "doubt_view",
        type: "database",
        retrieveFunc: (userId, data) => __awaiter(void 0, void 0, void 0, function* () {
            let doubtRepository = AppDataSource.getRepository(Doubts);
            let pendingDoubts = yield doubtRepository.find({
                where: {
                    student: {
                        id: userId
                    },
                    status: "pending"
                }
            });
            return {
                data: pendingDoubts,
                nextState: "root_back"
            };
        }),
        displayFunc: (data) => {
            let doubts = data;
            if (doubts.length === 0) {
                return ["You don't have any pending doubts"];
            }
            else {
                return ["Here are your pending doubts:"].concat(doubts.map(doubt => doubt.topic));
            }
        }
    }
]);

const FacultyFSM = new FSM([
    {
        id: "root",
        type: "database",
        retrieveFunc: (userId, data) => __awaiter(void 0, void 0, void 0, function* () {
            let facultySource = AppDataSource.getRepository(Faculty);
            let faculty = yield facultySource.findOne({
                where: {
                    id: userId
                }
            });
            return {
                nextState: "faculty_opts",
                data: faculty.name
            };
        }),
        displayFunc: (data) => {
            return ["Hello " + data + ", what would you like to do?"];
        }
    },
    {
        id: "faculty_opts",
        type: "user",
        display: [],
        options: [
            {
                display: "Attendance",
                nextStateId: "attendance_root",
            },
            {
                display: "Student Inquiry",
                nextStateId: "student_inquiry"
            },
            {
                display: "Doubts",
                nextStateId: "doubts_root"
            },
            {
                display: "Schedule",
                nextStateId: "schedule_root"
            }
        ]
    },
    {
        id: "root_back",
        display: [],
        type: "user",
        options: [
            {
                display: "Back",
                nextStateId: "root",
            },
        ],
    },
    {
        id: "attendance_root",
        type: "databaseEval",
        display: ["Choose a subject for which you want to see attendance"],
        optionFunc: (userId, data) => __awaiter(void 0, void 0, void 0, function* () {
            let subjectSource = AppDataSource.getRepository(Subject);
            let subjects = yield subjectSource.find({
                where: {
                    faculty: {
                        id: userId
                    }
                }
            });
            return subjects.map(x => {
                return {
                    display: x.subjectCode + ": " + x.subjectTitle,
                    nextStateId: "attendance_subject",
                    data: x.id
                };
            });
        }),
    },
    {
        id: "doubts_root",
        type: "database",
        retrieveFunc: (userId, data) => __awaiter(void 0, void 0, void 0, function* () {
            let doubtSource = AppDataSource.getRepository(Doubts);
            let pendingDoubts = yield doubtSource.find({
                where: {
                    faculty: {
                        id: userId
                    },
                    status: "pending"
                },
                relations: {
                    student: true,
                    subject: true
                }
            });
            return {
                data: pendingDoubts,
                nextState: "root_back"
            };
        }),
        displayFunc: (data) => {
            let doubts = data;
            if (doubts.length === 0) {
                return ["You have no pending doubts from students to resolve"];
            }
            else {
                return ["Here are the pending doubts from students:"].concat(doubts.map(d => {
                    return `${d.student.name} has a doubt for subject ${d.subject.subjectCode}: ${d.topic}`;
                }));
            }
        }
    },
    {
        id: "schedule_root",
        type: "database",
        retrieveFunc: (userId, data) => __awaiter(void 0, void 0, void 0, function* () {
            let studentSource = AppDataSource.getRepository(Student);
            let results = yield studentSource.createQueryBuilder('student')
                .innerJoin('student.schedules', 'schedule')
                .innerJoin('schedule.subject', 'subject')
                .innerJoin('subject.faculty', 'faculty')
                .where('faculty.id = :id', { id: userId })
                .select(['schedule.date, schedule.duration, subject.subjectCode', 'subject.subjectTitle, faculty.name']).getRawMany();
            let schedule = { days: [[], [], [], [], []] };
            let subjectNames = new Map();
            for (const result of results) {
                let facultyInitials = result.name.split(' ').map(x => x[0].toUpperCase()).join('');
                let date = new Date(result.date);
                let hours = date.getHours();
                let slotIndex = (hours >= 14) ? hours - 11 : hours - 10;
                let slot = { slotIndex: slotIndex, duration: result.duration, subjectCode: result.subjectCode, subjectName: result.subjectTitle, facultyName: facultyInitials };
                subjectNames.set(slot.subjectCode, slot.subjectName);
                schedule.days[date.getDay() - 1].push(slot);
            }
            return {
                nextState: "root_back",
                data: {
                    type: "schedule",
                    schedule: schedule,
                    subjectNames: subjectNames
                }
            };
        }),
        displayFunc: (data) => {
            let subjectNameLegend = ["Subjects:"];
            for (const [key, value] of data.subjectNames) {
                subjectNameLegend.push(`${key}: ${value}`);
            }
            return [`Here is your schedule: \n${subjectNameLegend.join('\n')}`];
        }
    },
    {
        id: "student_inquiry",
        type: "input",
        display: ["Enter the ID of the student you want to inquire about"],
        evalFn: (userId, data, input) => __awaiter(void 0, void 0, void 0, function* () {
            let studentSource = AppDataSource.getRepository(Student);
            let stud = yield studentSource.findOne({
                where: {
                    user: {
                        userId: input.trim()
                    }
                }
            });
            if (stud !== null) {
                return {
                    data: stud.id,
                    nextState: "student_inquiry_ask"
                };
            }
            else {
                return {
                    nextState: "student_inquiry_not_found",
                    data: null
                };
            }
        })
    },
    {
        id: "student_inquiry_ask",
        type: "user",
        display: ["What would you like to know about the student?"],
        options: [{
                display: "Personal Info",
                nextStateId: "student_inquiry_personal",
            }, {
                display: "Results",
                nextStateId: "student_inquiry_results"
            }, {
                display: "Subjects",
                nextStateId: "student_inquiry_subjects"
            }]
    },
    {
        id: "student_inquiry_not_found",
        type: "user",
        display: ["No such student found!"],
        options: [{
                display: "Back",
                nextStateId: "root"
            }]
    },
    {
        id: "student_inquiry_personal",
        type: "database",
        retrieveFunc: (userId, data) => __awaiter(void 0, void 0, void 0, function* () {
            let studentSource = AppDataSource.getRepository(Student);
            let student = yield studentSource.findOne({
                where: {
                    id: data
                },
            });
            return {
                data: student,
                nextState: "root_back"
            };
        }),
        displayFunc: (data) => {
            let student = data;
            return [
                `Name: ${student.name}`,
                `Branch: ${student.branch}`,
                `Email: ${student.email}`,
                `Contact: ${student.contact}`,
            ];
        }
    },
    {
        id: "student_inquiry_subjects",
        type: "database",
        retrieveFunc: (userId, data) => __awaiter(void 0, void 0, void 0, function* () {
            let studentSource = AppDataSource.getRepository(Student);
            let results = yield studentSource.createQueryBuilder('student')
                .innerJoin('student.schedules', 'schedule')
                .innerJoin('schedule.subject', 'subject')
                .where('student.id = :id', { id: data })
                .select(['subject.subjectCode', 'subject.subjectTitle']).distinct(true).getRawMany();
            return {
                data: results,
                nextState: "root_back"
            };
        }),
        displayFunc: (data) => {
            let results = data;
            return results.map(x => `${x.subject_subjectCode}: ${x.subject_subjectTitle}`);
        }
    },
    {
        id: "student_inquiry_results",
        type: "databaseEval",
        display: ["Which semester results would you like to see?"],
        optionFunc: (userId, data) => __awaiter(void 0, void 0, void 0, function* () {
            let storageSource = AppDataSource.getRepository(Result);
            let results = yield storageSource.find({
                where: {
                    student: {
                        id: data,
                    },
                },
            });
            let semList = [...new Set(results.map((x) => x.semester))];
            return semList.map((x) => {
                return {
                    display: `Sem ${x}`,
                    nextStateId: "student_inquiry_results_semester",
                    data: {
                        student: data,
                        semester: x
                    },
                };
            });
        }),
    },
    {
        id: "student_inquiry_results_semester",
        type: "database",
        retrieveFunc: (userId, data) => __awaiter(void 0, void 0, void 0, function* () {
            let storageSource = AppDataSource.getRepository(Result);
            let results = yield storageSource.find({
                where: {
                    semester: data.semester,
                    student: {
                        id: data.student,
                    },
                },
                relations: {
                    subject: true
                }
            });
            return {
                nextState: "root_back",
                data: results,
            };
        }),
        displayFunc: (data) => {
            let results = data;
            let strs = ["The student's results for the specified semester are:"];
            for (let result of results) {
                strs.push(`${result.subject.subjectCode} of ${result.credits} credits: ${result.grade}`);
            }
            strs.push(`SPI: ${results[0].spi} | CPI: ${results[0].cpi}`);
            return strs;
        },
    },
    {
        id: "attendance_subject",
        type: "user",
        display: ["What do you want to know regarding the attendance of your specified subject?"],
        options: [{
                display: "Average Attendance",
                nextStateId: "attendance_subject_avg"
            }, {
                display: "Student's Attendance",
                nextStateId: "attendance_subject_student"
            }]
    },
    {
        id: "attendance_subject_student",
        type: "input",
        display: ["Which student's attendance would you like to see?"],
        evalFn: (userId, data, input) => __awaiter(void 0, void 0, void 0, function* () {
            let studentSource = AppDataSource.getRepository(Student);
            let stud = yield studentSource.findOne({
                where: {
                    user: {
                        userId: input.trim()
                    }
                }
            });
            if (stud !== null) {
                return {
                    data: {
                        subject: data.data,
                        student: stud.id
                    },
                    nextState: "attendance_subject_student_result"
                };
            }
            else {
                return {
                    nextState: "student_inquiry_not_found",
                    data: null
                };
            }
        }),
    },
    {
        id: "attendance_subject_student_result",
        type: "database",
        retrieveFunc: (userId, data) => __awaiter(void 0, void 0, void 0, function* () {
            let d = data;
            let studentSource = AppDataSource.getRepository(Student);
            yield studentSource.findOne({
                where: {
                    id: d.student
                }
            });
            let soFar = (yield studentSource.createQueryBuilder('student')
                .innerJoin('student.schedules', 'schedule')
                .innerJoin('schedule.subject', 'subject')
                .where('student.id = :id', { id: d.student })
                .andWhere('subject.id = :id', { id: d.subject }).getRawMany()).length;
            let attended = (yield studentSource.createQueryBuilder('student')
                .innerJoin('student.schedules', 'schedule')
                .innerJoin('schedule.subject', 'subject')
                .innerJoin('student.attendences', 'attendence')
                .where('student.id = :id', { id: d.student })
                .andWhere('subject.id = :id', { id: d.subject })
                .andWhere('attendence.subject = subject.id').getRawMany()).length;
            return {
                nextState: "root_back",
                data: {
                    proper: soFar !== 0,
                    ratio: soFar !== 0 ? Math.min(attended / soFar, 1) : 0
                }
            };
        }),
        displayFunc: (data) => {
            if (data.proper) {
                return [`The student has ${data.ratio * 100}% attendance in the specified subject.`];
            }
            else {
                return [`The student does not have any attendance in the specified subject.`];
            }
        }
    },
    {
        id: "attendance_subject_avg",
        type: "database",
        retrieveFunc: (userId, data) => __awaiter(void 0, void 0, void 0, function* () {
            let d = data;
            let studentSource = AppDataSource.getRepository(Student);
            let soFar = (yield studentSource.createQueryBuilder('student')
                .innerJoin('student.schedules', 'schedule')
                .innerJoin('schedule.subject', 'subject')
                .where('subject.id = :id', { id: d })
                .andWhere('schedule.semester = student.semester').getRawMany()).length;
            let attended = (yield studentSource.createQueryBuilder('student')
                .innerJoin('student.schedules', 'schedule')
                .innerJoin('schedule.subject', 'subject')
                .innerJoin('student.attendences', 'attendence')
                .where('subject.id = :id', { id: d })
                .andWhere('attendence.subject = subject.id')
                .andWhere('schedule.semester = student.semester').getRawMany()).length;
            return {
                nextState: "root_back",
                data: {
                    proper: soFar !== 0,
                    ratio: soFar !== 0 ? Math.min(attended / soFar, 1) : 0
                }
            };
        }),
        displayFunc: (data) => {
            if (data.proper) {
                return [`The average attendance of the specified subject is ${data.ratio * 100}%.`];
            }
            else {
                return [`There is no attendance in the specified subject.`];
            }
        }
    }
]);

class DialogueController {
    constructor() {
        this.userRepository = AppDataSource.getRepository(User);
        this.sessionRepository = AppDataSource.getRepository(Session);
    }
    advanceDialogue(request, response, next) {
        return __awaiter(this, void 0, void 0, function* () {
            let jsonBody = request.body;
            let session = request.cookies["sessionToken"];
            let chosenState = jsonBody.chosenState;
            let params = jsonBody.params;
            let sessObj = yield this.sessionRepository.findOne({
                where: {
                    sessionToken: session
                },
                relations: {
                    user: true
                }
            });
            if (sessObj == null)
                return {
                    success: false,
                    reason: "expired"
                };
            let userType = sessObj.user.type;
            if (userType === "student") {
                let studentRepository = AppDataSource.getRepository(Student);
                let student = yield studentRepository.findOne({
                    where: {
                        user: {
                            id: sessObj.user.id
                        }
                    }
                });
                let transitionResult = yield StudentFSM.transition(student.id, chosenState, params);
                return Object.assign({ success: true }, transitionResult);
            }
            if (userType === "faculty") {
                let facultyRepository = AppDataSource.getRepository(Faculty);
                let faculty = yield facultyRepository.findOne({
                    where: {
                        user: {
                            id: sessObj.user.id
                        }
                    }
                });
                return Object.assign({ success: true }, yield FacultyFSM.transition(faculty.id, chosenState, params));
            }
            return {
                success: false,
                reason: "notfound"
            };
        });
    }
    chooseBestOption(request, response, next) {
        return __awaiter(this, void 0, void 0, function* () {
            let jsonBody = request.body;
            let userInput = jsonBody.userInput.toLowerCase().trim();
            let options = jsonBody.chatOptions;
            let similarityMap = new Map();
            console.log(`Received similarity event for ${options.length} options`);
            for (let opt of options) {
                let similarity = yield getSentenceSimilarity(userInput, opt.display.toLowerCase().trim());
                console.log(`Similarity ${similarity} for ${userInput} vs ${opt.display}`);
                similarityMap.set(opt, similarity);
            }
            let highestSimilarityEl = null;
            for (const [key, value] of similarityMap) {
                if (value > 0.3 && (highestSimilarityEl === null || similarityMap.get(highestSimilarityEl) < value)) {
                    highestSimilarityEl = key;
                }
            }
            if (highestSimilarityEl !== null) {
                return {
                    success: true,
                    option: highestSimilarityEl.display
                };
            }
            else {
                return {
                    success: false
                };
            }
        });
    }
    submitForm(request, response, next) {
        return __awaiter(this, void 0, void 0, function* () {
            let jsonBody = request.body;
            let session = request.cookies["sessionToken"];
            let sessObj = yield this.sessionRepository.findOne({
                where: {
                    sessionToken: session
                },
                relations: {
                    user: true
                }
            });
            if (sessObj == null)
                return {
                    success: false,
                    reason: "expired"
                };
            let formData = jsonBody.formData;
            let state = jsonBody.state;
            let userObj;
            let fsmState;
            let fsm;
            let userType = sessObj.user.type;
            if (userType === "student") {
                let studentRepository = AppDataSource.getRepository(Student);
                let student = yield studentRepository.findOne({
                    where: {
                        user: {
                            id: sessObj.user.id
                        }
                    }
                });
                userObj = student.id;
                fsmState = StudentFSM.states.get(state);
                fsm = StudentFSM;
            }
            if (userType === "faculty") {
                let facultyRepository = AppDataSource.getRepository(Faculty);
                let faculty = yield facultyRepository.findOne({
                    where: {
                        user: {
                            id: sessObj.user.id
                        }
                    }
                });
                userObj = faculty.id;
                fsmState = FacultyFSM.states.get(state);
                fsm = FacultyFSM;
            }
            if (fsmState.type === "form") {
                let transitionState = yield fsmState.submitFn(userObj, formData);
                let afterTransitionState = yield fsm.transition(userObj, transitionState.nextState, transitionState.data);
                return Object.assign({ success: true }, afterTransitionState);
            }
            return {
                success: false,
                reason: "invalid"
            };
        });
    }
}

class UserInfoController {
    constructor() {
        this.userRepository = AppDataSource.getRepository(Student);
        this.sessionRepository = AppDataSource.getRepository(Session);
    }
    one(request, response, next) {
        return __awaiter(this, void 0, void 0, function* () {
            let sessionToken = request.cookies["sessionToken"];
            if (sessionToken === undefined) {
                response.sendStatus(403);
                return;
            }
            let sess = yield this.sessionRepository.findOne({
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
                let student = yield studentRepository.findOne({
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
                };
            }
            if (sess.user.type === "faculty") {
                let facultyRepository = AppDataSource.getRepository(Faculty);
                let faculty = yield facultyRepository.findOne({
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
                };
            }
            if (sess.user.type === "admin") {
                let adminRespository = AppDataSource.getRepository(AdminUser);
                let admin = yield adminRespository.findOne({
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
                };
            }
        });
    }
}

class FormController {
    constructor() {
        this.userRepository = AppDataSource.getRepository(User);
        this.sessionRepository = AppDataSource.getRepository(Session);
        this.facultyRepository = AppDataSource.getRepository(Faculty);
    }
    getDoubts(request, response, next) {
        return __awaiter(this, void 0, void 0, function* () {
            let session = request.cookies["sessionToken"];
            let sessObj = yield this.sessionRepository.findOne({
                where: {
                    sessionToken: session
                },
                relations: {
                    user: true
                }
            });
            if (sessObj == null)
                return {
                    success: false,
                    reason: "expired"
                };
            let userType = sessObj.user.type;
            if (userType === "faculty") {
                let doubtRepository = AppDataSource.getRepository(Doubts);
                let doubts = yield doubtRepository.find({
                    where: {
                        faculty: {
                            user: {
                                id: sessObj.user.id
                            }
                        }
                    },
                    relations: {
                        subject: true,
                        student: true,
                    }
                });
                return {
                    success: true,
                    doubts: doubts
                };
            }
            return {
                success: false,
                reason: "unauthorized"
            };
        });
    }
    getLeaves(request, response, next) {
        return __awaiter(this, void 0, void 0, function* () {
            let session = request.cookies["sessionToken"];
            let sessObj = yield this.sessionRepository.findOne({
                where: {
                    sessionToken: session
                },
                relations: {
                    user: true
                }
            });
            if (sessObj == null)
                return {
                    success: false,
                    reason: "expired"
                };
            let userType = sessObj.user.type;
            if (userType === "faculty") {
                let facultyObj = yield this.facultyRepository.findOne({
                    where: {
                        user: {
                            id: sessObj.user.id
                        }
                    }
                });
                if (facultyObj.counsellor) {
                    let leaveRepository = AppDataSource.getRepository(Leave);
                    let leaves = yield leaveRepository.find({
                        where: {
                            student: {
                                counsellor: {
                                    id: typeorm.Equal(facultyObj.id)
                                }
                            }
                        },
                        relations: {
                            student: true
                        }
                    });
                    return {
                        success: true,
                        leaves: leaves
                    };
                }
                else {
                    return {
                        success: false,
                        reason: "unauthorized"
                    };
                }
            }
            if (userType === "student") {
                let leaveRepository = AppDataSource.getRepository(Leave);
                let leaves = yield leaveRepository.find({
                    where: {
                        student: {
                            user: {
                                id: sessObj.user.id
                            }
                        }
                    }
                });
                return {
                    success: true,
                    leaves: leaves
                };
            }
        });
    }
    getFeedbacks(request, response, next) {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            let session = request.cookies["sessionToken"];
            let sessObj = yield this.sessionRepository.findOne({
                where: {
                    sessionToken: session
                },
                relations: {
                    user: true
                }
            });
            if (sessObj == null)
                return {
                    success: false,
                    reason: "expired"
                };
            let userType = sessObj.user.type;
            if (userType === "faculty") {
                let feedbackRepository = AppDataSource.getRepository(Feedback);
                let feedbackDb = yield feedbackRepository.find({
                    where: {
                        subject: {
                            faculty: {
                                user: {
                                    id: sessObj.user.id
                                }
                            }
                        }
                    },
                    relations: {
                        options: true,
                        subject: true
                    }
                });
                // Calculate scores for each subject, for each option for the feedback
                let feedbackPerSubject = new Map();
                for (const feedback of feedbackDb) {
                    if (feedbackPerSubject.has(feedback.subject.subjectCode))
                        (_a = feedbackPerSubject.get(feedback.subject.subjectCode)) === null || _a === void 0 ? void 0 : _a.push(feedback);
                    else
                        feedbackPerSubject.set(feedback.subject.subjectCode, [feedback]);
                }
                let feedbackState = StudentFSM.states.get("feedback_form");
                let fieldDisplays = new Map(feedbackState.form.fields.filter(x => x.id !== "subject" && x.id !== "otherinput").map(y => {
                    return [y.id, {
                            question: y.name,
                            options: new Map(y.inputType.options.map(z => [z.id, z.display]))
                        }];
                }));
                let subjectDictObj = new Object();
                for (const [subjectId, feedbacks] of feedbackPerSubject) {
                    let optionAccumulator = new Map();
                    let otherInputs = [];
                    // Add the blanks
                    for (const [key, value] of fieldDisplays) {
                        optionAccumulator.set(value.question, new Map([...value.options.values()].map(x => [x, 0])));
                    }
                    for (const feedback of feedbacks) {
                        for (const option of feedback.options) {
                            if (option.question === "otherinput") {
                                otherInputs.push(option.reply);
                                continue;
                            }
                            let optDisplays = fieldDisplays.get(option.question);
                            let optQ = optDisplays.question;
                            let optR = optDisplays.options.get(option.reply);
                            if (optionAccumulator.has(optQ)) {
                                let optReply = optionAccumulator.get(optQ);
                                if (optReply.has(optR))
                                    optReply.set(optR, optReply.get(optR) + 1);
                                else
                                    optReply.set(optR, 1);
                                optionAccumulator.set(optQ, optReply);
                            }
                            else {
                                let optReply = new Map();
                                optReply.set(optR, 1);
                                optionAccumulator.set(optQ, optReply);
                            }
                        }
                    }
                    let subjectObj = new Object();
                    for (const [key, value] of optionAccumulator) {
                        subjectObj[key] = new Object();
                        let total = 0;
                        for (const [key2, value2] of value) {
                            total += value2;
                        }
                        for (const [key2, value2] of value) {
                            subjectObj[key][key2] = value2 / total;
                        }
                    }
                    subjectDictObj[subjectId] = subjectObj;
                    subjectDictObj[subjectId]["otherinputs"] = otherInputs;
                }
                return {
                    success: true,
                    feedbacks: subjectDictObj
                };
            }
        });
    }
    getOtherForms(request, response, next) {
        return __awaiter(this, void 0, void 0, function* () {
            let session = request.cookies["sessionToken"];
            let sessObj = yield this.sessionRepository.findOne({
                where: {
                    sessionToken: session
                },
                relations: {
                    user: true
                }
            });
            if (sessObj == null)
                return {
                    success: false,
                    reason: "expired"
                };
            let userType = sessObj.user.type;
            if (userType === "faculty") {
                let facultyObj = yield this.facultyRepository.findOne({
                    where: {
                        user: {
                            id: sessObj.user.id
                        }
                    }
                });
                if (facultyObj.counsellor) {
                    let otherRepository = AppDataSource.getRepository(GeneralForm);
                    let allForms = yield otherRepository.find({
                        where: {
                            student: {
                                counsellor: {
                                    id: typeorm.Equal(facultyObj.id)
                                }
                            }
                        },
                        relations: {
                            student: true
                        }
                    });
                    return {
                        success: true,
                        forms: allForms
                    };
                }
                else {
                    return {
                        success: false,
                        reason: "unauthorized"
                    };
                }
            }
            return {
                success: false,
                reason: "unauthorized"
            };
        });
    }
    getComplaints(request, response, next) {
        return __awaiter(this, void 0, void 0, function* () {
            let session = request.cookies["sessionToken"];
            let sessObj = yield this.sessionRepository.findOne({
                where: {
                    sessionToken: session
                },
                relations: {
                    user: true
                }
            });
            if (sessObj == null)
                return {
                    success: false,
                    reason: "expired"
                };
            let userType = sessObj.user.type;
            if (userType === "faculty") {
                let facultyObj = yield this.facultyRepository.findOne({
                    where: {
                        user: {
                            id: sessObj.user.id
                        }
                    }
                });
                if (facultyObj.counsellor) {
                    let otherRepository = AppDataSource.getRepository(Complaint);
                    let allForms = yield otherRepository.find({
                        where: {
                            student: {
                                counsellor: {
                                    id: typeorm.Equal(facultyObj.id)
                                }
                            }
                        },
                        relations: {
                            student: true
                        }
                    });
                    return {
                        success: true,
                        forms: allForms
                    };
                }
                else {
                    return {
                        success: false,
                        reason: "unauthorized"
                    };
                }
            }
            return {
                success: false,
                reason: "unauthorized"
            };
        });
    }
    updateStatus(request, response, next) {
        return __awaiter(this, void 0, void 0, function* () {
            let session = request.cookies["sessionToken"];
            let sessObj = yield this.sessionRepository.findOne({
                where: {
                    sessionToken: session
                },
                relations: {
                    user: true
                }
            });
            if (sessObj == null)
                return {
                    success: false,
                    reason: "expired"
                };
            let jsonBody = request.body;
            if (jsonBody.type === "leave") {
                let leaveRepo = AppDataSource.getRepository(Leave);
                yield leaveRepo.update({
                    id: jsonBody.id
                }, {
                    status: jsonBody.status
                });
                return {
                    success: true,
                    reason: "updated"
                };
            }
            if (jsonBody.type === "doubt") {
                let doubtRepo = AppDataSource.getRepository(Doubts);
                yield doubtRepo.update({
                    id: jsonBody.id
                }, {
                    status: jsonBody.status
                });
                return {
                    success: true,
                    reason: "updated"
                };
            }
            return {
                success: false,
                reason: "unauthorized"
            };
        });
    }
}

const Routes = [{
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
    }];

AppDataSource.initialize().then(() => __awaiter(void 0, void 0, void 0, function* () {
    // create express app
    const app = express__default["default"]();
    app.use('/', express__default["default"].static('../Client/dist')); // Host the client app
    app.use(bodyParser__namespace.json());
    app.use(cookieParser__default["default"]());
    // await deleteRandomAttendances();
    // await addDummyStudents();
    // register express routes from defined application routes
    Routes.forEach(route => {
        app[route.method](route.route, (req, res, next) => {
            const result = (new route.controller)[route.action](req, res, next);
            if (result instanceof Promise) {
                result.then(result => result !== null && result !== undefined ? res.send(result) : undefined);
            }
            else if (result !== null && result !== undefined) {
                res.json(result);
            }
        });
    });
    {
        console.log("Preloading ML model");
        yield initializeModel();
    }
    app.get("/login", (req, res) => {
        res.sendFile("index.html", { root: "../Client/dist" });
    });
    app.get("/dashboard", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        let sessionToken = req.cookies["sessionToken"];
        if (sessionToken === undefined) {
            res.sendStatus(403);
            return;
        }
        let user = yield AuthController.getUserForSession(sessionToken);
        if (user === null) {
            res.sendStatus(403);
            return;
        }
        res.sendFile("index.html", { root: "../Client/dist" });
    }));
    // setup express app here
    // ...
    // start express server
    console.log("Express server has started on port 3000. Open http://localhost:3000/login to see results");
    app.listen(3000);
})).catch(error => console.log(error));
