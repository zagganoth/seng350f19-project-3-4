import {NextFunction, Request, Response} from "express";
import DbClient = require("../DbClient");
import { BaseModel } from "./BaseModel";
import { CourseModel } from "./CourseModel";
export class UserModel extends BaseModel {
    private readonly userID: number;
    /* User Model Fields:
    	○ StudentID (auto-generated, auto-increment, int)
		○ Email (string, unique)
		○ StudentName (string, unique?)
		○ NotificationLevel
		○ AlgorithmAccuracy (float: 0.5f - 2f)
		○ Courses[]
        IsAdmin (bool)
     */
    constructor(userID: number) {
        // Table name
        super("User");
        // We can test here the id of the user submitting the request - if it's an admin user we can allow for admin actions

        this.userID = userID;
    }
    public async GetUserDetails(id: number): Promise<any> {
        console.log("Getting user details from table User");
        return await this.getOne({StudentID: id})
        .catch((error) => {
            console.log("Error in getting user details.");
            return [];
        });
    }

}
