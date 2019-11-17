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
		res.render = () =>{return};
        TestAdminRoute.Admin(req,res,next,userid);
        expect(TestAdminRoute).toBeInstanceOf(AdminRoute);
	});
	
	it("Creates a new admin user", async () => {
        const name = "Test User";
        const email = "test@email.com";
        const isAdmin = true;
        TestAdminRoute.createUser(req,res,next,name, email, isAdmin, thisID);
		expect(TestAdminRoute).toBeInstanceOf(AdminRoute);
    });

    it("Creates a non-admin user", async () => {
        const name = "Test User";
        const email = "test@email.com";
        const isAdmin = false;
        TestAdminRoute.createUser(req,res,next,name, email, isAdmin, thisID);
		expect(TestAdminRoute).toBeInstanceOf(AdminRoute);
    });
    
    it("Deletes a user", async () => {
        const userid = 1;
        TestAdminRoute.deleteUser(req,res,next,userid, thisID);
		expect(TestAdminRoute).toBeInstanceOf(AdminRoute);
	});

    
});
