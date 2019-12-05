import { NextFunction, Request, Response } from "express";
import {AdminModel} from "../models/AdminModel";

export class SessionController {
    private adminModel = new AdminModel();
    constructor() {
    }

    /**
     * Returns an array of all users in the User table of the database
     * @param req
     * @param res
     * @param next
     */
    public async RequestUsers() {
        try {
            return this.adminModel.GetAllUsers();
        } catch (error) {
            console.log(error);
            return [];
        }
    }

    /**
     * What does this function do??
     * @param req
     * @param res
     * @param next
     * @param id
     */
    public async VerifyUser(req: Request, res: Response, next: NextFunction, id: number) {
        return true;
    }

    /**
     * Creates a new user
     * @param req
     * @param res
     * @param next
     * @param name
     * @param email
     */
    public async CreateUser(name: string, email: string) {
        let newID: any = this.adminModel.GetNewID();
        if (newID[0] !== undefined) {
            newID = Number(newID[0].StudentID) + 1;
        } else {
            newID = 1;
        }
        const newuser: object = {
            StudentID: newID,
            StudentName: name,
            Email: email,
            IsAdmin: false,
        };
        return this.adminModel.AddUser(newuser);
    }
}
