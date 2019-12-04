import DbClient = require("../DbClient");
import { Algorithm } from "../algorithm/Algorithm";
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
    public DueDate!: Date;
    public Weight!: number;
    public CurrentGrade!: number;
    public GItemAccuracy!: number;
    public StudiedTime!: number;
    public RecommendedTime!: number;

    constructor() {
        super("GradableItem");
    }

    /*
     * Returns all details for a gradable item
     */
    public async GetGradableItemDetails(gradableItemID: number) {
        try {
            return this.getOne({GradableItemID: Number(gradableItemID)});
        } catch (error) {
            console.log(error);
            return [];
        }
    }

    /**
     * Creates a new gradable item
     */
    public async CreateItem(newGradableItem: IGradableItem) {// courseID: number, gradableItemName: string, dueDate= "", weight: number, gItemAccuracy: number) {
        try {
            newGradableItem.GradableItemID = await this.GetNewID();
            const algorithm = new Algorithm;
            algorithm.new_item_calculation_and_update(courseID);
            return this.addOne(newGradableItem);
        } catch (error) {
            console.log(error);
            return [];
        }
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
        try {
            return this.deleteOne({GradableItemID: Number(gradableItemID)});
        } catch (error) {
            console.log(error);
            return [];
        }
    }

    /**
     * Changes the course a gradable item part of
     */
    public async EditCourseID(gradableItemID: number, newID: number) {
        try {
            return this.editOne({GradableItemID: gradableItemID}, {CourseID: newID});
        } catch (error) {
            console.log(error);
            return [];
        }
    }

    /**
     * Edits gradable item name
     */
    public async EditGradableItemName(gradableItemID: number, newName: string) {
        try {
            return this.editOne({GradableItemID: gradableItemID}, {GradableItemName: newName});
        } catch (error) {
            console.log(error);
            return [];
        }
    }

    /**
     * Edits gradable item percent weight
     */
    public async EditGradableItemWeight(gradableItemID: number, newWeight: number) {
        try {
            console.log("Updating weight to " + newWeight);
            return this.editOne({GradableItemID: gradableItemID}, {Weight: newWeight});
        } catch (error) {
            console.log(error);
            return [];
        }
    }

    /**
     * Edits Gradable Item Grade
     */
    public async EditGradableItemGrade(gradableItemID: number, newGrade: number) {
        try {
            return this.editOne({GradableItemID: gradableItemID}, {CurrentGrade: newGrade});
        } catch (error) {
            console.log(error);
            return [];
        }
    }
    /**
     * Edits gradable item due date
     */
    public async EditDueDate(gradableItemID: number, newDueDate: string) {
        try {
            return this.editOne({GradableItemID: gradableItemID}, {DueDate: newDueDate});
        } catch (error) {
            console.log(error);
            return [];
        }
    }

    /**
     * Updates study time for a gradable item
     */
    public async AddStudyTime(gradableItemID: number, newtime: number) {
        try {
            return this.editOne({GradableItemID: gradableItemID}, {StudiedTime: newtime});
        } catch (error) {
            console.log(error);
            return [];
        }
    }

    public async AddRecommendedTime(gradableItemID: number, newtime: number) {
        try {
            return this.editOne({GradableItemID: gradableItemID}, {RecommendedTime: newtime});
        } catch (error) {
            console.log(error);
            return [];
        }
    }
    public async AddGItemAccuracy(gradableItemID: number, accuracy: number) {
        try {
            return this.editOne({GradableItemID: gradableItemID}, {GItemAccuracy: accuracy});
        } catch (error) {
            console.log(error);
            return [];
        }
    }
}
