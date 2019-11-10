
import { NextFunction, Request, Response, Router } from "express";
import {OverviewController} from "../controllers/OverviewController";
import {SessionController} from "../controllers/SessionController";
import { BaseRoute } from "./route";

export class SessionRoute extends BaseRoute {
    public static create(router: Router) {
        console.log("[SessionRoute::create] Creating user homepage route.");
        router.post("/overview", (req: Request, res: Response, next: NextFunction) => {
            console.log(req.body);
            console.log(req.body.user);
            new SessionRoute().Session(req, res, next, Number(req.body.user));
        });
        router.post("/newUser", (req: Request, res: Response, next: NextFunction) => {
            new SessionRoute().createUser(req, res, next, req.body.name, req.body.email);
        });

    }
    public async Session(req: Request, res: Response, next: NextFunction, id: number) {
        const session = new SessionController();
        // First, verify if user is valid (currently always true)
        if (!await session.VerifyUser(req, res, next, id)) {
            this.render(req, res, "error");
            return;
        }
        // Then, populate the overview page
        const overviewCtrl = new OverviewController();
        this.title = "Home";
        overviewCtrl.RequestUser(id)
        .then((details) => {
            console.log(details);
            /*Details is an array of length 3 with the following fields -
                details[0] = studentDetails (Name, id, email, list of courses etc
                details[1] = courseDetails (CourseName,CourseID,list of gradable items etc)
                details[1] = gradableItemDetails (CourseName,CourseID,list of gradable items etc);
            */
            const options: object = {
                studentDetails: details[0],
                courseDetails: details[1],
                gradableItemDetails: details[2],
                thisID: id,
            };
            this.render(req, res, "userhome", options);
        })
        .catch((error) => {
           this.render(req, res, "error", error);
        });
    }

    public async createUser(req: Request, res: Response, next: NextFunction, name: string, email: string) {
        console.log("values of user to create is " + name.toString());
        console.log(email.toString());
        const sessionCtrl = new SessionController();
        this.title = "CreateUser";
        sessionCtrl.CreateUser(req, res, next, String(name), String(email))
        .then((resp) => {
            console.log(resp);
            if (resp.insertedCount === 0) {
                res.redirect("/");
            } else {
                this.Session(req, res, next, resp.ops[0].StudentID);
            }
        });

    }

}
