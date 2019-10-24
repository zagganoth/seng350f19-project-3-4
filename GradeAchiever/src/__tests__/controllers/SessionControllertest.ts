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

    it("should get all users", async () => {
        return controller.RequestUsers(req, res, next).then((users) => {
            console.log(users);
            expect(users.length).toEqual(3);
        });
    });
});
