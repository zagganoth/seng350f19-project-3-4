import { NextFunction, Request, Response, Router } from "express";
import { GradableItemController } from "../controllers/GradableItemController";
import { CourseModel} from "../models/CourseModel";

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
            return returnVal;
        } else {
            console.log("No Gradable items found for course.");
            return [];
        }
    }

    /* Edits course grade goal*/
    public async editCourseGradeGoal(req: Request, res: Response, next: NextFunction, courseID: number, newGoal: number) {
        const courseModel = new CourseModel();
        const returnVal = await courseModel.EditGradeGoal(Number(courseID), Number(newGoal));
        if (returnVal.matchedCount === 1) {
            res.sendStatus(200);
        } else {
            res.sendStatus(500);
        }
        return;
    }

     /* Gets course Details by course ID */
     public async CreateGradableItem(courseID: number, name: string, duedate: string, weight: number, gItemAccuracy: number) {
        const gradableItemContr = new GradableItemController();
        try {
            const returnVal = await gradableItemContr.CreateItem(courseID, name, duedate, weight, gItemAccuracy);
            return returnVal;
        } catch (error) {
            console.log(error);
            return [];
        }
    }

}
