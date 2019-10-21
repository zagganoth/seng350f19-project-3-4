import { BaseModel } from "./BaseModel";
import { CourseModel } from "./CourseModel";

export class UserModel extends BaseModel {
    private readonly isAdmin : boolean;
    private readonly userID : Number;
    constructor(userID: Number)
    {
        super("User");
        //We can test here the id of the user submitting the request - if it's an admin user we can allow for admin actions
        let isAdmin = false;
        this.isAdmin = isAdmin;

        this.userID = userID;
    }
    public AddUser(userName: string, email: string)
    {
        //Add the user to the database using dbClient
        if(this.isAdmin)
        {

        }
        else
        {
            throw new Error("Invalid admin credentials");
        }

    }
    public RemoveUser(userID: Number)
    {
        if(this.isAdmin)
        {

        }
        else
        {
            throw new Error("Invalid admin credentials");
        }
    }
    public SetAlgorithmAccuracy(algAccuracy: Number)
    {

    }
    public SetNotificationLevel(notificationLevel: Number)
    {

    }
    public SetEmail(email: string)
    {

    }
    public AddCourse(course: CourseModel)
    {

    }
    public RemoveCourse(courseName: string)
    {
        //The course should be uniquely identifiable by the user id and course name
    }
    public GetUserDetails()
    {

    }
    public GetAlgorithmAccuracy()
    {

    }
    public GetCourses()
    {

    }


}