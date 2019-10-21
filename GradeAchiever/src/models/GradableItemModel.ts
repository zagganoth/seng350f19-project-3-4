import { BaseModel } from "./BaseModel";

export class GradableItemModel extends BaseModel {

    /*
        Gradable Item Model Fields:
        		○ GradableItemID (auto-generated,auto-increment,int)
                ○ CourseID
                ○ GradableItemName (string)
                ○ DueDate (Date)
                ○ Weight (float? Int?) (Constraint: Item weights must add to 100)
                GItemAlgorithmAccuracy (float?)
     */
    constructor()
    {
        super("GradableItem");
    }
    public SetDate(gradableItemID: Number,date: string)
    {
        //ensure this is a valid date first
    }
    public SetWeight(gradableItemID: Number, weight: Number)
    {
        //ensure that sum of all weights for a course is 100
    }
    public SetAlgAccuracy(gradableItemID: Number, accuracy: Number)
    {
        //Ensure between 0.5-2
    }
    public GetGradableItemDetails(gradableItemID: Number)
    {
        //Returns gradableItem name, id, course id, due date, weight
    }
    public GetAlgorithmAccuracy(gradableItemID: Number)
    {

    }


}
