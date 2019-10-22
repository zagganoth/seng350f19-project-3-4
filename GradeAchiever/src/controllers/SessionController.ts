import { NextFunction, Request, Response, Router } from "express";
import {AdminModel} from "../models/AdminModel";
import {UserModel} from "../models/UserModel";

export class SessionController {
    constructor()
    {

    }
    async RequestUsers(req: Request, res: Response, next: NextFunction)
    {
        let m = new AdminModel();

        let retval = await m.GetAllUsers(req,res,next);
        return retval;
    }
    async RequestUser(req: Request, res: Response, next: NextFunction,id: Number)
    {

        let m = new UserModel(id);
        return await m.GetUserDetails(req,res,next,id)

    }
}