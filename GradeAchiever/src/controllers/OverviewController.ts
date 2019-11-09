import { NextFunction, Request, Response, Router } from "express";
import { CourseController } from "../controllers/CourseController";
import {AdminModel} from "../models/AdminModel";
// import {CourseModel} from "../models/CourseModel";
import {GradableItemModel} from "../models/GradableItemModel";
import { UserModel } from "../models/UserModel";

export class OverviewController {
    constructor() {

    }

    // Gets user by ID and their courses, gradable items (in sorted order)
    public async RequestUser(id: number) {

        const um = new UserModel(id);
        // Get all details for the user, including courses
        const userDetails = await um.GetUserDetails(id);
        // Prepare to query details from both the courses and the models
        // const gm = new GradableItemModel();

        // gets course and grade info from courseController
        const CourseCtrl = new CourseController();

        const gradableItems = [];
        const courses = [];
        if ("Courses" in  userDetails && userDetails.Courses !== []) {
            let courseDetails: any;
            let gradableItemsbyCourse: any;
            // For each course
            for (const course of userDetails.Courses) {
                // Get the course details, including all gradable items
                courseDetails = await CourseCtrl.RequestCourse(course);
                console.log("**** **** **** Course Details: " + courseDetails);
                // get gradable items by course id from Course Controller
                gradableItemsbyCourse = await CourseCtrl.RequestCourseGradableItems(course);
                console.log("Gradable Items by course:" + gradableItemsbyCourse);
                for (const gradableitem of gradableItemsbyCourse) {
                    // Add course name to each gradable item
                    gradableitem.CourseName = courseDetails.CourseName;
                    gradableItems.push(gradableitem);
                }
                courses.push(courseDetails);
            }

        }
        // Sort gradable items by due date
        gradableItems.sort((a, b) => a.DueDate < b.DueDate ? -1 : a.DueDate > b.DueDate ? 1 : 0);
        console.log(gradableItems);
        const retVal = [];
        retVal.push(userDetails);
        retVal.push(courses);
        retVal.push(gradableItems);
        return retVal;

    }
}
