
import { NextFunction, Request, Response, Router } from "express";
import { BaseRoute } from "./route";
import {SessionController} from "../controllers/SessionController";

export class SessionRoute extends BaseRoute {
    public static create(router: Router) {
        console.log("[SessionRoute::create] Creating user homepage route.");
        router.post("/overview", (req: Request, res: Response, next: NextFunction)=>
        {
            console.log("Posting overview - req is ");
            console.log(req.body);
            new SessionRoute().Session(req,res,next,JSON.parse(req.body.user).StudentID);
        });
        
    }
    async Session(req: Request,res: Response, next: NextFunction,id: Number)
    {
        console.log("id in sessionrouter is " + id);
        let session = new SessionController();

        this.title = "Home";
        session.RequestUser(req,res,next,id)
        .then((details)=>
        {
            console.log(details);
            let options : Object = {
                "studentDetails" : details
            }
            this.render(req, res, "userhome", options);
        })

    }
}