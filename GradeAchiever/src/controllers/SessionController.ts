import { NextFunction, Request, Response, Router } from "express";
import {AdminModel} from "../models/AdminModel";
import {UserModel} from "../models/UserModel";

export class SessionController {
    constructor() {

    }
    public async RequestUsers(req: Request, res: Response, next: NextFunction) {
        const m = new AdminModel();

        const retval = await m.GetAllUsers(req, res, next);
        return retval;
    }
    public async RequestUser(req: Request, res: Response, next: NextFunction, id: number) {

        const m = new UserModel(id);
        return await m.GetUserDetails(req, res, next, id);

    }
}
