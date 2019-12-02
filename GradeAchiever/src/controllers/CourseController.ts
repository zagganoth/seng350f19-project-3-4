import { NextFunction, Request, Response, Router } from "express";
import { GradableItemController } from "../controllers/GradableItemController";
import { CourseModel} from "../models/CourseModel";
import {GradableItemModel} from "../models/GradableItemModel";
import { UserModel } from "../models/UserModel";

export class CourseController {
    constructor() {

    }

    /* Gets course Details by course ID */
    public async RequestCourse(courseID: number) {
        const courseModel = new CourseModel();
        try {
            const returnVal = await courseModel.GetCourseDetails(courseID);
            return returnVal;
        } catch (error) {
            console.log(error);
            return [];
        }
    }

    public async createCourse(courseDetails: any) {
        const name: string = courseDetails.name;
        const courseModel = new CourseModel();
        const courseId = (await courseModel.GetNewID()) as number;
        // console.log(courseId);
        const gradableItems = [];
        // courseId = courseId.CourseID;
        for (const gradableItem of courseDetails.GradableItems) {
            gradableItems.push(await this.CreateGradableItem(courseId, gradableItem.name, gradableItem.duedate, gradableItem.weight));
        }
        await courseModel.CreateNewCourse(courseDetails.user, name, courseDetails.perceivedDiff, 100, courseDetails.gradegoal, gradableItems);
        const userModel = new UserModel(courseDetails.user);
        return userModel.AddCourse(courseDetails.user, [courseId]);
    }

    /**
     * Creates gradable items for a course
     */
    public async createGradableItems(courseDetails: any)  {
        console.log(courseDetails);
        const courseModel = new CourseModel();
        const courseID: number = Number(courseDetails.courseID);
        const gradableItems = [];
        for (const gradableItem of courseDetails.GradableItems) {
            try {
                gradableItems.push(await this.CreateGradableItem(courseID, gradableItem.name, gradableItem.duedate, gradableItem.weight));
            } catch (error) {
                console.log(error);
                console.log("creating item failed :(");
            }
        }
        await courseModel.AddGradableItems(courseID, gradableItems);
    }

    /* Gets all gradable items Details in an array of a specified course ID
     * Called from course view
     */
    public async RequestCourseGradableItems(courseID: number) {
        const courseDetails = await this.RequestCourse(courseID);
        if ("GradableItems" in courseDetails && courseDetails.GradableItems.length > 0) {
            const gradableItemIDs = courseDetails.GradableItems;
            const gradableItemContr = new GradableItemController();
            const returnVal = [];
            for (const itemID of gradableItemIDs) {
                const itemDetails = await gradableItemContr.RequestGradableItem(itemID);
                returnVal.push(itemDetails);
            }
            return returnVal ;
        } else {
            console.log("No Gradable items found for course.");

            return [];
        }
    }

    /* Edits course grade goal*/
    public async editCourseGradeGoal(req: Request, res: Response, next: NextFunction, courseID: number, newGoal: number) {
        const courseModel = new CourseModel();
        const returnVal = await courseModel.EditGradeGoal(Number(courseID), Number(newGoal));
        return returnVal;
    }

    /* Edits course's perceived difficulty*/
    public async editDifficulty(req: Request, res: Response, next: NextFunction, courseID: number, newDiff: number) {
        const courseModel = new CourseModel();
        const returnVal = await courseModel.EditPercievedDifficulty(Number(courseID), Number(newDiff));
        return returnVal;
    }

    /* Edits course's name*/
    public async editCourseName(req: Request, res: Response, next: NextFunction, courseID: number, newName: string) {
        const courseModel = new CourseModel();
        const returnVal = await courseModel.EditCourseName(Number(courseID), String(newName));
        return returnVal;
    }

    /* Gets course Details by course ID */
    public async CreateGradableItem(courseID: number, name: string, duedate: string, weight: number, gItemAccuracy: number = -1) {
        const gradableItemContr = new GradableItemController();
        try {
            const returnVal: any = await gradableItemContr.CreateItem(courseID, name, duedate, weight, gItemAccuracy);
            // console.log("course return:");
            // console.log(returnVal);

            // Returns the id of the newly created gradable item
            return returnVal.ops[0].GradableItemID;
        } catch (error) {
            console.log(error);
            return -1;
        }
    }
    public async EditGradableItem(gradableItemID: number, name: string, duedate: Date, hours: number, grade: number) {
        const gradableItemContr = new GradableItemController();
        gradableItemContr.EditGradableItem(gradableItemID, name, duedate, hours, grade)
        .then((details) => {
            return true;
        })
        .catch((error) => {
            console.log(error);
            return false;
        });
    }
    /* Adds study time to a gradable item */
    public async addStudyTime(gradableItemID: number, prevtime: number, newtime: number) {
        const gradableItemContr = new GradableItemController();
        try {
            const returnVal: any = await gradableItemContr.LogStudyTime(gradableItemID, prevtime, newtime);
            // Returns the new number of hours studied
            return returnVal.ops[0].StudiedTime;
        } catch (error) {
            console.log(error);
            return -1;
        }
    }
    public async deleteGradableItem(courseID: number, gradableItemID: number) {
        try {
            const courseModel = new CourseModel();
            await courseModel.DeleteGradableItems(courseID, [Number(gradableItemID)]);
            const gradableItemsModel = new GradableItemModel();
            await gradableItemsModel.DeleteGradableItem(gradableItemID);

        } catch (error) {
            console.log(error);
        }

    }

}
