import { anyTypeAnnotation, is } from "@babel/types";
import { NextFunction, Request, Response, Router } from "express";
import {AdminModel} from "../models/AdminModel";
import {UserModel} from "../models/UserModel";
// import {SessionController} from "./SessionController";

export class AdminController {
    constructor() {
    }

    // Deletes an existing user
    public async DeleteUser(req: Request, res: Response, next: NextFunction, id: number) {
        const am = new AdminModel();
        console.log("Adming Controller - calling Remove User");
        const returnVal = await am.RemoveUser(id);
        console.log(returnVal);
        return returnVal;
    }

    // Creates a new user
    public async CreateUser(req: Request, res: Response, next: NextFunction, name: string, email: string, isAdmin: boolean) {
        const am = new AdminModel();
        let newID: any = await am.GetNewID();
        newID = Number(newID[0].StudentID) + 1;
        // console.log("NEW ID " + newID);
        const newuser: object = {
            StudentID: newID,
            StudentName: name,
            Email: email,
            IsAdmin: isAdmin,
        };
        return await am.AddUser(newuser);
    }

    // Edits a user's details
    public async EditUser(req: Request, res: Response, next: NextFunction, Userid: number, UpdatedUserDetails: object) {
        const m = new AdminModel();
        return await m.UpdateUser(Userid, UpdatedUserDetails);

    }
}
