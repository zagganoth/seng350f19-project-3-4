import { NextFunction, Request, Response, Router } from "express";
import { MongoNetworkError } from "mongodb";
import DbClient = require("../DbClient");

export class BaseModel {
    protected tableName: string;
    constructor(tableName: string) {
        this.tableName = tableName;
    }

    public async getAll(query: object= {}, project: object= {}, sort: object= {}) {

        return await DbClient.connect()
        .then((db) => {
            return db.collection(this.tableName).find(query).project(project).sort(sort).toArray();
        })
        .catch((err) => {
            console.log(err.message);
            return [];
        });
    }
    public async getOne(query: object): Promise<any> {
        return await DbClient.connect()
        .then((db) => {
            return db.collection(this.tableName).findOne(query);
        })
        .catch((err) => {
            console.log("err.message");
        });
    }

}
