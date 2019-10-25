import { NextFunction, Request, Response, Router } from "express";
import {AdminModel} from "../models/AdminModel";
import {CourseModel} from "../models/CourseModel";
import {GradableItemModel} from "../models/GradableItemModel";
import {UserModel} from "../models/UserModel";

export class OverviewController {
    constructor() {

    }

    public async RequestUser(id: number) {

        const um = new UserModel(id);
        // Get all details for the user, including courses
        const userDetails = await um.GetUserDetails(id);
        // Prepare to query details from both the courses and the models
        const cm = new CourseModel();
        const gm = new GradableItemModel();

        const gradableItems = [];
        const courses = [];
        // This will be used to temporarily store each gradable item object then add a "coursename" field to it
        let item;
        // For each course
        for (const course of userDetails.Courses) {
            // Get the course details, including all gradable items
            const courseDetails = await cm.GetCourseDetails(+course);
            // For each gradable item in the course
            for (const gradableItem of courseDetails.GradableItems) {
                // Add it to the list of gradable items
                item = await gm.GetGradableItemDetails(gradableItem);
                item.CourseName = courseDetails.CourseName;
                gradableItems.push(item);
            }
            courses.push(courseDetails);
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
