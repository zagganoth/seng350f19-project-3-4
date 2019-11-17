import { NextFunction, Request, Response} from "express";
import { AdminController } from "../../controllers/AdminController";
import { AdminModel } from "../../models/AdminModel";

jest.mock("../../models/AdminModel");

describe("Session Controller Tests", () => {
    let controller: AdminController;
    const req = {} as Request;
    const res = {} as Response;
    const next = {} as NextFunction;
    const id = 1;
    beforeEach(() => {
        controller = new AdminController();
    });

    it("Deletes an existing user", async () => {
        return controller.DeleteUser(req, res, next, id).then((users: any) => {
            expect(users.length).toEqual(2);
        });
    });

    it("Creates a new admin user", async () => {
        const name = "Test User";
        const email = "test@email.com";
        const isadmin = true;
        return controller.CreateUser(req, res, next, name, email, isadmin)
        .then((returnVal: any) => {
            expect(returnVal.insertedCount).toEqual(1);
        });
    });

    it("Edits an existing user", async () => {
        const userDetails: object = {
            StudentName: "Test User",
            Email: "test@email.com",
            IsAdmin: false,
        };
        const studentID = 5;
        return controller.EditUser(req, res, next, studentID, userDetails)
        .then((returnVal: any) => {
            expect(returnVal.matchedCount).toEqual(1);
        });
    });

});
