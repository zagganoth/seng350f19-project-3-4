import { GradableItemModel} from "../models/GradableItemModel";

export class GradableItemController {
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
    public async CreateItem(courseID: number, name: string, duedate: string, weight: number, gItemAccuracy: number) {
        const gradableItemModel = new GradableItemModel();
        try {
            const returnVal = await gradableItemModel.CreateItem(courseID, name, duedate, weight, gItemAccuracy);
            return returnVal;
        } catch (error) {
            console.log(error);
            return [];
        }
    }
    public async EditGradableItem(id: number,name:string,duedate: Date, hours: number, grade: number)
    {
        const gradableItemModel = new GradableItemModel();
        try {
            await gradableItemModel.AddStudyTime(Number(id),Number(hours));
            await gradableItemModel.EditDueDate(Number(id),duedate.toString());
            await gradableItemModel.EditGradableItemGrade(Number(id),Number(grade));
            await gradableItemModel.EditGradableItemName(Number(id),name);
            return true;
        }catch(error)
        {
            return false;
        }

    }
     /* Edits gradable item's name*/
     public async editGradableItemName(gradableItemID: number, newName: string) {
        const gradableItemModel = new GradableItemModel();
        const returnVal = await gradableItemModel.EditGradableItemName(Number(gradableItemID), String(newName));
        return returnVal;
    }

    /* Adds study time to a gradable item*/
    public async LogStudyTime(gradableItemID: number, prevtime: number, newtime: number) {
        const gradableItemModel = new GradableItemModel();
        const totalTime: number = Number(prevtime) + Number(newtime);
        const returnVal = await gradableItemModel.AddStudyTime(Number(gradableItemID), totalTime);
        return returnVal;
    }

}
