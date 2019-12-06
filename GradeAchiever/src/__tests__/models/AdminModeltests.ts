import { AdminModel } from "../../models/AdminModel";
import { BaseModel } from "../../models/BaseModel";

jest.mock("../../models/BaseModel");

describe("Admin Model Tests", () => {
    const adminModel = new AdminModel();
    const user: IStudent = {
        AlgorithmAccuracy: 0,
        Courses: [],
        Email: "Test@email.com",
        IsAdmin: false,
        NotificationLevel: 0,
        StudentID: 5,
        StudentName: "Test",

    };
    it("Should add a user", async () => {

        return adminModel.AddUser(user)
        .then((user2: any) => {
            console.log(user2);
            expect(user2.StudentName).toEqual("Test");
        });
    });

    it("Should fail to add a user", async () => {
        const newUser: IStudent = {
            AlgorithmAccuracy: 0,
            Courses: [],
            Email: "",
            IsAdmin: false,
            NotificationLevel: 0,
            StudentID: 2,
            StudentName: "",

        };
        return adminModel.AddUser(newUser)
            .then((user2: any) => {
                console.log(user2);
                expect(user2).toEqual([]);
            });
    });
    it("Should remove a user", async () => {
        const retVal = adminModel.RemoveUser(user.StudentID)
        .then((user2: any) => {
            expect(user2.StudentName).toEqual("Test");
        });

    });
    it("Should fail to remove a user", async () => {
        const retVal = adminModel.RemoveUser(2)
            .then((user2: any) => {
                expect(user2).toEqual([]);
            });

    });
    it("Get all users", async () => {
        return adminModel.GetAllUsers()
        .then((user2: any) => {
            expect(user2).toBeDefined();
        });
    });
    it("Update a user", async () => {
        return adminModel.UpdateUser(1, {value: true})
        .then((user2: any) => {
            expect(user2.StudentName).toEqual({value: true});
        });
    });
    it("Fail to update a user", async () => {
        return adminModel.UpdateUser(2, {value: true})
        .then((user2: any) => {
            expect(user2).toEqual([]);
        });
    });
    it("Get a new ID", async () => {
        return adminModel.GetNewID()
        .then((id: number) => {
            expect(id).toEqual(1);
        });
    });

});
