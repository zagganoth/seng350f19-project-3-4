import { NextFunction, Request, Response, Router } from "express";
import { AdminRoute } from "../../routes/AdminRoute";

jest.mock("../../models/AdminModel");

describe("Admin Routing Tests", () => {
    let TestAdminRoute: AdminRoute;
    const req = {} as Request;
    const res = {} as Response;
    const next = {} as NextFunction;
    const router = {} as Router;
    const thisID = 2;
    beforeEach(() => {
        TestAdminRoute = new AdminRoute();
    });

    it("Initializes Admin Route admin", async () => {
		const userid = 2;
		res.locals = {};
		res.render = () => {return; };
  TestAdminRoute.Admin(req, res, userid);
  expect(TestAdminRoute).toBeInstanceOf(AdminRoute);
	});

	   it("Creates a new admin user", async () => {
	    let user: Student = {
            AlgorithmAccuracy: 0,
            Courses: [],
            Email: "test@email.com",
            IsAdmin: true,
            NotificationLevel: 0,
            StudentID: 0,
            StudentName: "Test User"
        }
        //const name =
        //const email = ;
        //const isAdmin = true;
        TestAdminRoute.createUser(req, res, user);
	    expect(TestAdminRoute).toBeInstanceOf(AdminRoute);
    });

    it("Creates a non-admin user", async () => {
        let user: Student = {
            AlgorithmAccuracy: 0,
            Courses: [],
            Email: "test@email.com",
            IsAdmin: false,
            NotificationLevel: 0,
            StudentID: 0,
            StudentName: "Test User"
        }
        TestAdminRoute.createUser(req, res, user );
        expect(TestAdminRoute).toBeInstanceOf(AdminRoute);
    });

    it("Deletes a user", async () => {
        const userid = 1;
        TestAdminRoute.deleteUser(req, res, userid, thisID);
		      expect(TestAdminRoute).toBeInstanceOf(AdminRoute);
	});

});
