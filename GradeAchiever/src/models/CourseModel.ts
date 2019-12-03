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
    public GradeNeeded!: number; // new
    public PercentageDone!: number;
    public CourseRatio!: number;
    constructor() {
        super("Course");
    }

    public async GetCourseDetails(courseID: number): Promise<CourseModel> {
        // Get all the details for a course, including its gradable items
        return this.getOne({CourseID: Number(courseID)})
        .catch((error) => {
            console.log(error);
            return [];
        });
    }

    public async CreateNewCourse(studentID: number, courseName: string, percievedDifficulty: number, currentGrade: number, gradeGoal: number, gradableItems: number[]) {
        // I don't know why, but studentID was getting inserted as a string if I didn't force it to number below
        const newCourse = {
            CourseID: await this.GetNewID(),
            StudentID: Number(studentID),
            CourseName: courseName,
            PerceivedDifficulty: percievedDifficulty,
            CurrentGrade: currentGrade,
            GradeGoal: gradeGoal,
            GradableItems: gradableItems,
            GradeNeeded: gradeGoal,
            PercentageDone: 0,
            CourseRatio: 1,
        };
        return this.addOne(newCourse)
        .catch((error) => {
            console.log(error);
            return [];
        });
    }

    // Gets next new course ID
    public async GetNewID() {
        try {
            console.log("Course Model - getting new course ID");
            const maxRow = await this.getMax({}, {}, {CourseID: -1});
            return maxRow[0].CourseID + 1;
        } catch (error) {
            console.log(error);
            console.log("error from getMax");
            return 1;
        }
    }

    public async DeleteCourse(courseID: number) {
        return this.deleteOne({CourseID: courseID})
        .catch ((error) => {
            console.log(error);
            return [];
        });
    }

    public async AddGradableItems(courseID: number, itemsToAdd: number[]) {
        // add id's to array
        return this.addToArray({CourseID: courseID}, "GradableItems", itemsToAdd)
        .catch((error) => {
            console.log(error);
            return [];
        });
    }

    public async DeleteGradableItems(courseID: number, itemsToRemove: number[]) {
        // remove ids from array
        return this.removeFromArray({CourseID: Number(courseID)}, "GradableItems", itemsToRemove)
        .catch((error) => {
            console.log(error);
            return [];
        });
    }

    public async EditCourseName(courseID: number, courseName: string) {
        return this.editOne({CourseID: courseID}, {CourseName: courseName})
        .catch((error) => {
            console.log(error);
            return [];
        });
    }

    public async EditPercievedDifficulty(courseID: number, percievedDifficulty: number) {

        return this.editOne({CourseID: courseID}, {PerceivedDifficulty: percievedDifficulty})
        .catch((error) => {
            console.log(error);
            return [];
        });
    }

    public async EditCurrentGrade(courseID: number, currentGrade: number) {
        return this.editOne({CourseID: courseID}, {CurrentGrade: currentGrade})
        .catch((error) => {
            console.log(error);
            return [];
        });
    }

    public async EditGradeGoal(courseID: number, gradeGoal: number) {
        return this.editOne({CourseID: courseID}, {GradeGoal: gradeGoal})
        .catch((error) => {
            console.log(error);
            return [];
        });
    }
    public async EditGradeNeeded(courseID: number, gradeNeeded: number) {
        return this.editOne({CourseID: courseID}, {GradeNeeded: gradeNeeded})
        .catch((error) => {
            console.log(error);
            return [];
        });
    }
    public async EditPercentageDone(courseID: number, percent: number) {
        return this.editOne({CourseID: courseID}, {PercentageDone: percent})
        .catch((error) => {
            console.log(error);
            return [];
        });
    }
    public async EditCourseRatio(courseID: number, courseRatio: number) {
        return this.editOne({CourseID: courseID}, {CourseRatio: courseRatio})
        .catch((error) => {
            console.log(error);
            return [];
        });
    }
}
