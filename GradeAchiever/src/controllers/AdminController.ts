import { NextFunction, Request, Response } from "express";
import {AdminModel} from "../models/AdminModel";

export class AdminController {
    private adminModel = new AdminModel();

    constructor() {
    }

    // Deletes an existing user
    public async DeleteUser(req: Request, res: Response, next: NextFunction, id: number) {
        console.log("Adming Controller - calling Remove User");
        return this.adminModel.RemoveUser(id);

    }

    // Creates a new user
    public async CreateUser(req: Request, res: Response, next: NextFunction, name: string, email: string, isAdmin: boolean) {
        let newID: any = await this.adminModel.GetNewID();
        newID = Number(newID[0].StudentID) + 1;
        const newuser: object = {
            StudentID: newID,
            StudentName: name,
            Email: email,
            IsAdmin: isAdmin,
        };
        return this.adminModel.AddUser(newuser);
    }

    // Edits a user's details
    public async EditUser(req: Request, res: Response, next: NextFunction, Userid: number, UpdatedUserDetails: object) {
        return this.adminModel.UpdateUser(Userid, UpdatedUserDetails);
    }
}
