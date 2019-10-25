import { NextFunction, Request, Response, Router } from "express";
import {AdminModel} from "../models/AdminModel";

export class SessionController {
    constructor() {

    }
    public async RequestUsers(req: Request, res: Response, next: NextFunction) {
        const m = new AdminModel();
        const retval = await m.GetAllUsers();
        return retval;
    }

    public async VerifyUser(req: Request, res: Response, next: NextFunction, id: number)
    {
        return true;
    }
}
