import { NextFunction, Request, Response} from "express";
import { CourseController } from "../../controllers/CourseController";

jest.mock("../../models/CourseModel");
jest.mock("../../models/GradableItemModel");
jest.mock("../../models/UserModel");

describe("Course Controller Tests", () => {
    const controller = new CourseController();
    // const req = {} as Request;
    // const res = {} as Response;
    // const next = {} as NextFunction;
    // beforeEach(() => {
    //     controller = new CourseController();
    // });

    it("Gets a course by id", async () => {
        const courseID = 1;
        controller.RequestCourse(courseID)
        .then((courseDetails: any) => {
            expect(courseDetails.CourseID).toEqual(courseID);
        });
    });

    it("Gets a course by id that does not exist", async () => {
        const courseID = 0;
        controller.RequestCourse(courseID)
        .then((resp: any) => {
            expect(resp.length).toEqual(0);
        });
    });

    it("Edits a course grade goal", async () => {
        const courseID = 1;
        const newGoal = 93;
        controller.editCourseGradeGoal(courseID, newGoal)
        .then((resp: any) => {
            expect(resp.matchedCount).toEqual(1);
        });
    });

    it("Edits a course grade goal that does not exist", async () => {
        const courseID = 0;
        const newGoal = 93;
        controller.editCourseGradeGoal(courseID, newGoal)
        .then((resp: any) => {
            expect(resp.matchedCount).toEqual(0);
        });
    });

    it("Gets a course's gradable items", async () => {
        const courseID = 1;
        controller.RequestCourseGradableItems(courseID)
        .then((gradableItems: any) => {
            expect(gradableItems.length).toEqual(2);
        });
    });

    it("Creates a gradable item", async () => {
        /*const courseID = 1;
        const name = "Assignment 5";
        const duedate = "2019-11-21";
        const weight = 10;*/
        const g: IGradableItem = {
            CourseID: 1,
            CurrentGrade: 0,
            DueDate: new Date("2019-11-21"),
            GItemAccuracy: 0,
            GradableItemID: 0,
            GradableItemName: "Assignment 5",
            StudiedTime: 0,
            Weight: 10,
            RecommendedTime: 10,
        };
        controller.CreateGradableItem(g)
        .then((returnVal: any) => {
            // Changed returnVal to be the id of the new gradable item - returns -1 if failed, >0 if passed
            expect(returnVal).toBeGreaterThan(0);
        });
    });

    it("Attempts to create a gradable item for a course that does not exist", async () => {
        const courseID = 0;
        const name = "Assignment 5";
        const duedate = new Date("2019-11-21");
        const weight = 10;
        const g: IGradableItem = {
            CourseID: courseID,
            CurrentGrade: 0,
            DueDate: duedate,
            GItemAccuracy: 0,
            GradableItemID: 0,
            GradableItemName: name,
            StudiedTime: 0,
            Weight: weight,
            RecommendedTime: 10,
        };
        controller.CreateGradableItem(g)
        .then((returnVal: any) => {
            expect(returnVal).toEqual( -1);
        });
    });

    it("Creates multiple gradable items", async () => {
        const course: ICourse = {
            GradableItems: [{
                name: "Test Assn",
                duedate: "2019-09-09",
                weight: 10,
            }, {
                name: "Test Assn 2",
                duedate: "2019-09-20",
                weight: 10,
            }],
            StudentID: 1,
            CourseID: 1,
            CourseName: "Test Course",
            PerceivedDifficulty: 2,
            CurrentGrade: 100,
            GradeGoal: 82,
        };
        controller.createGradableItems(course)
        .then((resp: any) => {
            expect(resp.matchedCount).toEqual(1);
        });
    });

    it("Edits a course's name", async () => {
        const courseID = 1;
        const newName = "NewName";
        controller.editCourseName(courseID, newName)
        .then((resp: any) => {
            expect(resp.matchedCount).toEqual(1);
        });
    });

    it("Edits a course's perceived difficulty", async () => {
        const courseID = 1;
        const newDiff = 4;
        controller.editCourseGradeGoal(courseID, newDiff)
        .then((resp: any) => {
            expect(resp.matchedCount).toEqual(1);
        });
    });

    it("Edits a gradable item", async () => {
        const gitem: IGradableItem = {
            GradableItemID: 1,
            GradableItemName: "Name",
            GItemAccuracy: 0.7,
            CourseID: 1,
            DueDate: new Date("2019-09-09"),
            Weight: 15,
            CurrentGrade: 80,
            StudiedTime: 2,
            RecommendedTime: 10
        };
        controller.EditGradableItem(gitem)
        .then((resp: any) => {
            expect(resp.matchedCount).toEqual(1);
        });
    });

    it("Adds study time to a gradable item", async () => {
        const gradableItemID = 1;
        const prevtime = 2;
        const newtime = 4;
        controller.addStudyTime(gradableItemID, prevtime, newtime)
        .then((resp: any) => {
            expect(resp.matchedCount).toEqual(1);
        });
    });

    it("Deletes a gradable item", async () => {
        const courseID = 1;
        const gradableItemID = 1;
        controller.deleteGradableItem(courseID, gradableItemID)
        .then((resp: any) => {
            expect(resp.matchedCount).toEqual(1);
        });
    });

    it("Creates a course", async () => {
        const courseDetails = {
            name: "New Course",
            gradegoal: 88,
            perceivedDiff: 4,
            user: 1,
            GradableItems: [{
                name: "Test Assn",
                duedate: "2019-09-09",
                weight: 10,
            }, {
                name: "Test Assn 2",
                duedate: "2019-09-20",
                weight: 10,
            }],
        };
        controller.createCourse(courseDetails)
        .then((resp: any) => {
            expect(resp.insertedCount).toEqual(1);
        });
    });

});
