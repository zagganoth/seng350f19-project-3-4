import { NextFunction, Request, Response, Router } from "express";
// import DbClient = require("../DbClient");
import { BaseModel } from "./BaseModel";

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
        console.log("Admin Model - trying to delete one: " + userID);
        return await this.deleteOne({StudentID: Number(userID)})
        .catch ((error) => {
            console.log(error);
            return [];
        });
    }

    // Gets all users currently in DB
    public async GetAllUsers() {
        // Return the id and name for all students
        return this.getAll({}, { StudentID: 1, StudentName: 1, Email: 1 })
        .catch ((error) => {
            console.log(error);
            return [];
        });
    }

    // Adds a new user
    public async AddUser(user: object) {
        console.log("Admin Model - adding a user");
        return this.addOne(user)
        .catch ((error) => {
            console.log(error);
            return [];
        });
    }

    // Gets next new user ID
    public async GetNewID() {
        console.log("Admin Model - getting new user ID");
        return this.getMax({}, {}, {StudentID: -1})
        .catch ((error) => {
            console.log(error);
            return [];
        });
    }

    // Gets user by ID and updates user details
    public async UpdateUser(userID: number, update: object) {

        console.log("Admin Model - Updating a user");
        return this.editOne({StudentID: userID}, update)
        .catch((error) => {
            console.log(error);
            // console.log("error from UpdateUser users");
            return [];
        });
    }
}
