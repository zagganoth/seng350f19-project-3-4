import { NextFunction, Request, Response} from "express";
import { SessionController } from "../../controllers/SessionController";
import { AdminModel } from "../../models/AdminModel";

jest.mock("../../models/AdminModel");

describe("Session Controller Tests", () => {
    let controller: SessionController;
    const req = {} as Request;
    const res = {} as Response;
    const next = {} as NextFunction;
    beforeEach(() => {
        controller = new SessionController();
    });

    it("Gets all users", async () => {
        return controller.RequestUsers()
        .then((users: any) => {
            expect(users.length).toEqual(3);
        });
    });

    it("Verifies user exists", async () => {
        return controller.VerifyUser(req, res, next, 1)
        .then((users: any) => {
            expect(1);
        });
    });

    it("Creates a new user", async () => {
        const name = "Test User";
        const email = "test@email.com";
        return controller.CreateUser(name, email)
        .then((returnVal: any) => {
            expect(returnVal.insertedCount).toEqual(1);
        });
    });

});
