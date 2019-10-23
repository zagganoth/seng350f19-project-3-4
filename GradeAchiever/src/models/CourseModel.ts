import { BaseModel } from "./BaseModel";
import {GradableItemModel} from "./GradableItemModel";
import DbClient = require("../DbClient");
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
    async GetCourseDetails(courseID: Number)
    {
        return await DbClient.connect()
        .then((db)=>{
            return db!.collection(this.tableName).find({"CourseID":courseID}).toArray();
        })
        .catch((err) => {
            console.log(err.message);
            return [];
        })
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
