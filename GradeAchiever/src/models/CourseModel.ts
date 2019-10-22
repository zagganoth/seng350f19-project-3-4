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
    public CreateCourse(userID: Number, courseName: string) {

    }
    public SetDifficulty(courseID: number, difficulty: number) {

    }
    public SetGradeGoal(courseID: number, goal: number) {
        if (goal <= 100) {

        }
    }
    public AddGradableItem(courseID: number, item: GradableItemModel) {

    }
    public GetCourseDetails(courseID: number) {
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
