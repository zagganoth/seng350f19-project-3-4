import { NextFunction, Request, Response, Router } from "express";
import DbClient = require("../DbClient");
import {BaseModel} from "./BaseModel";

export class AdminModel extends BaseModel {
    private readonly isAdmin: boolean;
    constructor() {
        // table name
        super("User");
        const isAdmin = true;
        this.isAdmin = isAdmin;
    }

    // Removes a user specified by ID
    public async RemoveUser(userID: number) {
        // Returns db response after deleting user
        try {
            console.log("Admin Model - trying to delete one: " + userID);
            return await this.deleteOne({StudentID: Number(userID)});
        } catch (error) {
            console.log(error);
            console.log("error from deleteOne user");
            return [];
        }
    }

    // Gets all users currently in DB
    public async GetAllUsers() {
        // Return the id and name for all students
        try {
            return await this.getAll({}, {StudentID: 1, StudentName: 1});
        } catch (error) {
            console.log(error);
            console.log("error from getall users");
            return [];
        }
    }

    // Adds a new user
    public async AddUser(userID: number) {
        if (this.isAdmin) {
            console.log("Deleting user id " + userID + " from db.");
            return await DbClient.connect()
            .then((db) => {
                /*TODO stuff to add new user to DB
                 currently returns users that are left*/
                return db.collection(this.tableName).find().project({StudentID: 1, StudentName: 1}).toArray();
            })
            .catch((err) => {
                console.log(err.message);
            });
        } else {
            throw new Error("Invalid admin credentials");
        }
    }

    // Gets user by ID and updates user details
    public async UpdateUser(userID: number, update: object) {
        if (this.isAdmin) {
            console.log("Deleting user id " + userID + " from db.");
            return await DbClient.connect()
            .then((db) => {
                /*TODO stuff to update user
                 currently returns users that are left*/
                return db.collection(this.tableName).find().project({StudentID: 1, StudentName: 1}).toArray();
            })
            .catch((err) => {
                console.log(err.message);
            });
        } else {
            throw new Error("Invalid admin credentials");
        }
    }

}
