import { NextFunction, Request, Response, Router } from "express";
import {AdminModel} from "../models/AdminModel";
import {UserModel} from "../models/UserModel";
import {CourseModel} from "../models/CourseModel";
import {GradableItemModel} from "../models/GradableItemModel";

export class SessionController {
    constructor()
    {

    }
    async RequestUsers(req: Request, res: Response, next: NextFunction)
    {
        let m = new AdminModel();

        let retval = await m.GetAllUsers(req,res,next);
        return retval;
    }
    async RequestUser(req: Request, res: Response, next: NextFunction,id: Number)
    {

        let m = new UserModel(id);
        let retVal =  await m.GetUserDetails(req,res,next,id)
        console.log("Retval is ")
        console.log(retVal[0].Courses[0]);
        //Get course names
        let cm = new CourseModel();
        let gm = new GradableItemModel();
        let gradableItems = [];
        let courses = []
        for(let course of retVal[0].Courses)
        {
            console.log("Getting course details for courseid " + course);
            let courseDetails = await cm.GetCourseDetails(+course);
            for(let gradableItem of courseDetails[0].GradableItems)
            {
                gradableItems.push(await gm.GetGradableItemDetails(gradableItem));
            }

            courses.push(courseDetails);

        }
        retVal.push(courses);
        retVal.push(gradableItems)
        return retVal;

    }
}