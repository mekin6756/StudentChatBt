import express from "express"
import * as bodyParser from "body-parser"
import { Request, Response } from "express"
import { AppDataSource } from "./data-source"
import { Routes } from "./routes"
import cookieParser from "cookie-parser";
import { AuthController } from "./controller/AuthController"
import { initializeModel } from './ml/similarity'
import { addDummyStudents, deleteRandomAttendances } from "./dummy"

AppDataSource.initialize().then(async () => {

    // create express app
    const app = express()
    app.use('/', express.static('../Client/dist')) // Host the client app
    app.use(bodyParser.json())
    app.use(cookieParser());

    // await deleteRandomAttendances();

    // await addDummyStudents();

    // register express routes from defined application routes
    Routes.forEach(route => {
        (app as any)[route.method](route.route, (req: Request, res: Response, next: Function) => {
            const result = (new (route.controller as any))[route.action](req, res, next)
            if (result instanceof Promise) {
                result.then(result => result !== null && result !== undefined ? res.send(result) : undefined)

            } else if (result !== null && result !== undefined) {
                res.json(result)
            }
        })
    })

    let useML = true;

    if (useML) {
        console.log("Preloading ML model");
        await initializeModel();
    } else {
        console.log("ML model not preloaded, it will take time when it is needed");
    }

    app.get("/login", (req: Request, res: Response) => {
        res.sendFile("index.html", { root: "../Client/dist" })
    })

    app.get("/dashboard", async (req: Request, res: Response) => {
        let sessionToken = req.cookies["sessionToken"];
        if (sessionToken === undefined) {
            res.sendStatus(403);
            return;
        }
        let user = await AuthController.getUserForSession(sessionToken);
        if (user === null) {
            res.sendStatus(403);
            return;
        }
        res.sendFile("index.html", { root: "../Client/dist" })
    })

    // setup express app here
    // ...

    // start express server
    console.log("Express server has started on port 3000. Open http://localhost:3000/login to see results")
    app.listen(3000)

}).catch(error => console.log(error))
