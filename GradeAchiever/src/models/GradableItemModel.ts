import DbClient = require("../DbClient");
import { BaseModel } from "./BaseModel";
export class GradableItemModel extends BaseModel {

    /*
        Gradable Item Model Fields:
        		○ GradableItemID (auto-generated,auto-increment,int)
                ○ CourseID
                ○ GradableItemName (string)
                ○ DueDate (Date)
                ○ Weight (float? Int?) (Constraint: Item weights must add to 100)
                ○ GItemAlgorithmAccuracy (float?)
     */
    public GradableItemID! : number;
    public CourseID! : number;
    public GradableItemName! : string;
    public DueDate! : string;
    public Weight! : number;
    public GItemAccuracy! : number;

    constructor() {
        super("GradableItem");
    }

    public async GetGradableItemDetails(gradableItemID: number): Promise<GradableItemModel> {
        // Returns all details for a gradableItem
        return await this.getOne({GradableItemID: gradableItemID});
    }

}
