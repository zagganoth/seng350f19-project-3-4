
import { NextFunction, Request, Response, Router } from "express";
import {SessionController} from "../controllers/SessionController";
import {AdminController} from "../controllers/AdminController";
import { BaseRoute } from "./route";

export class AdminRoute extends BaseRoute {
    public static create(router: Router) {
        console.log("[AdminRoute::create] Creating admin page route.");
        router.post("/admin", (req: Request, res: Response, next: NextFunction) => {
            console.log("Posting admin - req is ");
            console.log(req.body);
            new AdminRoute().Admin(req, res, next, req.body.user);
        });
        
        router.post("/deleteUser", (req: Request, res: Response, next: NextFunction)=>
        {
            console.log("Posting admin - req is ");
            console.log(req.body);
            new AdminRoute().deleteUser(req,res,next,req.body.id, req.body.thisID);
        });
        /*
        router.post("/createUser", (req: Request, res: Response, next: NextFunction)=>
        {
            console.log("Posting admin - req is ");
            console.log(req.body);
            new AdminRoute().createUser(req,res,next,req.body.user);
        });
        */
        

    }
    public async Admin(req: Request, res: Response, next: NextFunction, id: number) {
        console.log("id in adminrouter is " + id);
        console.log("value of id is" + id.toString());
        const session = new SessionController();
        this.title = "Admin";
        session.RequestUsers(req, res, next)
        .then((mess) => {
            console.log(mess);
            console.log("ID is " + id);
            // set message
            const options: object = {
                thisID: id,
                users: mess,
            };
            console.log(options);
            return options;
        })
        .catch((err) => {
            console.log(err.message);
        })
        .then((options: any) => {
            // console.log("I'm doing the thing: "+options);
            // res.send(options);
            // render template
            this.render(req, res, "admin", options);
        });

    }

    async deleteUser(req: Request,res: Response, next: NextFunction, id: number, thisID: number)
    {
        console.log("value of id to delete is " + id.toString());
        let adminsession= new AdminController();
        this.title = "DeleteUser";
        adminsession.DeleteUser(req,res,next,id)
        .then(() => {
            this.Admin(req,res,next,thisID);
        });
        

    }


}
