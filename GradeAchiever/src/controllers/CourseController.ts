import { NextFunction, Request, Response, Router } from "express";
import { GradableItemController } from "../controllers/GradableItemController";
import { CourseModel} from "../models/CourseModel";
import { UserModel } from "../models/UserModel";

export class CourseController {

    private courseModel = new CourseModel();
    private gradableItemController = new GradableItemController();

    constructor() {
    }

    /* Gets course Details by course ID */
    public async RequestCourse(courseID: number) {
        try {
            return this.courseModel.GetCourseDetails(courseID);
        } catch (error) {
            console.log(error);
            return [];
        }
    }

    public async createCourse(courseDetails: any) {
        const name: string = courseDetails.name;
        const courseId = (await this.courseModel.GetNewID()) as number;
        const gradableItems = [];
        for (const gradableItem of courseDetails.GradableItems) {
            gradableItems.push(await this.CreateGradableItem(courseId, gradableItem.name, gradableItem.duedate, gradableItem.weight));
        }
        await this.courseModel.CreateNewCourse(courseDetails.user, name, courseDetails.perceivedDiff, 100, courseDetails.gradegoal, gradableItems);

        // these steps should not be done here, these should be put somewhere else. This function should return the course id which then gets added tothe user object.

        const userModel = new UserModel(courseDetails.user);
        return userModel.AddCourse(courseDetails.user, [courseId]);
    }

    /**
     * Creates gradable items for a course
     */
    public async createGradableItems(courseDetails: any)  {
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
        await this.courseModel.AddGradableItems(courseID, gradableItems);
    }

    /* Gets all gradable items Details in an array of a specified course ID
     * Called from course view
     */
    public async RequestCourseGradableItems(courseID: number) {
        const courseDetails = await this.RequestCourse(courseID);
        if ("GradableItems" in courseDetails && courseDetails.GradableItems.length > 0) {
            const gradableItemIDs = courseDetails.GradableItems;
            const returnVal = [];
            for (const itemID of gradableItemIDs) {
                const itemDetails = await this.gradableItemController.RequestGradableItem(itemID);
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
        return this.courseModel.EditGradeGoal(Number(courseID), Number(newGoal));

    }

    /* Edits course's perceived difficulty*/
    public async editDifficulty(req: Request, res: Response, next: NextFunction, courseID: number, newDiff: number) {
        return this.courseModel.EditPercievedDifficulty(Number(courseID), Number(newDiff));
    }

    /* Edits course's name*/
    public async editCourseName(req: Request, res: Response, next: NextFunction, courseID: number, newName: string) {
        return this.courseModel.EditCourseName(Number(courseID), String(newName));
    }

    /* Gets course Details by course ID */
    public async CreateGradableItem(courseID: number, name: string, duedate: string, weight: number, gItemAccuracy: number = -1) {
        try {
            const returnVal: any = await this.gradableItemController.CreateItem(courseID, name, duedate, weight, gItemAccuracy);
            // console.log("course return:");
            // console.log(returnVal);

            // Returns the id of the newly created gradable item
            return returnVal.ops[0].GradableItemID;
        } catch (error) {
            console.log(error);
            return -1;
        }
    }
    public async EditGradableItem(gradableItemID: number, name: string, dueDate: Date, hours: number, grade: number) {
        try {
            return this.gradableItemController.EditGradableItem(gradableItemID, name, dueDate, hours, grade);
            // await this.gradableItemController.EditDueDate(gradableItemID, dueDate);
            // await this.gradableItemController.EditItemGrade(gradableItemID, grade);
            // await this.gradableItemController.EditItemName(gradableItemID, name);
            // await this.gradableItemController.EditStudyTime(gradableItemID, hours);
        } catch (error) {
            console.log(error);
            return [];
        }

        // this.gradableItemController.EditGradableItem(gradableItemID, name, duedate, hours, grade)
        // .then((details) => {
        //     return true;
        // })
        // .catch((error) => {
        //     console.log(error);
        //     return false;
        // });
    }
    /* Adds study time to a gradable item */

    // this one probably needs to rely on grabbing the previous value from the database? Will need to confirm.
    public async addStudyTime(gradableItemID: number, prevtime: number, newtime: number) {
        try {
            const returnVal: any = await this.gradableItemController.LogStudyTime(gradableItemID, prevtime, newtime);
            // Returns the new number of hours studied
            return returnVal.ops[0].StudiedTime;
        } catch (error) {
            console.log(error);
            return -1;
        }
    }
    public async deleteGradableItem(courseID: number, gradableItemID: number) {
        try {
            await this.courseModel.DeleteGradableItems(courseID, [Number(gradableItemID)]);
            return this.gradableItemController.deleteGradableItem(gradableItemID);
        } catch (error) {
            console.log(error);
        }

    }

}
