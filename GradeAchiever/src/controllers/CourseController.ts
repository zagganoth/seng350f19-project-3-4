import { NextFunction, Request, Response, Router } from "express";
import { GradableItemController } from "../controllers/GradableItemController";
import { CourseModel} from "../models/CourseModel";
import { UserModel } from "../models/UserModel";

export class CourseController {

    private courseModel = new CourseModel();
    private gradableItemController = new GradableItemController();

    constructor() {
    }

    /* Gets course Details by course ID */
    public async RequestCourse(courseID: number) {
        try {
            return this.courseModel.GetCourseDetails(courseID);
        } catch (error) {
            console.log(error);
            return [];
        }
    }

    public async createCourse(courseDetails: any) {
        const name: string = courseDetails.name;
        const courseId = (await this.courseModel.GetNewID()) as number;
        const gradableItems = [];
        for (const gradableItem of courseDetails.GradableItems) {
            const g: IGradableItem = {
                CourseID: courseId,
                CurrentGrade: 0,
                DueDate: gradableItem.duedate,
                GItemAccuracy: 0,
                GradableItemID: 0,
                GradableItemName: gradableItem.name,
                StudiedTime: 0,
                Weight: gradableItem.weight,
                RecommendedTime: gradableItem.weight / 2,
            };
            gradableItems.push(await this.CreateGradableItem(g));
        }
        const course: ICourse = {
            CourseID: 0,
            CourseName: name,
            CurrentGrade: 100,
            GradableItems: gradableItems,
            GradeGoal: courseDetails.gradegoal,
            PerceivedDifficulty: courseDetails.perceivedDiff,
            StudentID: courseDetails.user,
        };
        await this.courseModel.CreateNewCourse(course); // courseDetails.user, name, courseDetails.perceivedDiff, 100, courseDetails.gradegoal, gradableItems);

        // these steps should not be done here, these should be put somewhere else. This function should return the course id which then gets added tothe user object.

        const userModel = new UserModel(courseDetails.user);
        return userModel.AddCourse(courseDetails.user, [courseId]);
    }

    /**
     * Creates gradable items for a course
     */
    public async createGradableItems(courseDetails: ICourse)  {
        const courseID: number = Number(courseDetails.CourseID);
        const gradableItems = [];
        for (const gradableItem of courseDetails.GradableItems) {
            try {
                const item: IGradableItem = {
                    CourseID: courseID,
                    CurrentGrade: 0,
                    DueDate: gradableItem.duedate,
                    GItemAccuracy: 0,
                    GradableItemID: 0,
                    GradableItemName: gradableItem.name,
                    StudiedTime: 0,
                    Weight: gradableItem.weight,
                    RecommendedTime: gradableItem.weight,
                };
                gradableItems.push(await this.CreateGradableItem(item));
            } catch (error) {
                console.log(error);
                console.log("creating item failed :(");
            }
        }
        await this.courseModel.AddGradableItems(courseID, gradableItems);
    }

    /* Gets all gradable items Details in an array of a specified course ID
     * Called from course view
     */
    public async RequestCourseGradableItems(courseID: number) {
        const courseDetails = await this.RequestCourse(courseID);
        if ("GradableItems" in courseDetails && courseDetails.GradableItems.length > 0) {
            const gradableItemIDs = courseDetails.GradableItems;
            const returnVal = [];
            for (const itemID of gradableItemIDs) {
                const itemDetails = await this.gradableItemController.RequestGradableItem(itemID);
                returnVal.push(itemDetails);
            }
            return returnVal;
        } else {
            console.log("No Gradable items found for course.");
            return [];
        }
    }

    /* Edits course grade goal*/

    public async editCourseGradeGoal(courseID: number, newGoal: number) {
        return this.courseModel.EditGradeGoal(Number(courseID), Number(newGoal));
    }

    /* Edits course's perceived difficulty*/
    public async editDifficulty(courseID: number, newDiff: number) {
        return this.courseModel.EditPercievedDifficulty(Number(courseID), Number(newDiff));
    }

    /* Edits course's name*/
    public async editCourseName(courseID: number, newName: string) {
        return this.courseModel.EditCourseName(Number(courseID), String(newName));
    }

    /* Gets course Details by course ID */
    public async CreateGradableItem(g: IGradableItem) {// courseID: number, name: string, duedate: string, weight: number, gItemAccuracy: number = -1) {
        try {
            const returnVal: any = await this.gradableItemController.CreateItem(g);
            // console.log("course return:");
            // console.log(returnVal);

            // Returns the id of the newly created gradable item
            return returnVal.ops[0].GradableItemID;
        } catch (error) {
            console.log(error);
            console.log("error in courseController");
            return -1;
        }
    }
    public async EditGradableItem(g: IGradableItem) {// gradableItemID: number, name: string, dueDate: Date, hours: number, grade: number) {
        try {
            g.GradableItemID = Number(g.GradableItemID);
            await this.gradableItemController.EditDueDate(g.GradableItemID, g.DueDate);
            await this.gradableItemController.EditItemGrade(g.GradableItemID, g.CurrentGrade);
            await this.gradableItemController.EditItemName(g.GradableItemID, g.GradableItemName);
            await this.gradableItemController.EditStudyTime(g.GradableItemID, g.StudiedTime);
            await this.gradableItemController.EditGradableItemWeight(g.GradableItemID, g.Weight);
            return g.GradableItemID;
        } catch (error) {
            console.log(error);
            return [];
        }
    }
    /* Adds study time to a gradable item */

    // this one probably needs to rely on grabbing the previous value from the database? Will need to confirm.
    public async addStudyTime(gradableItemID: number, prevtime: number, newtime: number) {
        try {
            const returnVal: any = await this.gradableItemController.LogStudyTime(gradableItemID, prevtime, newtime);
            // Returns the new number of hours studied
            return returnVal.ops[0].StudiedTime;
        } catch (error) {
            console.log(error);
            return -1;
        }
    }
    public async deleteGradableItem(courseID: number, gradableItemID: number) {
        try {
            await this.courseModel.DeleteGradableItems(courseID, [Number(gradableItemID)]);
            return this.gradableItemController.deleteGradableItem(gradableItemID);
        } catch (error) {
            console.log(error);
        }

    }

}
