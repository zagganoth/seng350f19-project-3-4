import { Algorithm } from "../algorithm/Algorithm";
import { GradableItemModel} from "../models/GradableItemModel";

export class GradableItemController {

    private gradableItemModel = new GradableItemModel();

    constructor() {

    }

    /*Gets gradable item details by  */
    public async RequestGradableItem(gradableItemID: number) {
        try {
            const returnVal = await this.gradableItemModel.GetGradableItemDetails(gradableItemID);
            return returnVal;
        } catch (error) {
            console.log(error);
            return [];
        }
    }

    /*Creates gradable item*/
    public async CreateItem(courseID: number, name: string, duedate: string, weight: number, gItemAccuracy: number) {
        try {
            const returnVal = await this.gradableItemModel.CreateItem(courseID, name, duedate, weight, gItemAccuracy);
            return returnVal;
        } catch (error) {
            console.log(error);
            return [];
        }
    }
    public async EditGradableItem(id: number, name: string, duedate: Date, hours: number, grade: number) {
        try {
            await this.gradableItemModel.AddStudyTime(Number(id), Number(hours));
            await this.gradableItemModel.EditDueDate(Number(id), duedate.toString());
            await this.gradableItemModel.EditGradableItemGrade(Number(id), Number(grade));
            await this.gradableItemModel.EditGradableItemName(Number(id), name);
        } catch (error) {
            console.log(error);
            return false;
        }
        if (grade !== 0) {
          const algorithm = new Algorithm();
          const courseID = algorithm.item_completed_calculation_and_update(id);
          algorithm.course_calculation_and_update(courseID);
          algorithm.new_item_calculation_and_update(courseID);
        }
        return true;
      }
     /* Edits gradable item's name*/
     public async editGradableItemName(gradableItemID: number, newName: string) {
        return this.gradableItemModel.EditGradableItemName(Number(gradableItemID), String(newName));
    }

    /* Adds study time to a gradable item*/
    public async LogStudyTime(gradableItemID: number, prevtime: number, newtime: number) {
        const totalTime: number = Number(prevtime) + Number(newtime);
        return this.gradableItemModel.AddStudyTime(Number(gradableItemID), totalTime);
    }

    public async deleteGradableItem(gradableItemID: number){
        return this.gradableItemModel.DeleteGradableItem(gradableItemID);
    }

}
