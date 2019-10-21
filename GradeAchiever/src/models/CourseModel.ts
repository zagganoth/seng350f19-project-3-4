import { BaseModel } from "./BaseModel";
import {GradableItemModel} from "./GradableItemModel";

export class CourseModel extends BaseModel {

    constructor()
    {
        super("Course");
    }
    public CreateCourse(userID: Number, courseName: string)
    {

    }
    public SetDifficulty(courseID: Number, difficulty: Number)
    {

    }
    public SetGradeGoal(courseID: Number,goal: Number)
    {
        if(goal <= 100)
        {

        }
    }
    public AddGradableItem(courseID: Number,item: GradableItemModel)
    {

    }
    public GetCourseDetails(courseID: Number)
    {
        //Course name, student, etc
    }
    public GetGradableItems(courseID: Number)
    {
        //List of all gradable items
    }
    public GetGradeGoal(courseID: Number)
    {

    }
    public GetPerceivedDifficulty(courseID: Number)
    {

    }




}
