import {NextFunction, Request, Response} from "express";
import DbClient = require("../DbClient");
import { BaseModel } from "./BaseModel";
import {GradableItemModel} from "./GradableItemModel";
export class CourseModel extends BaseModel {

    /*
        Course Model Fields:
            ○ CourseID (auto-generated, auto-increment, int)
            ○ StudentID (string)
            ○ CourseName (string)
            ○ PerceivedDifficulty (Float)
            ○ GradeGoal (int: 0 - 100)
            ○ GradableItems[]
            (Removed) CourseAlgorithmAccuracy (float: 0.5f - 2f)
     */
    constructor() {
        super("Course");
    }
    public async GetCourseDetails(courseID: number): Promise<any> {
        // Get all the details for a course, including its gradable items
        return await this.getOne({CourseID: courseID});

    }

}
