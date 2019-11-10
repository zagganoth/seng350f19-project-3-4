
import { NextFunction, Request, Response, Router } from "express";
import {CourseController} from "../controllers/CourseController";
import { BaseRoute } from "./route";

export class CourseRoute extends BaseRoute {
    public static create(router: Router) {
        console.log("[CourseRoute::create] Creating course page route.");
        router.post("/course", (req: Request, res: Response, next: NextFunction) => {
            console.log(req.body);
            console.log(req.body.course);
            new CourseRoute().Course(req, res, next, Number(req.body.courseID), Number(req.body.thisID));
        });
        router.post("/newGradableItem", (req: Request, res: Response, next: NextFunction) => {
            new CourseRoute().createGradableItem(req,res,next,req.body.courseID, req.body.name, req.body.email, req.body.thisID);
        });

    }
    public async Course(req: Request, res: Response, next: NextFunction, courseID: number, userID: number, Mess: string= "") {
        const session = new CourseController();
        // Then, populate the overview page
        const courseCtrl = new CourseController();
        this.title = "Course Home";
        courseCtrl.RequestCourse(courseID)
        .then((details) => {
            console.log(details);
            const options: object = {
                courseDetails: details,
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
     * Signs up a new user by creating them in db and then loads their homepage
     */
    public async createGradableItem(req: Request, res: Response, next: NextFunction,courseID: number, name: string, email: string, thisID: number) {
        console.log("values of user to create is " + name.toString());
        console.log(email.toString());
        const courseCtrl = new CourseController();
        this.title = "CreateUser";
        courseCtrl.CreateGradableItem(courseID, name, email,thisID)
        .then((resp) => {
            console.log(resp);
            // If new user creation failed, reload page with message
            if (resp.insertedCount === 0) {
                const Mess = "Failed to create user.";
                this.Course(req, res, next, courseID, thisID, Mess);
            // Reload page with newest user
            } else {
                this.Course(req, res, next, courseID, thisID);
            }
        });

    }

}
