import { NextFunction, Request, Response } from "express";
import {AdminModel} from "../models/AdminModel";

export class AdminController {
    private adminModel = new AdminModel();

    constructor() {
    }

    // Deletes an existing user
    public async DeleteUser(id: number) {
        console.log("Adming Controller - calling Remove User");
        return this.adminModel.RemoveUser(id);

    }

    // Creates a new user
    public async CreateUser(user:Student) {
        let newID: any = await this.adminModel.GetNewID();
        if(newID !== undefined)
            newID = Number(newID[0].StudentID) + 1;
        else newID = 1;
        const newuser: object = {
            StudentID: newID,
            StudentName: user.StudentName,
            Email: user.Email,
            IsAdmin: user.IsAdmin,
        };
        return this.adminModel.AddUser(newuser);
    }

    // Edits a user's details
    public async EditUser(Userid: number, UpdatedUserDetails: object) {
        return this.adminModel.UpdateUser(Userid, UpdatedUserDetails);
    }
}
