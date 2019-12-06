
import { BaseModel } from "../../models/BaseModel";
import { CourseModel } from "../../models/CourseModel";

jest.mock("../../models/BaseModel");

describe("Course Model Tests", () => {
    const courseModel = new CourseModel();
    let startCourse: ICourse;

    beforeEach(() => {
        startCourse = {
            CourseID: 1,
            StudentID: 1,
            CourseName: "SENG360",
            PerceivedDifficulty: 3,
            CurrentGrade: 76,
            GradeGoal: 80,
            GradableItems: [5, 6, 12],
        };
    });

    it("Should get all course details succesfully", async () => {
        return courseModel.GetCourseDetails(1)
        .then((courseDetails: any) => {
            expect(courseDetails).toEqual(startCourse);
        });
    });

    it("Should create a new course succesfully", async () => {
        const courseID = startCourse.CourseID;
        return courseModel.CreateNewCourse(startCourse)
        .then((courseDetails: any) => {
            expect(courseDetails.CourseID).toBeGreaterThan(courseID);
        });
    });

    it("Should get a new ID succesfully", async () => {
        return courseModel.GetNewID()
        .then((newID: any) => {
            expect(newID).toBeGreaterThan(startCourse.CourseID);
        });
    });

    it("Should delete a course succesfully", async () => {
        return courseModel.DeleteCourse(1)
        .then((courseDetails: any) => {
            expect(courseDetails.CourseID).toEqual(startCourse.CourseID);
        });
    });

    it("Should add gradable items succesfully", async () => {
        return courseModel.AddGradableItems(1, [1, 2])
        .then((courseDetails: any) => {
            expect(courseDetails.GradableItems).toEqual([5, 6, 12, 1, 2]);
        });
    });

    it("Should delete gradable items succesfully", async () => {
        return courseModel.DeleteGradableItems(1, [6, 12])
        .then((courseDetails: any) => {
            expect(courseDetails.GradableItems).toEqual([5]);
        });
    });

    it("Should edit course name succesfully", async () => {
        return courseModel.EditCourseName(1, "SENG350")
        .then((courseDetails: any) => {
            expect(courseDetails.CourseName).toEqual("SENG350");
        });
    });

    it("Should edit course percieved difficulty succesfully", async () => {
        return courseModel.EditPercievedDifficulty(1, 1)
        .then((courseDetails: any) => {
            expect(courseDetails.PerceivedDifficulty).toEqual(1);
        });
    });

    it("Should edit current grade succesfully", async () => {
        return courseModel.EditCurrentGrade(1, 50)
        .then((courseDetails: any) => {
            expect(courseDetails.CurrentGrade).toEqual(50);
        });
    });

    it("Should edit grade goal succesfully", async () => {
        return courseModel.EditGradeGoal(1, 70)
        .then((courseDetails: any) => {
            expect(courseDetails.GradeGoal).toEqual(70);
        });
    });

    it("Should get all course details unsuccesfully", async () => {
        return courseModel.GetCourseDetails(2)
        .then((courseDetails: any) => {
            expect(courseDetails).toEqual([]);
        });
    });

    it("Should delete a course unsuccesfully", async () => {
        return courseModel.DeleteCourse(2)
        .then((courseDetails: any) => {
            expect(courseDetails).toEqual([]);
        });
    });

    it("Should add gradable items unsuccesfully", async () => {
        return courseModel.AddGradableItems(2, [1, 2])
        .then((courseDetails: any) => {
            expect(courseDetails).toEqual([]);
        });
    });

    it("Should delete gradable items unsuccesfully", async () => {
        return courseModel.DeleteGradableItems(2, [6, 12])
        .then((courseDetails: any) => {
            expect(courseDetails).toEqual([]);
        });
    });

    it("Should edit course name unsuccesfully", async () => {
        return courseModel.EditCourseName(2, "SENG350")
        .then((courseDetails: any) => {
            expect(courseDetails).toEqual([]);
        });
    });

    it("Should edit course percieved difficulty unsuccesfully", async () => {
        return courseModel.EditPercievedDifficulty(2, 1)
        .then((courseDetails: any) => {
            expect(courseDetails).toEqual([]);
        });
    });

    it("Should edit current grade unsuccesfully", async () => {
        return courseModel.EditCurrentGrade(2, 50)
        .then((courseDetails: any) => {
            expect(courseDetails).toEqual([]);
        });
    });

    it("Should edit grade goal unsuccesfully", async () => {
        return courseModel.EditGradeGoal(2, 70)
        .then((courseDetails: any) => {
            expect(courseDetails).toEqual([]);
        });
    });

});
