import { NextFunction, Request, Response, Router } from "express";
import { GradableItemController } from "../controllers/GradableItemController";
import { CourseModel} from "../models/CourseModel";

export class CourseController {
    constructor() {

    }

    /* Gets course Details by course ID */
    public async RequestCourse(courseID: number) {
        const courseModel = new CourseModel();
        console.log("Course Controller - Request Course from id " + courseID);
        try {
            const returnVal = await courseModel.GetCourseDetails(courseID);
            console.log("course return: " + returnVal);
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
        console.log("Course ID: " + courseID);
        try {
            return this.RequestCourse(courseID)
            .then(async (courseDetails) => {
                if ("GradableItems" in courseDetails && courseDetails.GradableItems.length > 0) {
                    const gradableItemIDs = courseDetails.GradableItems;
                    const gradableItemContr = new GradableItemController();
                    const returnVal = [];

                    for (const itemID of gradableItemIDs) {
                        const itemDetails = await gradableItemContr.RequestGradableItem(itemID);
                        returnVal.push(itemDetails);
                    }
                    console.log("Request course gradable itmes returning: " + returnVal);
                    return returnVal;
                }
            });

            // }
        } catch (error) {
            console.log(error);
            return [];
        }
    }

    /* Edits course grade goal*/
    public async editCourseGradeGoal(req: Request, res: Response, next: NextFunction, courseID: number, newGoal: number) {
        const courseModel = new CourseModel();
        console.log("Course Controller - edit grade goal");
        console.log(Number(newGoal));
        const returnVal = await courseModel.EditGradeGoal(Number(courseID), Number(newGoal));
        console.log("course return: " + returnVal);
        return returnVal;
    }

     /* Gets course Details by course ID */
     public async CreateGradableItem(courseID: number, name: string, duedate: string, weight: number, gItemAccuracy: number = -1) {
        console.log("Course Controller - create new gradable item");
        const gradableItemContr = new GradableItemController();
        try {
            const returnVal = await gradableItemContr.CreateItem(courseID, name, duedate, weight, gItemAccuracy);
            console.log("course return: " + returnVal);
            return returnVal;
        } catch (error) {
            console.log(error);
            return [];
        }
    }

}
