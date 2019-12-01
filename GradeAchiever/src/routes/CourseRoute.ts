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
            new CourseRoute().createGradableItems(req, res, next);
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
        router.post("/logStudyHours", (req: Request, res: Response, next: NextFunction) => {
            new CourseRoute().logGradableItemTime(req, res, next, req.body.gradableItemID, req.body.prevtime, req.body.newtime);
        });
        router.post("/editgradableitem", (req: Request, res: Response, next: NextFunction) => {
            // new CourseRoute().editName(req, res, next, req.body.gradableItemID, req.body.newName);
            new CourseRoute().editGradableItem(req, res, next);
        });
        router.post("/deleteitem", (req: Request, res: Response, next: NextFunction) => {
            new CourseRoute().deleteGradableItem(req, res, next);
        });
    }
    public async editGradableItem(req: Request, res: Response, next: NextFunction) {
        const name = req.body.name;
        const id = req.body.id;
        const duedate = req.body.date;
        const hours = req.body.hours;
        const grade = req.body.grade;
        const courseController = new CourseController();
        try {
            await courseController.EditGradableItem(id, name, duedate, hours, grade);
            res.redirect(307, "/overview");
        } catch (error) {
            console.log(error);
            this.render(req, res, "error", error);
        }
        // this.logGradableItemTime(req,res,next,id,0,hours);

    }
    public async deleteGradableItem(req: Request, res: Response, next: NextFunction) {
        const courseController = new CourseController();
        courseController.deleteGradableItem(req.body.course, req.body.id)
        .then((details) => {
            res.redirect(307, "/overview");
        })
        .catch((error) => {
            console.log(error);
            this.render(req, res, "error", error);
        });
    }
    public async Course(req: Request, res: Response, next: NextFunction, courseID: number, userID: number, Mess: string= "") {
        // Then, populate the overview page
        const courseCtrl = new CourseController();
        this.title = "Course Home";
        courseCtrl.RequestCourse(courseID)
        .then(async (details) => {
            const gradableItemDetails = await courseCtrl.RequestCourseGradableItems(courseID);

            // gradableItemDetails.sort((a, b) => a.DueDate < b.DueDate ? -1 : a.DueDate > b.DueDate ? 1 : 0);
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
    public async createGradableItem(req: Request, res: Response, next: NextFunction, courseID: number, name: string, dueDate: string, weight: number, gItemAccuracy: number = -1) {
        const courseCtrl = new CourseController();
        this.title = "CreateGradableItem";
        courseCtrl.CreateGradableItem(courseID, name, dueDate, weight, gItemAccuracy);
    }

    /**
     * creates new gradable items for a course
     */
    public async createGradableItems(req: Request, res: Response, next: NextFunction) {
        const courseCtrl = new CourseController();
        console.log(req.body.courseID);
        console.log(req.body.studentID);
        this.title = "CreateGradableItems";
        courseCtrl.createGradableItems(req.body)
        .then(() => {
            console.log("rendering userhome");
            this.Course(req, res, next, Number(req.body.courseID), Number(req.body.studentID));
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

      /*
     * Edits a courses name
     */
    public async logGradableItemTime(req: Request, res: Response, next: NextFunction, gradableItemID: number,  prevtime: number, newtime: number) {
        const courseCtrl = new CourseController();
        this.title = "AddStudyTime";
        courseCtrl.addStudyTime(gradableItemID, prevtime, newtime)
        .then((resp) => {
            if (resp.matchedCount === 1) {
                res.sendStatus(200);
            } else {
                res.sendStatus(500);
            }
        });
    }

}
