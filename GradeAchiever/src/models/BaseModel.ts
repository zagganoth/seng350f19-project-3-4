import { NextFunction, Request, Response, Router } from "express";
import DbClient = require("../DbClient");

export class BaseModel {
    protected tableName: string;
    constructor(tableName: string) {
        this.tableName = tableName;
    }

    public async getAll(req: Request, res: Response, next: NextFunction) {
        return await DbClient.connect()
        .then((db) => {
            return db!.collection(this.tableName).find().toArray();
        })
        .catch((err) => {
            console.log(err.message);
        });
    }
    public getOne(req: Request, res: Response) {
        DbClient.connect()
        .then((db) => {
            return db!.collection(this.tableName).find().toArray();
        })
        .then((heroes: any) => {
            console.log(heroes);
            res.send(heroes);
        })
        .catch((err) => {
            console.log("err.message");
        });
    }

}
