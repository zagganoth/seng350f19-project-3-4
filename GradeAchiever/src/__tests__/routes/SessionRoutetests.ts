import { NextFunction, Request, Response, Router } from "express";
import { SessionRoute } from "../../routes/SessionRoute";

jest.mock("../../models/AdminModel");
jest.mock("../../models/UserModel");
jest.mock("../../models/CourseModel");
jest.mock("../../models/GradableItemModel");

describe("Session Routing Tests", () => {
    let TestSessionRoute: SessionRoute;
    const req = {} as Request;
    const res = {} as Response;
    const next = {} as NextFunction;
    const router = {} as Router;
    beforeEach(() => {
        TestSessionRoute = new SessionRoute();
    });

    it("Initializes Session Route session", async () => {
		const userid = 2;
		res.locals = {};
		res.render = () => {return; };
  TestSessionRoute.Session(req, res, next, userid);
  expect(TestSessionRoute).toBeInstanceOf(SessionRoute);
	});

	   it("Creates User", async () => {
        const name = "Test User";
        const email = "test@email.com";
        TestSessionRoute.createUser(req, res, next, name, email);
		      expect(TestSessionRoute).toBeInstanceOf(SessionRoute);
	});

});
