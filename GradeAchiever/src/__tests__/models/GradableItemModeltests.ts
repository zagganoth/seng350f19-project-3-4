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

    it("Should get gradable item details succesfully", async () => {
        return gradableItemModel.GetGradableItemDetails(1)
        .then((gradableItemDetails: any) => {
            expect(gradableItemDetails).toEqual(startGradableItem);
        });
    });

    it("Should create a new gradable item succesfully", async () => {
        const gradableItemID = startGradableItem.GradableItemID;
        return gradableItemModel.CreateItem(startGradableItem)
        .then((gradableItemDetails: any) => {
            expect(gradableItemDetails.GradableItemID).toBeGreaterThan(gradableItemID);
        });
    });

    it("Should get a new ID succesfully", async () => {
        return gradableItemModel.GetNewID()
        .then((newID: any) => {
            expect(newID).toBeGreaterThan(startGradableItem.GradableItemID);
        });
    });

    it("Should delete a gradable item succesfully", async () => {
        return gradableItemModel.DeleteGradableItem(1)
        .then((gradableItemDetails: any) => {
            expect(gradableItemDetails.GradableItemID).toEqual(startGradableItem.GradableItemID);
        });
    });

    it("Should edit course ID succesfully", async () => {
        return gradableItemModel.EditCourseID(1, 2)
        .then((gradableItemDetails: any) => {
            expect(gradableItemDetails.CourseID).toEqual(2);
        });
    });

    it("Should edit gradable item name succesfully", async () => {
        return gradableItemModel.EditGradableItemName(1, "Assignment2")
        .then((gradableItemDetails: any) => {
            expect(gradableItemDetails.GradableItemName).toEqual("Assignment2");
        });
    });

    it("Should edit gradable item weight succesfully", async () => {
        return gradableItemModel.EditGradableItemWeight(1, 10)
        .then((gradableItemDetails: any) => {
            expect(gradableItemDetails.Weight).toEqual(10);
        });
    });

    it("Should edit gradable item grade succesfully", async () => {
        return gradableItemModel.EditGradableItemGrade(1, 100)
        .then((gradableItemDetails: any) => {
            expect(gradableItemDetails.CurrentGrade).toEqual(100);
        });
    });

    it("Should edit gradable item due date succesfully", async () => {
        // const newDate = new Date("2019-12-01");
        const newDate = "2019-12-01";
        const dateObj = new Date(newDate);
        return gradableItemModel.EditDueDate(1, newDate)
        .then((gradableItemDetails: any) => {
            expect(gradableItemDetails.DueDate).toEqual(dateObj);
        });
    });

    it("Should add study time to gradable item succesfully", async () => {
        return gradableItemModel.AddStudyTime(1, 7)
        .then((gradableItemDetails: any) => {
            expect(gradableItemDetails.StudiedTime).toEqual(7);
        });
    });

    it("Should get gradable item details unsuccesfully", async () => {
        return gradableItemModel.GetGradableItemDetails(2)
        .then((gradableItemDetails: any) => {
            expect(gradableItemDetails).toEqual([]);
        });
    });

    // it("Should create a new gradable item unsuccesfully", async () => {
    //     const gradableItemID = startGradableItem.GradableItemID;
    //     return gradableItemModel.CreateItem(startGradableItem)
    //     .then((gradableItemDetails: any) => {
    //         expect(gradableItemDetails).toEqual([]);
    //     });
    // });

    // it("Should get a new ID unsuccesfully", async () => {
    //     return gradableItemModel.GetNewID()
    //     .then((newID: any) => {
    //         expect(gradableItemDetails).toEqual([]);
    //     });
    // });

    it("Should delete a gradable item unsuccesfully", async () => {
        return gradableItemModel.DeleteGradableItem(2)
        .then((gradableItemDetails: any) => {
            expect(gradableItemDetails).toEqual([]);
        });
    });

    it("Should edit course ID unsuccesfully", async () => {
        return gradableItemModel.EditCourseID(2, 3)
        .then((gradableItemDetails: any) => {
            expect(gradableItemDetails).toEqual([]);
        });
    });

    it("Should edit gradable item name unsuccesfully", async () => {
        return gradableItemModel.EditGradableItemName(2, "Assignment2")
        .then((gradableItemDetails: any) => {
            expect(gradableItemDetails).toEqual([]);
        });
    });

    it("Should edit gradable item weight unsuccesfully", async () => {
        return gradableItemModel.EditGradableItemWeight(2, 10)
        .then((gradableItemDetails: any) => {
            expect(gradableItemDetails).toEqual([]);
        });
    });

    it("Should edit gradable item grade unsuccesfully", async () => {
        return gradableItemModel.EditGradableItemGrade(2, 100)
        .then((gradableItemDetails: any) => {
            expect(gradableItemDetails).toEqual([]);
        });
    });

    it("Should edit gradable item due date unsuccesfully", async () => {
        // const newDate = new Date("2019-12-01");
        const newDate = "2019-12-01";
        const dateObj = new Date(newDate);
        return gradableItemModel.EditDueDate(2, newDate)
        .then((gradableItemDetails: any) => {
            expect(gradableItemDetails).toEqual([]);
        });
    });

    it("Should add study time to gradable item unsuccesfully", async () => {
        return gradableItemModel.AddStudyTime(2, 7)
        .then((gradableItemDetails: any) => {
            expect(gradableItemDetails).toEqual([]);
        });
    });

});
