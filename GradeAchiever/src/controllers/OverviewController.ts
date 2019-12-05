import { CourseController } from "../controllers/CourseController";
import { UserModel } from "../models/UserModel";

export class OverviewController {

    private courseController = new CourseController();
    constructor() {
    }

    // Gets user by ID and their courses, gradable items (in sorted order)
    public async RequestUser(id: number) {
        const userModel = new UserModel(id);
        const retVal = [];
        // Get all details for the user, including courses
        const userDetails = await userModel.GetUserDetails(id);
        // gets course and grade info from courseController
        let gradableItems: any[] = [];
        const courses = [];
        if (userDetails !== null && "Courses" in  userDetails && userDetails.Courses !== []) {
            // For each course
            for (const course of userDetails.Courses) {
                // Get the course details, including all gradable items
                const courseDetails = await this.courseController.RequestCourse(course);
                courses.push(courseDetails);
                gradableItems = await this.RequestGradableItems(course, (courseDetails as any).CourseName, gradableItems);
            }
        }
        retVal.push(userDetails);
        retVal.push(courses);
        retVal.push(gradableItems);
        return retVal;
    }

    /**
     * Requests all gradable items by course and sorts in order by duedate
     */
    public async RequestGradableItems(courseID: number, courseName: string, gradableItems: any[]) {
        // get gradable items by course id from Course Controller
        const gradableItemsbyCourse: any = await this.courseController.RequestCourseGradableItems(courseID);
        for (const gradableitem of gradableItemsbyCourse) {
            // Add course name to each gradable item
            if (gradableitem !== null) {
                gradableitem.CourseName = courseName;
                gradableItems.push(gradableitem);
            }
        }
        // Sort gradable items by due date
        gradableItems.sort((a, b) => a.DueDate < b.DueDate ? -1 : a.DueDate > b.DueDate ? 1 : 0);
        return gradableItems;
    }

}
