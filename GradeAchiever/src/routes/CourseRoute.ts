import { NextFunction, Request, Response, Router } from "express";
import {CourseController} from "../controllers/CourseController";
import {GradableItemModel} from "../models/GradableItemModel";
import { BaseRoute } from "./route";

export class CourseRoute extends BaseRoute {
    public static create(router: Router) {

        console.log("[CourseRoute::create] Creating course page route.");
        router.post("/course", (req: Request, res: Response, next: NextFunction) => {
            new CourseRoute().Course(req, res, Number(req.body.courseID), Number(req.body.thisID));
        });
        router.post("/newGradableItem", (req: Request, res: Response, next: NextFunction) => {
            new CourseRoute().createGradableItems(req, res, next);
        });
        router.post("/editGradeGoal", (req: Request, res: Response, next: NextFunction) => {
            new CourseRoute().editGradeGoal(req, res, req.body.courseID, req.body.newGoal);
        });
        router.post("/editDifficulty", (req: Request, res: Response, next: NextFunction) => {
            new CourseRoute().editGradeGoal(req, res, req.body.courseID, req.body.newDiff);
        });
        router.post("/editCourseName", (req: Request, res: Response, next: NextFunction) => {
            new CourseRoute().editName(res, req.body.courseID, req.body.newName);
        }); /*
        router.post("/logStudyHours", (req: Request, res: Response, next: NextFunction) => {
            new CourseRoute().logGradableItemTime(req, res, next, req.body.gradableItemID, req.body.prevtime, req.body.newtime);
        });*/
        router.post("/editgradableitem", (req: Request, res: Response, next: NextFunction) => {
            // new CourseRoute().editName(req, res, next, req.body.gradableItemID, req.body.newName);
            new CourseRoute().editGradableItem(req, res, next);
        });
        router.post("/deleteitem", (req: Request, res: Response, next: NextFunction) => {
            new CourseRoute().deleteGradableItem(req, res, next);
        });
    }
    private courseController = new CourseController();

    public async editGradableItem(req: Request, res: Response, next: NextFunction) {
        const gItem = {} as IGradableItem;
        gItem.GradableItemName = req.body.name;
        gItem.GradableItemID = req.body.id;
        gItem.DueDate = req.body.date;
        gItem.StudiedTime = Number(req.body.hours) + Number(req.body.prevHours);
        gItem.CurrentGrade = req.body.grade;
        gItem.Weight = req.body.weight;
        const courseController = new CourseController();
        try {
            await courseController.EditGradableItem(gItem);
            res.redirect(307, "/" + req.body.pagename);
        } catch (error) {
            console.log(error);
            this.render(req, res, "error", error);
        }
        // this.logGradableItemTime(req,res,next,id,0,hours);

    }
    public async deleteGradableItem(req: Request, res: Response, next: NextFunction) {
        this.courseController.deleteGradableItem(req.body.course, req.body.id)
        .then((details) => {
            res.redirect(307, "/" + req.body.pagename);
        })
        .catch((error) => {
            console.log(error);
            this.render(req, res, "error", error);
        });
    }
    public async Course(req: Request, res: Response, courseID: number, userID: number) {
        // Then, populate the overview page
        this.title = "Course Home";
        this.courseController.RequestCourse(courseID)
        .then(async (details) => {
            const gradableItemDetails = await this.courseController.RequestCourseGradableItems(courseID);

            // gradableItemDetails.sort((a, b) => a.DueDate < b.DueDate ? -1 : a.DueDate > b.DueDate ? 1 : 0);
            const options: object = {
                courseDetails: details,
                gradableItems: gradableItemDetails,
                thisID: userID,
            };
            this.render(req, res, "course", options);
        })
        .catch((error) => {
           this.render(req, res, "error", error);
        })
        .catch((error) => {
            console.log(error);
        });
    }

    /**
     * creates a new gradable item for a course
     */
/*
    public async createGradableItem(req: Request, res: Response, next: NextFunction, courseID: number, name: string, dueDate: string, weight: number, gItemAccuracy: number = -1) {
        this.title = "CreateGradableItem";
        this.courseController.CreateGradableItem(courseID, name, dueDate, weight, gItemAccuracy);
        res.redirect(307,'/course');
    }
*/
    /**
     * creates new gradable items for a course
     */
    public async createGradableItems(req: Request, res: Response, next: NextFunction) {
        console.log(req.body.courseID);
        console.log(req.body.studentID);
        this.title = "CreateGradableItems";
        const course: ICourse = {
            CourseID: req.body.courseID,
            CourseName: "",
            CurrentGrade: 0,
            GradableItems: req.body.GradableItems,
            GradeGoal: 0,
            PerceivedDifficulty: 0,
            StudentID: 0,

        };
        this.courseController.createGradableItems(course)
        .then(() => {
            console.log("rendering userhome");
            res.redirect(307, "/course");
        })
        .catch((error) => {
            console.log(error);
        });
    }

    /**
     * Edits a course grade grade goal
     */
    public async editGradeGoal(req: Request, res: Response, courseID: number, newGoal: number) {
        this.title = "EditGradeGoal";
        this.courseController.editCourseGradeGoal(courseID, newGoal)
        .then((resp) => {
            if (resp.matchedCount === 1) {
                res.sendStatus(200);
            } else {
                res.sendStatus(500);
            }
        })
        .catch((error) => {
            console.log(error);
        });

    }

    /*
     * Edits a courses perceived difficulty
     */
    public async editDifficulty(res: Response, courseID: number, newGoal: number) {
        this.title = "EditDifficulty";
        this.courseController.editDifficulty(courseID, newGoal)
        .then((resp) => {
            if (resp.matchedCount === 1) {
                res.sendStatus(200);
            } else {
                res.sendStatus(500);
            }
        })
        .catch((error) => {
            console.log(error);
        });

    }

     /*
     * Edits a courses name
     */
    public async editName(res: Response, courseID: number, newName: string) {
        this.title = "EditDifficulty";
        this.courseController.editCourseName(courseID, newName)
        .then((resp) => {
            if (resp.matchedCount === 1) {
                res.sendStatus(200);
            } else {
                res.sendStatus(500);
            }
        })
        .catch((error) => {
            console.log(error);
        });
    }

      /*
     * Edits a courses name
     */
    public async logGradableItemTime(res: Response, gradableItemID: number,  prevtime: number, newtime: number) {
        this.title = "AddStudyTime";
        this.courseController.addStudyTime(gradableItemID, prevtime, newtime)
        .then((resp) => {
            if (resp.matchedCount === 1) {
                res.sendStatus(200);
            } else {
                res.sendStatus(500);
            }
        })
        .catch((error) => {
            console.log(error);
        });
    }

}
