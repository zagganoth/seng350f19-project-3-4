
import { NextFunction, Request, Response, Router } from "express";
import {CourseController} from "../controllers/CourseController";
import { BaseRoute } from "./route";

export class CourseRoute extends BaseRoute {
    public static create(router: Router) {
        console.log("[CourseRoute::create] Creating course page route.");
        router.post("/course", (req: Request, res: Response, next: NextFunction) => {
            console.log(req.body);
            console.log(req.body.courseID);
            new CourseRoute().Course(req, res, next, Number(req.body.courseID), Number(req.body.thisID));
        });
        router.post("/newGradableItem", (req: Request, res: Response, next: NextFunction) => {
            new CourseRoute().createGradableItem(req, res, next, req.body.courseID, req.body.name, req.body.dueDate, req.body.weight, req.body.gItemAccuracy);
        });
        router.post("/editGradeGoal", (req: Request, res: Response, next: NextFunction) => {
            console.log(req.body.courseID);
            console.log(req.body.newGoal);
            new CourseRoute().editGradeGoal(req, res, next, req.body.courseID, req.body.newGoal);
        });

    }
    public async Course(req: Request, res: Response, next: NextFunction, courseID: number, userID: number, Mess: string= "") {
        const session = new CourseController();
        // Then, populate the overview page
        const courseCtrl = new CourseController();
        this.title = "Course Home";
        courseCtrl.RequestCourse(courseID)
        .then(async (details) => {
            console.log(details);
            const gradableItemDetails = await courseCtrl.RequestCourseGradableItems(courseID);
            const options: object = {
                courseDetails: details,
                gradableItems: gradableItemDetails,
                thisID: userID,
                message: Mess,
            };
            this.render(req, res, "course", options);
        })
        .catch((error) => {
           this.render(req, res, "error", error);
        });
    }

    /**
     * creates a new gradable item for a course
     */

    public async createGradableItem(req: Request, res: Response, next: NextFunction, courseID: number, name: string, dueDate: string, weight: number, gItemAccuracy: number) {
        const courseCtrl = new CourseController();
        this.title = "CreateGradableItem";
        courseCtrl.CreateGradableItem(courseID, name, dueDate, weight, gItemAccuracy)
        .then((resp) => {
            console.log(resp);
            // If new gradable item creation failed, reload page with message
            if (resp.insertedCount === 0) {
                const Mess = "Failed to create item.";
                return resp;
            // Reload page with newest user
            } else {
                return resp;
            }
        });

    }

    /**
     * Edits a course grade grade goal
     */
    public async editGradeGoal(req: Request, res: Response, next: NextFunction, courseID: number, newGoal: number) {
        const courseCtrl = new CourseController();
        this.title = "EditGradeGoal";
        courseCtrl.editCourseGradeGoal(req, res, next, courseID, newGoal)
        .then((resp) => {
            if (resp.matchedCount === 1) {
                res.sendStatus(200);
            } else {
                res.sendStatus(500);
            }
            return;
        });

    }

}
