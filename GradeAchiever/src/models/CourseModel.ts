import DbClient = require("../DbClient");
import { BaseModel } from "./BaseModel";
import {GradableItemModel} from "./GradableItemModel";
export class CourseModel extends BaseModel {

    /*
        Course Model Fields:
            ○ CourseID (auto-generated, auto-increment, int)
            ○ StudentID (string)
            ○ CourseName (string)
            ○ PerceivedDifficulty (Float)
            ○ GradeGoal (int: 0 - 100)
            ○ GradableItems[]
            (Removed) CourseAlgorithmAccuracy (float: 0.5f - 2f)
     */
    constructor() {
        super("Course");
    }
    public CreateCourse(userID: number, courseName: string) {

    }
    public SetDifficulty(courseID: number, difficulty: number) {

    }
    public SetGradeGoal(courseID: number, goal: number) {
        if (goal <= 100) {

        }
    }
    public AddGradableItem(courseID: number, item: GradableItemModel) {

    }
    public async GetCourseDetails(courseID: number) {
        return await DbClient.connect()
        .then((db) => {
            return db!.collection(this.tableName).find({CourseID: courseID}).toArray();
        })
        .catch((err) => {
            console.log(err.message);
            return [];
        });
        // Course name, student, etc
    }
    public GetGradableItems(courseID: number) {
        // List of all gradable items
    }
    public GetGradeGoal(courseID: number) {

    }
    public GetPerceivedDifficulty(courseID: number) {

    }

}
