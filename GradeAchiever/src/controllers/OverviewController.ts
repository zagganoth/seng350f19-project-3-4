import { NextFunction, Request, Response, Router } from "express";
import { CourseController } from "../controllers/CourseController";
import { UserModel } from "../models/UserModel";
import { GradableItemModel } from "../models/GradableItemModel";

export class OverviewController {
    constructor() {

    }

    // Gets user by ID and their courses, gradable items (in sorted order)
    public async RequestUser(id: number) {
        const um = new UserModel(id);
        const CourseCtrl = new CourseController();
        const retVal = [];
        // Get all details for the user, including courses
        const userDetails = await um.GetUserDetails(id);
        // gets course and grade info from courseController
        let gradableItems: Array<GradableItemModel> = [];
        const courses = [];
        if ("Courses" in  userDetails && userDetails.Courses !== []) {
            // For each course
            for (const course of userDetails.Courses) {
                // Get the course details, including all gradable items
                const courseDetails = await CourseCtrl.RequestCourse(course);
                courses.push(courseDetails);
                gradableItems = await this.RequestGradableItems(course, (courseDetails as any).CourseName, gradableItems);
            }
        }
        // Sort gradable items by due date
        //gradableItems.sort((a:any, b:any) => a.DueDate < b.DueDate ? -1 : a.DueDate > b.DueDate ? 1 : 0);
        retVal.push(userDetails);
        retVal.push(courses);
        retVal.push(gradableItems);
        return retVal;
    }

    /**
     * Requests all gradable items by course and sorts in order by duedate
     */
    public async RequestGradableItems(courseID: number, courseName: string, gradableItems: Array<GradableItemModel>) {
        const CourseCtrl = new CourseController();
        // get gradable items by course id from Course Controller
        const gradableItemsbyCourse: any = await CourseCtrl.RequestCourseGradableItems(courseID);
        for (const gradableitem of gradableItemsbyCourse) {
            // Add course name to each gradable item
            gradableitem.CourseName = courseName;
            gradableItems.push(gradableitem);
        }
        // Sort gradable items by due date
        gradableItems.sort((a, b) => a.DueDate < b.DueDate ? -1 : a.DueDate > b.DueDate ? 1 : 0);
        return gradableItems;
    }

}
