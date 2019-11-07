import { NextFunction, Request, Response, Router } from "express";
import { CourseModel} from "../models/CourseModel";
import { GradableItemController } from "../controllers/GradableItemController"

export class CourseController {
    constructor() {

    }

    /* Gets course Details by course ID */
    public async RequestCourse(courseID: number) {
        const courseModel = new CourseModel();
        console.log("Course Controller - Request Course from id "+courseID);
        try {
            let returnVal = await courseModel.GetCourseDetails(courseID);
            console.log("course return: "+returnVal);
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
        console.log("Course ID: "+courseID);
        const courseModel = new CourseModel();
        try {
            return this.RequestCourse(courseID)
            .then(async (courseDetails) => {
                if ("GradableItems" in courseDetails && courseDetails.GradableItems.length > 0) {
                    const gradableItemIDs = courseDetails.GradableItems;
                    const gradableItemContr = new GradableItemController();
                    let returnVal = [];
                
                    for (const itemID of gradableItemIDs){
                        let itemDetails = await gradableItemContr.RequestGradableItem(itemID);
                        returnVal.push(itemDetails);
                    }
                    return returnVal;
                }
            });
            
            //}
        } catch (error) {
            console.log(error);
            return [];
        }
    }

   
}
