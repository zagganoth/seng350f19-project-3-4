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
        let newID: any = await am.GetNewID();
        console.log(newID);
        console.log(newID[0].StudentID);
        newID = Number(newID[0].StudentID) + 1;
        console.log("NEW ID " + newID);
        const newuser: object = {
            StudentID: newID,
            StudentName: name,
            Email: email, 
            IsAdmin: false
        };

        return await am.AddUser(newuser);

    }
}
