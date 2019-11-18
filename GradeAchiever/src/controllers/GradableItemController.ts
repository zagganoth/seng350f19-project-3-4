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

}
