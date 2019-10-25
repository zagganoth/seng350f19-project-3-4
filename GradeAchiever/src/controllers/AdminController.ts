import { is } from "@babel/types";
import { NextFunction, Request, Response, Router } from "express";
import {AdminModel} from "../models/AdminModel";
import {UserModel} from "../models/UserModel";
import {SessionController} from "./SessionController";

export class AdminController {
    constructor() {

    }
    public async CreateUser(req: Request) {
        const m = new AdminModel();
        JSON.parse(req.body);
        const retval = await m.AddUser(JSON.parse(req.body).name, JSON.parse(req.body).email, JSON.parse(req.body).isAdmin);
        return retval;
    }
    public async DeleteUser(req: Request, res: Response, next: NextFunction, id: number) {

        const m = new AdminModel();
        return await m.RemoveUser(id);

    }
}
