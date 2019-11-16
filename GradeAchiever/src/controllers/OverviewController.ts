import { NextFunction, Request, Response, Router } from "express";
import { CourseController } from "../controllers/CourseController";
import { UserModel } from "../models/UserModel";

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
        const gradableItems = [];
        const courses = [];
        if ("Courses" in  userDetails && userDetails.Courses !== []) {
            // For each course
            for (const course of userDetails.Courses) {
                // Get the course details, including all gradable items
                const courseDetails = await CourseCtrl.RequestCourse(course);
                courses.push(courseDetails);
                for (const item of await this.RequestGradableItems(course, (courseDetails as any).CourseName)) {
                    gradableItems.push(item);
                }
            }
        }
        // Sort gradable items by due date
        gradableItems.sort((a, b) => (a as any).DueDate < (b as any).DueDate ? -1 : (a as any).DueDate > (b as any).DueDate ? 1 : 0);
        retVal.push(userDetails);
        retVal.push(courses);
        retVal.push(gradableItems);
        return retVal;
    }

    /**
     * Requests all gradable items by course and sorts in order by duedate
     */
    public async RequestGradableItems(courseID: number, courseName: string) {
        const CourseCtrl = new CourseController();
        // get gradable items by course id from Course Controller
        const gradableItems = [];
        const gradableItemsbyCourse = await CourseCtrl.RequestCourseGradableItems(courseID);
        if (gradableItemsbyCourse) {
            for (const gradableitem of gradableItemsbyCourse) {
                // Add course name to each gradable item
                (gradableitem as any).CourseName = courseName;
                gradableItems.push(gradableitem);
            }
        }
        return gradableItems;
    }

}
