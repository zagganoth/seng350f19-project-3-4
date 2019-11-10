import { NextFunction, Request, Response, Router } from "express";
import {AdminModel} from "../models/AdminModel";

export class SessionController {
    constructor() {

    }
    public async RequestUsers(req: Request, res: Response, next: NextFunction) {
        const m = new AdminModel();
        try {
            const retval = await m.GetAllUsers();
            return retval;
        } catch (error) {
            console.log(error);
            return [];
        }
    }

    public async VerifyUser(req: Request, res: Response, next: NextFunction, id: number) {
        return true;
    }

    // Creates a new user
    public async CreateUser(req: Request, res: Response, next: NextFunction, name: string, email: string) {
        const am = new AdminModel();
        let maxRow: any;
        maxRow = await am.getMax({}, {StudentID: -1});
        console.log(maxRow);
        console.log(maxRow.StudenID);
        const newID = Number(maxRow.StudentID) + 1;
        const newuser: object = {
            StudentID: newID,
            StudentName: name,
            Email: email,
        };
        return am.AddUser(newuser);
    }
}
