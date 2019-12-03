import { NextFunction, Request, Response} from "express";
import { CourseController } from "../../controllers/CourseController";

jest.mock("../../models/CourseModel");
jest.mock("../../models/GradableItemModel");

describe("Course Controller Tests", () => {
    let controller: CourseController;
    const req = {} as Request;
    const res = {} as Response;
    const next = {} as NextFunction;
    beforeEach(() => {
        controller = new CourseController();
    });

    it("Gets a course by id", async () => {
        const courseID = 1;
        return controller.RequestCourse(courseID)
        .then((courseDetails: any) => {
            expect(courseDetails.CourseID).toEqual(courseID);
        });
    });

    it("Gets a course by id that does not exist", async () => {
        const courseID = 0;
        return controller.RequestCourse(courseID)
        .then((resp: any) => {
            expect(resp.length).toEqual(0);
        });
    });

    it("Edits a course grade goal", async () => {
        const courseID = 1;
        const newGoal = 93;
        return controller.editCourseGradeGoal(courseID, newGoal)
        .then((resp: any) => {
            expect(resp.matchedCount).toEqual(1);
        });
    });

    it("Edits a course grade goal that does not exist", async () => {
        const courseID = 0;
        const newGoal = 93;
        return controller.editCourseGradeGoal(courseID, newGoal)
        .then((resp: any) => {
            expect(resp.matchedCount).toEqual(0);
        });
    });

    it("Gets a course's gradable items", async () => {
        const courseID = 1;
        return controller.RequestCourseGradableItems(courseID)
        .then((gradableItems: any) => {
            expect(gradableItems.length).toEqual(2);
        });
    });

    it("Creates a gradable item", async () => {
        const courseID = 1;
        const name = "Assignment 5";
        const duedate = "2019-11-21";
        const weight = 10;
        return controller.CreateGradableItem(courseID, name, duedate, weight)
        .then((returnVal: any) => {
            // Changed returnVal to be the id of the new gradable item - returns -1 if failed, >0 if passed
            expect(returnVal).toBeGreaterThan(0);
        });
    });

    it("Attempts to create a gradable item for a course that does not exist", async () => {
        const courseID = 0;
        const name = "Assignment 5";
        const duedate = "2019-11-21";
        const weight = 10;
        return controller.CreateGradableItem(courseID, name, duedate, weight)
        .then((returnVal: any) => {
            expect(returnVal).toEqual( -1);
        });
    });

});
