export class BaseModel {
    private tableName: string;

    constructor(tableName: string) {
        this.tableName = tableName;
    }

    public async getAll(query: object = {}, project: object = {}, sort: object = {}) {
        if (this.tableName === "Course") {

        }
    }

    public async getOne(query: object) {
        if (this.tableName === "Course") {
            const courseDetails: ICourse = {
                CourseID: 1,
                StudentID: 1,
                CourseName: "SENG360",
                PerceivedDifficulty: 3,
                CurrentGrade: 76,
                GradeGoal: 80,
                GradableItems: [5, 6, 12],
            };
            return courseDetails;
        }
    }

    public async getCount(query: object = {}) {
        if (this.tableName === "Course") {

        }
    }

    public async getMax(query: object = {}, project: object = {}, sort: object = {}) {
        if (this.tableName === "Course") {
            const courseDetails: ICourse = {
                CourseID: 1,
                StudentID: 1,
                CourseName: "SENG360",
                PerceivedDifficulty: 3,
                CurrentGrade: 76,
                GradeGoal: 80,
                GradableItems: [5, 6, 12],
            };
            return [courseDetails];
        }
    }

    public async getMin(query: object = {}, project: object = {}, sort: object = {}) {
        if (this.tableName === "Course") {

        }
    }

    public async deleteOne(query: object) {
        if (this.tableName === "Course") {
            return query;
        }
    }

    public async deleteMany(query: object) {
        if (this.tableName === "Course") {

        }
    }

    public async editOne(query: object, update: object) {
        if (this.tableName === "Course") {
            const courseDetails: ICourse = {
                CourseID: 1,
                StudentID: 1,
                CourseName: "SENG360",
                PerceivedDifficulty: 3,
                CurrentGrade: 76,
                GradeGoal: 80,
                GradableItems: [5, 6, 12],
            };
            courseDetails.CourseName = "SENG350";
            courseDetails.PerceivedDifficulty = 1;
            courseDetails.CurrentGrade = 50;
            courseDetails.GradeGoal = 70;
            return courseDetails;
        }
    }

    public async addToArray(query: object, field: string, value: number[]) {
        if (this.tableName === "Course") {
            const courseDetails: ICourse = {
                CourseID: 1,
                StudentID: 1,
                CourseName: "SENG360",
                PerceivedDifficulty: 3,
                CurrentGrade: 76,
                GradeGoal: 80,
                GradableItems: [5, 6, 12],
            };
            value.forEach((element) => {
                courseDetails.GradableItems.push(element);
            });
            return courseDetails;
        }
    }

    public async removeFromArray(query: object, field: string, value: number[]) {
        if (this.tableName === "Course") {
            const courseDetails: ICourse = {
                CourseID: 1,
                StudentID: 1,
                CourseName: "SENG360",
                PerceivedDifficulty: 3,
                CurrentGrade: 76,
                GradeGoal: 80,
                GradableItems: [5, 6, 12],
            };
            value.forEach((element) => {
                courseDetails.GradableItems.pop();
            });
            return courseDetails;
        }
    }

    public async editMany(query: object, update: object) {
        if (this.tableName === "Course") {

        }
    }

    public async addOne(query: object) {
        if (this.tableName === "Course") {
            return query;
        }
    }

    public async addMany(query: object[]) {
        if (this.tableName === "Course") {

        }
    }

}
