import { NextFunction, Request, Response, Router } from "express";
import { CourseRoute } from "../../routes/CourseRoute";

jest.mock("../../models/CourseModel");
jest.mock("../../models/GradableItemModel");
jest.mock("../../models/UserModel");

describe("Course Routing Tests", () => {
    let TestCourseRoute: CourseRoute;
    const req = {} as Request;
    const res = {} as Response;
    const next = {} as NextFunction;
    const router = {} as Router;
    const thisID = 2;
    beforeEach(() => {
        TestCourseRoute = new CourseRoute();
    });

    it("Initializes Course Route course", async () => {
		const courseid = 2;
		res.locals = {};
		res.render = () => {return; };
  TestCourseRoute.Course(req, res, courseid, thisID);
  expect(TestCourseRoute).toBeInstanceOf(CourseRoute);
	});

	   it("Creates a new gradable item", async () => {
        req.body = ({} as any);
        req.body.courseID = 1;
        req.body.name = "Test User";
        req.body.dueDate = "2019-12-02";
        const weight = 15;
        const accuracy = -1;
        TestCourseRoute.createGradableItems(req, res, next)
        .then((resp) => {
            expect(resp).toBeInstanceOf(Response);
        });
    });

    it("Edits course grade goal", async () => {
        const courseID = 1;
        const newgoal = 88;
        TestCourseRoute.editGradeGoal(req, res, courseID, newgoal);
		      expect(TestCourseRoute).toBeInstanceOf(CourseRoute);
    });

    it("Edits course's grade goal that does not exist", async () => {
        const courseID = 0;
        const newgoal = 88;
		      res.render = () => {return; };
        TestCourseRoute.editGradeGoal(req, res, courseID, newgoal);
		      expect(TestCourseRoute).toBeInstanceOf(CourseRoute);
    });

});
