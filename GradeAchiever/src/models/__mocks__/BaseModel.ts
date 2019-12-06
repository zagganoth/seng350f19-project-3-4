export class BaseModel {
    private readonly tableName: string;
    private users = [];
    constructor(tableName: string) {
        this.tableName = tableName;
    }

    public async getAll(query: object = {}, project: object = {}, sort: object = {}): Promise<any> {
        if (this.tableName === "Course") {

        } else if (this.tableName === "User") {
            return [{Test: true}];
        }
    }

    public async getOne(query: object): Promise<any> {
        const query2 = query as any;
        if (this.tableName === "Course") {
            if (query2.CourseID === 2) {
                throw new Error("Something went wrong");
            }
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
        } else if (this.tableName === "GradableItem") {
            if (query2.GradableItemID === 2) {
                throw new Error("Something went wrong");
            }
            const gradableItemDetails: IGradableItem = {
                GradableItemID: 1,
                CourseID: 1,
                GradableItemName: "Assignment1",
                DueDate: new Date("2019-01-01"),
                Weight: 5,
                CurrentGrade: 0,
                GItemAccuracy: 0,
                StudiedTime: 0,
            };
            return gradableItemDetails;
        } else if (this.tableName === "User") {
            if (query2.StudentID === 2) {
                throw new Error("Something went wrong");
            }
            const user: IStudent = {
                AlgorithmAccuracy: 0,
                Courses: [],
                Email: "",
                IsAdmin: false,
                NotificationLevel: 0,
                StudentID: 0,
                StudentName: "Test",
            };
            return user;
        }
    }

    public async getCount(query: object = {}): Promise<any> {
        if (this.tableName === "Course") {

        }
    }

    public async getMax(query: object = {}, project: object = {}, sort: object = {}): Promise<any> {
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
        } else if (this.tableName === "GradableItem") {
            const gradableItemDetails: IGradableItem = {
                GradableItemID: 1,
                CourseID: 1,
                GradableItemName: "Assignment1",
                DueDate: new Date("2019-01-01"),
                Weight: 5,
                CurrentGrade: 0,
                GItemAccuracy: 0,
                StudiedTime: 0,
            };
            return [gradableItemDetails];
        }
        if (this.tableName === "User") {
            return 1;
        }
    }

    public async getMin(query: object = {}, project: object = {}, sort: object = {}): Promise<any> {
        if (this.tableName === "Course") {

        }
    }

    public async deleteOne(query: object): Promise<any> {
        const q2 = query as any;
        if (this.tableName === "Course") {
            if (q2.CourseID === 2) {
                throw new Error("something went wrong");
            }
            return query;
        } else if (this.tableName === "GradableItem") {
            if (q2.GradableItemID === 2) {
                throw new Error("something went wrong");
            }
            return query;
        } else if (this.tableName === "User") {
            if (q2.StudentID === 2) {
                throw new Error("something went wrong");
            }
            return query;
        }
    }

    public async deleteMany(query: object): Promise<any> {
        if (this.tableName === "Course") {

        }
    }

    public async editOne(query: object, update: object): Promise<any> {
        const query2 = query as any;
        if (this.tableName === "Course") {
            if (query2.CourseID === 2) {
                throw new Error("Something went wrong");
            }
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
        } else if (this.tableName === "GradableItem") {
            if (query2.GradableItemID === 2) {
                throw new Error("Something went wrong");
            }
            const gradableItemDetails: IGradableItem = {
                GradableItemID: 1,
                CourseID: 1,
                GradableItemName: "Assignment1",
                DueDate: new Date("2019-01-01"),
                Weight: 5,
                CurrentGrade: 0,
                GItemAccuracy: 0,
                StudiedTime: 0,
            };
            gradableItemDetails.CourseID = 2;
            gradableItemDetails.GradableItemName = "Assignment2";
            gradableItemDetails.Weight = 10;
            gradableItemDetails.CurrentGrade = 100;
            gradableItemDetails.DueDate = new Date("2019-12-01");
            gradableItemDetails.StudiedTime = 7;
            return gradableItemDetails;
        } else if (this.tableName === "User") {
            if (query2.StudentID === 2) {
                throw new Error("Something went wrong");
            }
            query2.StudentName = update;
            query2.AlgorithmAccuracy = update;
            query2.NotificationSettings = update;
            return query2;
        }
    }

    public async addToArray(query: object, field: string, value: number[]): Promise<any> {
        const query2 = query as any;
        if (this.tableName === "Course") {
            if (query2.CourseID === 2) {
                throw new Error("Something went wrong");
            }
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
        } else if (this.tableName === "User") {
            if (query2.StudentID === 2) {
                throw new Error("Something went wrong");
            }
            const user: IStudent = {
                AlgorithmAccuracy: 0,
                Courses: value,
                Email: "",
                IsAdmin: false,
                NotificationLevel: 0,
                StudentID: 0,
                StudentName: "",
            };
            return user;
        }
    }

    public async removeFromArray(query: object, field: string, value: number[]): Promise<any> {
        const query2 = query as any;
        if (this.tableName === "Course") {
            if (query2.CourseID === 2) {
                throw new Error("Something went wrong");
            }
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
        if (this.tableName === "User") {
            if (query2.StudentID === 2) {
                throw new Error("Something went wrong");
            }
            const user: IStudent = {
                AlgorithmAccuracy: 0,
                Courses: [3, 1, 2],
                Email: "",
                IsAdmin: false,
                NotificationLevel: 0,
                StudentID: 0,
                StudentName: "",
            };
            value.forEach((element) => {
                user.Courses.pop();
            });
            return user;
        }
    }

    public async editMany(query: object, update: object): Promise<any> {
        if (this.tableName === "Course") {

        }
    }

    public async addOne(query: object): Promise<any> {
        const q2 = query as any;
        if (this.tableName === "Course") {
            if (q2.CourseID > 2) {
                throw new Error("Something went wrong");
            }
            return query;
        } else if (this.tableName === "GradableItem") {
            if (q2.GradableItemID > 2) {
                throw new Error("Something went wrong");
            }
            return query;
        } else if (this.tableName === "User") {
            if (q2.StudentID === 2) {
                throw new Error("Something went wrong");
            }
            return query;
        }
    }

    public async addMany(query: object[]): Promise<any> {
        if (this.tableName === "Course") {

        }
    }

}
