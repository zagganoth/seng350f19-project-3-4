import { Algorithm } from "../algorithm/Algorithm";
import { CourseModel } from "../models/CourseModel";
import { GradableItemModel} from "../models/GradableItemModel";

export class GradableItemController {

    private gradableItemModel = new GradableItemModel();

    constructor() {

    }

    /*Gets gradable item details by  */
    public async RequestGradableItem(gradableItemID: number) {
        const gradableItemModel = new GradableItemModel();
        try {
            const returnVal = await gradableItemModel.GetGradableItemDetails(gradableItemID);
            return returnVal;
        } catch (error) {
            console.log(error);
            return [];
        }
    }

    /*Creates gradable item*/
    public async CreateItem(gradableItem: IGradableItem) {
        try {
            return this.gradableItemModel.CreateItem(gradableItem);
        } catch (error) {
            console.log(error);
            return [];
        }
    }

    /*
    This one... currently it goes and just sets the field to the new value, probably needs to grab the current value and sum it and then putit in.
    there's also the function below which takes in two integer values...
    */
    public async EditStudyTime(id: number, hours: number) {
        try {
            return this.gradableItemModel.AddStudyTime(id, hours);
        } catch (error) {
            console.log(error);
            return [];
        }
    }

    public async EditDueDate(id: number, dueDate: Date) {
        try {
            return this.gradableItemModel.EditDueDate(id, dueDate.toString());
        } catch (error) {
            console.log(error);
            return [];
        }
    }

    public async EditItemGrade(id: number, grade: number) {
        try {
            return this.gradableItemModel.EditGradableItemGrade(id, grade);
        } catch (error) {
            console.log(error);
            return [];
        }
    }
    public async EditGradableItemWeight(id: number, weight: number) {
        try {
            return this.gradableItemModel.EditGradableItemWeight(id, weight);
        } catch (error) {
            console.log(error);
            return false;
        }
      }
      return true;
    }

    public async EditItemName(id: number, name: string) {
        try {
            return this.gradableItemModel.EditGradableItemName(id, name);
        } catch (error) {
            console.log(error);
            return [];

          }
    }
     /* Edits gradable item's name*/
     public async EditGradableItemName(gradableItemID: number, newName: string) {
        const gradableItemModel = new GradableItemModel();
        const returnVal = await gradableItemModel.EditGradableItemName(Number(gradableItemID), String(newName));
        return returnVal;
    }

        // if (grade !== 0) {
        //   const algorithm = new Algorithm();
        //   const courseID = algorithm.item_completed_calculation_and_update(id);
        //   algorithm.course_calculation_and_update(courseID);
        //   algorithm.new_item_calculation_and_update(courseID);
        // }
        // return true;

    /* Adds study time to a gradable item*/
    public async LogStudyTime(gradableItemID: number, prevtime: number, newtime: number) {
        const gradableItemModel = new GradableItemModel();
        const totalTime: number = Number(prevtime) + Number(newtime);
        return this.gradableItemModel.AddStudyTime(Number(gradableItemID), totalTime);
    }

    public async deleteGradableItem(gradableItemID: number) {
        return this.gradableItemModel.DeleteGradableItem(gradableItemID);
    }
}
