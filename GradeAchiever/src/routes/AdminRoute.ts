
import { NextFunction, Request, Response, Router } from "express";
import {AdminController} from "../controllers/AdminController";
import {SessionController} from "../controllers/SessionController";
import { BaseRoute } from "./route";

export class AdminRoute extends BaseRoute {
    public static create(router: Router) {
        console.log("[AdminRoute::create] Creating admin page route.");
        router.post("/admin", (req: Request, res: Response, next: NextFunction) => {
            console.log("Posting admin - req is ");
            console.log(req.body);
            console.log("Reached Admin page route");
            new AdminRoute().Admin(req, res, next, req.body.user);
        });

        router.post("/deleteUser", (req: Request, res: Response, next: NextFunction) => {
            console.log("Posting deleteUser - req is ");
            console.log(req.body);
            new AdminRoute().deleteUser(req, res, next, req.body.id, req.body.thisID);
        });

        router.post("/createUser", (req: Request, res: Response, next: NextFunction) => {
            console.log("Posting createUser - req is ");
            console.log(req.body);
            new AdminRoute().createUser(req, res, next, req.body.name, req.body.email, req.body.isAdmin, req.body.thisID);
        });

    }
    public async Admin(req: Request, res: Response, next: NextFunction, id: number, OpError?: string) {
        console.log("id in adminrouter is " + id);
        console.log("value of id is" + id.toString());
        const session = new SessionController();
        this.title = "Admin";
        session.RequestUsers(req, res, next)
        .then((users) => {
            console.log(users);
            console.log("ID is " + id);
            // set message
            const options: object = {
                thisID: id,
                isAdmin: true,
                users,
                Mess: OpError,

            };

            console.log(options);
            return options;
        })
        .catch((err) => {
            console.log(err.message);
        })
        .then((options: any) => {
            // render template
            this.render(req, res, "admin", options);
        });

    }

    // Posted to delete user from db by StudentID
    public async deleteUser(req: Request, res: Response, next: NextFunction, id: number, thisID: number) {
        console.log("value of id to delete is " + id.toString());
        const adminCtrl = new AdminController();
        this.title = "DeleteUser";
        adminCtrl.DeleteUser(req, res, next, id)
        .then((message) => {
            if (message.deletedCount === 0) {
                const Mess = "Failed to delete user.";
                this.Admin(req, res, next, thisID, Mess);
            } else {
                // console.log(res);
                // res.redirect(307, "/admin");
                this.Admin(req, res, next, thisID);
            }
        });

    }

    // Poseted to create a new user in db with name, email, and IsAdmin
    public async createUser(req: Request, res: Response, next: NextFunction, name: string, email: string, isAdmin: boolean, thisID: number) {
        //Check if Admin user radio was checked
        if (isAdmin === undefined) {
            isAdmin = false;
        }
        const adminCtrl = new AdminController();
        this.title = "CreateUser";
        adminCtrl.CreateUser(req, res, next, String(name), String(email), Boolean(isAdmin))
        .then((resp) => {
            console.log("GOT RESPONSE");
            console.log(resp);
            // If new user creation failed, reload page with message
            if (resp.insertedCount === 0) {
                const Mess = "Failed to create user.";
                this.Admin(req, res, next, thisID, Mess);
            // Reload page with newest user
            } else {
                this.Admin(req, res, next, thisID);
            }
        })
        .catch((err) => {
            console.log(err);
            //If error was thrown, reload page with message
            const Mess = "Failed to create user.";
            try {
                this.Admin(req, res, next, thisID, Mess);
            } catch {
                return;
            }
        });

    }

}
