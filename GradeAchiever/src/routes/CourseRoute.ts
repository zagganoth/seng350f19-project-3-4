import { NextFunction, Request, Response, Router } from "express";
import {CourseController} from "../controllers/CourseController";
import { BaseRoute } from "./route";

export class CourseRoute extends BaseRoute {
    public static create(router: Router) {

        console.log("[CourseRoute::create] Creating course page route.");
        router.post("/course", (req: Request, res: Response, next: NextFunction) => {
            new CourseRoute().Course(req, res, next, Number(req.body.courseID), Number(req.body.thisID));
        });
        router.post("/newGradableItem", (req: Request, res: Response, next: NextFunction) => {
            new CourseRoute().createGradableItem(req, res, next, req.body.courseID, req.body.name, req.body.dueDate, req.body.weight, req.body.gItemAccuracy);
        });
        router.post("/editGradeGoal", (req: Request, res: Response, next: NextFunction) => {
            new CourseRoute().editGradeGoal(req, res, next, req.body.courseID, req.body.newGoal);
        });
        router.post("/editDifficulty", (req: Request, res: Response, next: NextFunction) => {
            new CourseRoute().editGradeGoal(req, res, next, req.body.courseID, req.body.newDiff);
        });
        router.post("/editCourseName", (req: Request, res: Response, next: NextFunction) => {
            new CourseRoute().editName(req, res, next, req.body.courseID, req.body.newName);
        });

    }

    public async Course(req: Request, res: Response, next: NextFunction, courseID: number, userID: number, Mess: string= "") {
        // Then, populate the overview page
        const courseCtrl = new CourseController();
        this.title = "Course Home";
        courseCtrl.RequestCourse(courseID)
        .then(async (details) => {
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
        courseCtrl.CreateGradableItem(courseID, name, dueDate, weight, gItemAccuracy);
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
        });

    }

    /*
     * Edits a courses perceived difficulty
     */
    public async editDifficulty(req: Request, res: Response, next: NextFunction, courseID: number, newGoal: number) {
        const courseCtrl = new CourseController();
        this.title = "EditDifficulty";
        courseCtrl.editDifficulty(req, res, next, courseID, newGoal)
        .then((resp) => {
            if (resp.matchedCount === 1) {
                res.sendStatus(200);
            } else {
                res.sendStatus(500);
            }
        });

    }


     /*
     * Edits a courses name
     */
    public async editName(req: Request, res: Response, next: NextFunction, courseID: number, newName: string) {
        const courseCtrl = new CourseController();
        this.title = "EditDifficulty";
        courseCtrl.editCourseName(req, res, next, courseID, newName)
        .then((resp) => {
            if (resp.matchedCount === 1) {
                res.sendStatus(200);
            } else {
                res.sendStatus(500);
            }
        });

    }


}
