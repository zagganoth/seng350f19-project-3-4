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

/*
These two functions below are the same right now... does this just mean we can create the "sort" object
in this function and plug it in manually here? As it is set up, the controller will be setting the sort
so we could have just one function which gets just a single record, could be highest or lowest or anything else
*/

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

    public async deleteMany(query: object): Promise<any> {
        return DbClient.connect()
        .then((db) => {
            // returns an object which has a field confirming how many items were deleted. Might be useful.
            return db.collection(this.tableName).deleteMany(query);
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

    public async addToArray(query: object, field: string, value: number[]) {
        interface IUpdateType {
            [key: string]: object;
        }
        const newValue = {
            $each: value,
        };
        const update: IUpdateType = {};
        update[field] = newValue;
        return DbClient.connect()
        .then((db) => {
            console.log("Updating " + field + " with "  + value);
            console.log(update);
            console.log(query);
            return db.collection(this.tableName).updateOne(query, {$addToSet:  update });
        });
    }

    public async removeFromArray(query: object, field: string, value: number[]) {
        interface IUpdateType {
            [key: string]: object;
        }
        const newValue = {
            $in: value,
        };
        const update: IUpdateType = {};
        update[field] = newValue;
        return DbClient.connect()
        .then((db) => {
            return db.collection(this.tableName).updateOne(query, {$pull: { update }});
        });
    }

    public async editMany(query: object, update: object) {
        return DbClient.connect()
        .then((db) => {
            return db.collection(this.tableName).updateMany(query, {$set: update});
        });
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

    // The query object must be an array where each element of the array is the document object.
    public async addMany(query: object[]) {
        return DbClient.connect()
        .then((db) => {
            return db.collection(this.tableName).insertMany(query);
        });

    }

}
