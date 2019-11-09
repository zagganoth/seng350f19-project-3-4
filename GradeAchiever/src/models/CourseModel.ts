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
    public CourseID!: number;
    public StudentID!: number;
    public CourseName!: string;
    public PerceivedDifficulty!: number;
    public CurrentGrade!: number;
    public GradeGoal!: number;
    public GradableItems!: number[];
    constructor() {
        super("Course");
    }

    public async GetCourseDetails(courseID: number): Promise<CourseModel> {
        // Get all the details for a course, including its gradable items
        return await this.getOne({CourseID: Number(courseID)});
    }

}
