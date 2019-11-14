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

    public async CreateNewCourse(studentID: number, courseName: string, percievedDifficulty: number, currentGrade: number, gradeGoal: number, gradableItems: number[]) {
        try {
            const newCourse = {
                CourseID: this.GetNewID(),
                StudentID: studentID,
                CourseName: courseName,
                PerceivedDifficulty: percievedDifficulty,
                CurrentGrade: currentGrade,
                GradeGoal: gradeGoal,
                GradableItems: gradableItems,
            };
            return this.addOne(newCourse);
        } catch (error) {
            console.log(error);
            return [];
        }
    }

    // Gets next new course ID
    public async GetNewID() {
        try {
            console.log("Course Model - getting new course ID");
            return this.getMax({}, {}, {CourseID: -1});
        } catch (error) {
            console.log(error);
            console.log("error from getMax");
            return [];
        }
    }

    public async DeleteCourse(courseID: number) {
        try {
            return this.deleteOne({CourseID: courseID});
        } catch (error) {
            console.log(error);
            return [];
        }
    }

    public async AddGradableItems(courseID: number, itemsToAdd: number[]) {
        // add id's to array
        try {
            return this.addToArray({CourseID: courseID}, "GradableItems", itemsToAdd);
        } catch (error) {
            console.log(error);
            return [];
        }
    }

    public async DeleteGradableItems(courseID: number, itemsToRemove: number[]) {
        // remove ids from array
        try {
            return this.addToArray({CourseID: courseID}, "GradableItems", itemsToRemove);
        } catch (error) {
            console.log(error);
            return [];
        }
    }

    public async EditCourseName(courseID: number, courseName: string) {
        try {
            return this.editOne({CourseID: courseID}, {CourseName: courseName});
        } catch (error) {
            console.log(error);
            return [];
        }
    }

    public async EditPercievedDifficulty(courseID: number, percievedDifficulty: number) {
        try {
            return this.editOne({CourseID: courseID}, {PerceivedDifficulty: percievedDifficulty});
        } catch (error) {
            console.log(error);
            return [];
        }
    }

    public async EditCurrentGrade(courseID: number, currentGrade: number) {
        try {
            return this.editOne({CourseID: courseID}, {CurrentGrade: currentGrade});
        } catch (error) {
            console.log(error);
            return [];
        }
    }

    public async EditGradeGoal(courseID: number, gradeGoal: number) {
        try {
            return this.editOne({CourseID: courseID}, {GradeGoal: gradeGoal});
        } catch (error) {
            console.log(error);
            return [];
        }
    }

}
