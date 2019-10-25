
import { NextFunction, Request, Response, Router } from "express";
import {SessionController} from "../controllers/SessionController";
import {OverviewController} from "../controllers/OverviewController";
import { BaseRoute } from "./route";

export class SessionRoute extends BaseRoute {
    public static create(router: Router) {
        console.log("[SessionRoute::create] Creating user homepage route.");
        router.post("/overview", (req: Request, res: Response, next: NextFunction) => {
            new SessionRoute().Session(req, res, next, JSON.parse(req.body.user).StudentID);
        });

    }
    public async Session(req: Request, res: Response, next: NextFunction, id: number)
    {
        const session = new SessionController();
        //First, verify if user is valid (currently always true)
        if (!await session.VerifyUser(req, res, next, id)) {
            this.render(req, res, "error");
            return;
        }
        //Then, populate the overview page
        const overview = new OverviewController();
        this.title = "Home";
        overview.RequestUser(id)
        .then((details) => {
            const options: object = {
                studentDetails: details[0],
                courseDetails: details[1],
                gradableItemDetails: details[2]
            };
            this.render(req, res, "userhome", options);
        })
        .catch((error)=>
        {
           this.render(req,res,"error");
        });
    }

}
