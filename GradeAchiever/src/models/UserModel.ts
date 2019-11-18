import {NextFunction, Request, Response} from "express";
import DbClient = require("../DbClient");
import { BaseModel } from "./BaseModel";
import { CourseModel } from "./CourseModel";
export class UserModel extends BaseModel {
    /* User Model Fields:
    	○ StudentID (auto-generated, auto-increment, int)
		○ Email (string, unique)
		○ StudentName (string, unique?)
		○ NotificationLevel
		○ AlgorithmAccuracy (float: 0.5f - 2f)
		○ Courses[]
        IsAdmin (bool)
     */
    public StudentID!: number;
    public Email!: string;
    public StudentName!: string;
    public NotificationLevel!: number;
    public AlgorithmAccuracy!: number;
    public Courses!: number[];
    private readonly userID: number;
    constructor(userID: number) {
        // Table name
        super("User");
        // We can test here the id of the user submitting the request - if it's an admin user we can allow for admin actions

        this.userID = userID;
    }
    public async GetUserDetails(id: number): Promise<any> {
        return this.getOne({StudentID: id})
        .catch ((error)=> {
            console.log(error);
            return [];
        });

    }

    public async AddCourse(userID: number, itemsToAdd: number[]) {
        return this.addToArray({StudentID: Number(userID)}, "Courses", itemsToAdd)
        .catch ((error)=> {
            console.log(error);
            return [];
        });
    }

    public async RemoveCourse(userID: number, itemsToRemove: number[]) {
        return this.removeFromArray({StudentID: userID}, "Courses", itemsToRemove)
        .catch ((error)=> {
            console.log(error);
            return [];
        });
    }

    public async EditNotificationSettings(userID: number, newNotificationSettings: number) {
        return this.editOne({StudentID: userID}, {NotificationSettings: newNotificationSettings})
        .catch ((error)=> {
            console.log(error);
            return [];
        });
    }

    public async EditAlgorithmAccuracy(userID: number, newAlgorithmValue: number) {
        return this.editOne({StudentID: userID}, {AlgorithmAccuracy: newAlgorithmValue})
        .catch ((error)=> {
            console.log(error);
            return [];
        })
    }

}
