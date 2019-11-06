import { is } from "@babel/types";
import { NextFunction, Request, Response, Router } from "express";
import {AdminModel} from "../models/AdminModel";
import {UserModel} from "../models/UserModel";
import {SessionController} from "./SessionController";

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
        const m = new AdminModel();
        // return await m.AddUser(name, email, isAdmin);
        return;

    }

    // Edits a user's details
    public async EditUser(req: Request, res: Response, next: NextFunction, Userid: number, UpdatedUserDetails: object) {
        const m = new AdminModel();
        return await m.UpdateUser(Userid, UpdatedUserDetails);

    }
}
