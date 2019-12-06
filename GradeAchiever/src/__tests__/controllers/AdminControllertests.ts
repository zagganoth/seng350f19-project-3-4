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
        controller.DeleteUser(id)
        .then((users: any) => {
            expect(users.length).toEqual(2);
        });
    });

    it("Creates a new admin user", async () => {
        const user: IStudent = {
            AlgorithmAccuracy: 0,
            Courses: [],
            Email: "test@email.com",
            IsAdmin: true,
            NotificationLevel: 0,
            StudentID: 0,
            StudentName: "Test User",
        };
        controller.CreateUser(user)
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
        controller.EditUser(studentID, userDetails)
        .then((returnVal: any) => {
            expect(returnVal.matchedCount).toEqual(1);
        });
    });

});
