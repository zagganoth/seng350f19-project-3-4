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

    it("should delete a user", async () => {
        return controller.DeleteUser(req, res, next, id).then((users: any) => {
            expect(users.length).toEqual(2);
        });
    });
});
