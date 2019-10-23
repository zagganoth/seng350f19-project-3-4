import { NextFunction, Request, Response, Router } from "express";
import DbClient = require("../DbClient");
import {BaseModel} from "./BaseModel";

export class AdminModel extends BaseModel {
    private readonly isAdmin: boolean;
    constructor() {
        super("User");
        const isAdmin = true;
        this.isAdmin = isAdmin;
    }
    public AddUser(userName: string, email: string) {
        // Add the user to the database using dbClient
        if (this.isAdmin) {

        } else {
            throw new Error("Invalid admin credentials");
        }

    }

    public RemoveUser(userID: number) {
        if (this.isAdmin) {

        } else {
            throw new Error("Invalid admin credentials");
        }
    }
    public async GetAllUsers(req: Request, res: Response, next: NextFunction) {
        return await DbClient.connect()
        .then((db) => {
            return db!.collection(this.tableName).find().project({StudentID: 1, StudentName: 1}).toArray();
        })
        .catch((err) => {
            console.log(err.message);
        });
    }

}
