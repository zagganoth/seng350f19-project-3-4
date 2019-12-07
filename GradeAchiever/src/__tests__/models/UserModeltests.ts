import { BaseModel } from "../../models/BaseModel";
import { UserModel } from "../../models/UserModel";

jest.mock("../../models/BaseModel");

describe("User Model Tests", () => {
    const userModel = new UserModel(1);
    it("Gets user details successfully", async () => {
        return userModel.GetUserDetails(1)
        .then((user: any) => {
           expect(user.StudentName).toEqual("Test");
        });
    });
    it("Add a course to user successfully", async () => {
        return userModel.AddCourse(1, [1, 2])
        .then((user: any) => {
            expect(user.Courses).toEqual([1, 2]);
        });
    });
    it("Edit user algorithm accuracy successfully", async () => {
        return userModel.EditAlgorithmAccuracy(1, 0.5)
        .then((user: any) => {
            expect(user.AlgorithmAccuracy).toEqual({AlgorithmAccuracy: 0.5});
        });
    });
    it("Remove a course successfully", async () => {
        return userModel.RemoveCourse(1, [1, 2])
        .then((user: any) => {
            expect(user.Courses).toEqual([3]);
        });
    });
    it("Edit user notifications successfully", async () => {
        return userModel.EditNotificationSettings(1, 2)
        .then((user: any) => {
            expect(user.NotificationSettings).toEqual({NotificationSettings: 2});
        });
    });
    it("Gets user details unsuccessfully", async () => {
        return userModel.GetUserDetails(2)
            .then((user: any) => {
                expect(user).toEqual([]);
            });
    });
    it("Add a course to user unsuccessfully", async () => {
        return userModel.AddCourse(2, [1, 2])
            .then((user: any) => {
                expect(user).toEqual([]);
            });
    });
    it("Edit user algorithm accuracy unsuccessfully", async () => {
        return userModel.EditAlgorithmAccuracy(2, 0.5)
            .then((user: any) => {
                expect(user).toEqual([]);
            });
    });
    it("Edit user algorithm accuracy unsuccessfully", async () => {
        return userModel.RemoveCourse(2, [1, 2])
            .then((user: any) => {
                expect(user).toEqual([]);
            });
    });
    it("Edit user algorithm accuracy unsuccessfully", async () => {
        return userModel.EditNotificationSettings(2, 2)
            .then((user: any) => {
                expect(user).toEqual([]);
            });
    });
});
