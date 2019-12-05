import { BaseModel } from "../../models/BaseModel";
import { GradableItemModel } from "../../models/GradableItemModel";

jest.mock("../../models/BaseModel");

describe("GradableItem Model Tests", () => {
    const gradableItemModel = new GradableItemModel();
    let startGradableItem: IGradableItem;

    beforeEach(() => {
        startGradableItem = {
            GradableItemID: 1,
            CourseID: 1,
            GradableItemName: "Assignment1",
            DueDate: new Date("2019-01-01"),
            Weight: 5,
            CurrentGrade: 0,
            GItemAccuracy: 0,
            StudiedTime: 0,
        };
    });

    it("Should get gradable item details", async () => {
        return gradableItemModel.GetGradableItemDetails(1)
        .then((gradableItemDetails: any) => {
            expect(gradableItemDetails).toEqual(startGradableItem);
        });
    });

    it("Should create a new gradable item", async () => {
        const gradableItemID = startGradableItem.GradableItemID;
        return gradableItemModel.CreateItem(startGradableItem)
        .then((gradableItemDetails: any) => {
            expect(gradableItemDetails.GradableItemID).toBeGreaterThan(gradableItemID);
        });
    });

    it("Should get a new ID", async () => {
        return gradableItemModel.GetNewID()
        .then((newID: any) => {
            expect(newID).toBeGreaterThan(startGradableItem.GradableItemID);
        });
    });

    it("Should delete a gradable item", async () => {
        return gradableItemModel.DeleteGradableItem(1)
        .then((gradableItemDetails: any) => {
            expect(gradableItemDetails.GradableItemID).toEqual(startGradableItem.GradableItemID);
        });
    });

    it("Should edit course ID", async () => {
        return gradableItemModel.EditCourseID(1, 2)
        .then((gradableItemDetails: any) => {
            expect(gradableItemDetails.CourseID).toEqual(2);
        });
    });

    it("Should edit gradable item name", async () => {
        return gradableItemModel.EditGradableItemName(1, "Assignment2")
        .then((gradableItemDetails: any) => {
            expect(gradableItemDetails.GradableItemName).toEqual("Assignment2");
        });
    });

    it("Should edit gradable item weight", async () => {
        return gradableItemModel.EditGradableItemWeight(1, 10)
        .then((gradableItemDetails: any) => {
            expect(gradableItemDetails.Weight).toEqual(10);
        });
    });

    it("Should edit gradable item grade", async () => {
        return gradableItemModel.EditGradableItemGrade(1, 100)
        .then((gradableItemDetails: any) => {
            expect(gradableItemDetails.CurrentGrade).toEqual(100);
        });
    });

    it("Should edit gradable item due date", async () => {
        // const newDate = new Date("2019-12-01");
        const newDate = "2019-12-01";
        const dateObj = new Date(newDate);
        return gradableItemModel.EditDueDate(1, newDate)
        .then((gradableItemDetails: any) => {
            expect(gradableItemDetails.DueDate).toEqual(dateObj);
        });
    });

    it("Should add study time to gradable item", async () => {
        return gradableItemModel.AddStudyTime(1, 7)
        .then((gradableItemDetails: any) => {
            expect(gradableItemDetails.StudiedTime).toEqual(7);
        });
    });

});
