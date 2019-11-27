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
    public GradableItemID!: number;
    public CourseID!: number;
    public GradableItemName!: string;
    public DueDate!: string;
    public Weight!: number;
    public GItemAccuracy!: number;

    constructor() {
        super("GradableItem");
    }

    /*
     * Returns all details for a gradable item
     */
    public async GetGradableItemDetails(gradableItemID: number): Promise<GradableItemModel> {
        return this.getOne({GradableItemID: Number(gradableItemID)});
    }

    /**
     * Creates a new gradable item
     */
    public async CreateItem(courseID: number, gradableItemName: string, dueDate= "", weight: number, gItemAccuracy: number) {
        const newGradableItem = {
            GradableItemID: await this.GetNewID(),
            CourseID: courseID,
            GradableItemName: gradableItemName,
            DueDate: dueDate,
            Weight: weight,
            GItemAccuracy: gItemAccuracy,
        };

        console.log("Gradable Item Model - adding an item");
        console.log(newGradableItem);
        return this.addOne(newGradableItem)
        .catch((error) => {
            console.log(error);
            return [];
        });
    }

    // Gets next new gradable item ID
    public async GetNewID() {
        try {
            console.log("Gradable Item Model - getting new item ID");
            const maxRow = await this.getMax({}, {}, {GradableItemID: -1});
            return maxRow[0].GradableItemID + 1;
        } catch (error) {
            console.log(error);
            console.log("error from getMax");
            // This should only ever happen because there is no old course ids, therefore the first id should be 1
            return 1;
        }
    }

    /**
     * Deletes a gradable item
     */
    public async DeleteGradableItem(gradableItemID: number) {
        return this.deleteOne({GradableItemID: gradableItemID})
        .catch ((error) => {
            console.log(error);
            return [];
        });
    }

    /**
     * Changes the course a gradable item part of
     */
    public async EditCourseID(gradableItemID: number, newID: number) {
        return this.editOne({GradableItemID: gradableItemID}, {CourseID: newID})
        .catch((error) => {
            console.log(error);
            return [];
        });
    }

    /**
     * Edits gradable item name
     */
    public async EditGradableItemName(gradableItemID: number, newName: string) {
        return this.editOne({GradableItemID: gradableItemID}, {GradableItemName: newName})
        .catch ((error) => {
            console.log(error);
            return [];
        });
    }

    /**
     * Edits gradable item percent weight
     */
    public async EditGradableItemWeight(gradableItemID: number, newWeight: number) {
        return this.editOne({GradableItemID: gradableItemID}, {Weight: newWeight})
        .catch ((error) => {
            console.log(error);
            return [];
        });
    }

    /**
     * Edits gradable item due date
     */
    public async EditDueDate(gradableItemID: number, newDueDate: string) {
        return this.editOne({GradableItemID: gradableItemID}, {DueDate: newDueDate})
        .catch ((error) => {
            console.log(error);
            return [];
        });
    }

    /**
     * Updates study time for a gradable item
     */
    public async AddStudyTime(gradableItemID: number, newtime: number) {
        return this.editOne({GradableItemID: gradableItemID}, {StudiedTime: newtime})
        .catch ((error) => {
            console.log(error);
            return [];
        });
    }

}
