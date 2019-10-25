import { NextFunction, Request, Response} from "express";
import { OverviewController } from "../../controllers/OverviewController";
import { UserModel } from "../../models/UserModel";

jest.mock("../../models/UserModel");

describe("Overview Controller Tests", () => {
    let controller: OverviewController;
    const id = 1;
    beforeEach(() => {
        controller = new OverviewController();
    });

    it("should delete a user", async () => {
        return controller.RequestUser(id).then((user: any) => {
            expect(user);
        });
    });
});
