import DbClient = require("../DbClient");
import { BaseModel } from "./BaseModel";
import {GradableItemModel} from "./GradableItemModel";
import {Request, Response, NextFunction} from "express";
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
    public CreateCourse(userID: number, courseName: string) {

    }
    public SetDifficulty(courseID: number, difficulty: number) {

    }
    public SetGradeGoal(courseID: number, goal: number) {
        if (goal <= 100) {

        }
    }
    public AddGradableItem(courseID: number, item: GradableItemModel) {

    }
    public async GetCourseDetails(courseID: number): Promise<any> {
        // Get all the details for a course, including its gradable items
        return await this.getOne({CourseID: courseID})

    }

}
