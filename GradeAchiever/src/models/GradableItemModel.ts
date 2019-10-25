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
    constructor() {
        super("GradableItem");
    }
    public async GetGradableItemDetails(gradableItemID: number): Promise<any> {
        // Returns all details for a gradableItem
        return await this.getOne({GradableItemID: gradableItemID});
    }

}
