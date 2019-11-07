import { NextFunction, Request, Response, Router } from "express";
import {AdminModel} from "../models/AdminModel";
//import {CourseModel} from "../models/CourseModel";
import {GradableItemModel} from "../models/GradableItemModel";
import { UserModel } from "../models/UserModel";
import { CourseController } from "../controllers/CourseController";

export class OverviewController {
    constructor() {

    }

    // Gets user by ID and their courses, gradable items (in sorted order)
    public async RequestUser(id: number) {

        const um = new UserModel(id);
        // Get all details for the user, including courses
        const userDetails = await um.GetUserDetails(id);
        // Prepare to query details from both the courses and the models
        const gm = new GradableItemModel();
        const CourseCtrl = new CourseController();

        const gradableItems = [];
        const courses = [];
        if ("Courses" in  userDetails && userDetails.Courses !== []) {
            // This will be used to temporarily store each gradable item object then add a "coursename" field to it
            let item: any;
            let courseDetails: any;
            // For each course
            for (const course of userDetails.Courses) {
                // Get the course details, including all gradable items
                courseDetails = await CourseCtrl.RequestCourse(course);
                console.log("**** **** **** Course Details: "+courseDetails);
                if ("GradableItems" in courseDetails && courseDetails.GradableItems !== []) {
                    // For each gradable item in the course
                    for (const gradableItem of courseDetails.GradableItems) {
                        // Add it to the list of gradable items
                        item = await gm.GetGradableItemDetails(gradableItem);
                        item.CourseName = courseDetails.CourseName;
                        gradableItems.push(item);
                    }
                }
                courses.push(courseDetails);
            }
            
        }
        // Sort gradable items by due date
        gradableItems.sort((a, b) => a.DueDate < b.DueDate ? -1 : a.DueDate > b.DueDate ? 1 : 0);
            
        const retVal = [];
        retVal.push(userDetails);
        retVal.push(courses);
        retVal.push(gradableItems);
        return retVal;

    }
}
