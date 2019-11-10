import { promises } from "dns";
import { NextFunction, Request, Response, Router } from "express";
import { MongoNetworkError } from "mongodb";
import DbClient = require("../DbClient");

export class BaseModel {
    protected tableName: string;
    constructor(tableName: string) {
        this.tableName = tableName;
    }

    public async getAll(query: object= {}, project: object= {}, sort: object= {}) {
        return DbClient.connect()
        .then((db) => {
            return db.collection(this.tableName).find(query).project(project).sort(sort).toArray();
        })
        .catch((err) => {
            console.log(err.message);
            return [];
        });
    }

    public async getOne(query: object): Promise<any> {
        return DbClient.connect()
        .then((db) => {
            console.log("Base Model - get one.");
            const returnVal = db.collection(this.tableName).findOne(query);
            console.log("Base Model - return " + returnVal);
            return returnVal;
        })
        .catch((err) => {
            console.log(err.message);
        });
    }

    public async deleteOne(query: object): Promise<any> {
        return DbClient.connect()
        .then((db) => {
            // console.log("Base Model - deleting ");
            // console.log(query);
            return db.collection(this.tableName).deleteOne(query);
        })
        .catch((err) => {
            console.log(err.message);
            return [];
        });
    }

    public async deleteMany(query: object= {}, project: object= {}, sort: object= {}) {

    }

    /*Gets the number of rows in a table */
    public async getCount(query: object= {}) {
        return DbClient.connect()
        .then((db) => {
            return db.collection(this.tableName).find(query).count();
        })
        .catch((err) => {
            console.log(err.message);
            return [];
        });
    }

     /* Gets the max (of ID) in a table
      * row of the from
        {
            NameOfDBField: -1
        }

        ie. {
                StudentID:-1
            }
      */
     public async getMax(query: object = {}, project: object = {}, sort: object= {}) {
        return DbClient.connect()
        .then((db) => {
            // console.log("Base Model - get max.");
            const returnVal = db.collection(this.tableName).find(query).project(project).sort(sort).limit(1).toArray();
            // console.log("Base Model - return " + returnVal);
            return returnVal;
        })
        .catch((err) => {
            console.log(err.message);
            return [];
        });
    }

      /* Gets the row with the min in a table field.
       * Param field of the from
        {
            NameOfDBField: +1
        }
        eg. {
                StudentID: +1
            }
      */
     public async getMin(query: object = {}, project: object = {}, sort: object= {})  {
        return DbClient.connect()
        .then((db) => {
            return db.collection(this.tableName).find(query).project(project).sort(sort).limit(1).toArray();
        })
        .catch((err) => {
            console.log(err.message);
            return [];
        });
    }

/*
Update needs to be an object of the form
{
    NameOfDBField: ValueWeWantToSetItTo,
    NameOfDBField: ValueWeWantToSetItTo,
    NameOfDBField: ValueWeWantToSetItTo,
    .
    .
    .
}
*/
    public async editOne(query: object, update: object): Promise<any> {
        return DbClient.connect()
        .then((db) => {
            console.log("Base Model - Editing one");
            return db.collection(this.tableName).updateOne(query, {$set: update});
        });
    }

    public async editMany(query: object= {}, project: object= {}, sort: object= {}) {

    }

    /**
     * Adds one entry to db table
     */
    public async addOne(query: object): Promise<any> {
        return DbClient.connect()
        .then((db) => {
            console.log("Base Model - Inserting one");
            return db.collection(this.tableName).insertOne(query);
        });
    }

    public async addMany(query: object= {}, project: object= {}, sort: object= {}) {

    }

}
