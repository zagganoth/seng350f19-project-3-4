import { NextFunction, Request, Response} from "express";
import { OverviewController } from "../../controllers/OverviewController";

jest.mock("../../models/UserModel");
jest.mock("../../models/GradableItemModel");
jest.mock("../../models/CourseModel");

describe("Overview Controller Tests", () => {
    let controller: OverviewController;
    const id = 1;
    beforeEach(() => {
        controller = new OverviewController();
    });

    it("test request a user and their courses and gradable items", async () => {
        return controller.RequestUser(id).then((user: any) => {
            expect(user);
        });
    });
});
