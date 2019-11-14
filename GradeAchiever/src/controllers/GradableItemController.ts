import { NextFunction, Request, Response, Router } from "express";
import { GradableItemModel} from "../models/GradableItemModel";

export class GradableItemController {
    constructor() {

    }

    /*Gets gradable item details by  */
    public async RequestGradableItem(gradableItemID: number) {
        const gradableItemModel = new GradableItemModel();
        console.log("Gradable Item Controller - Request gradable item from id " + gradableItemID);
        try {
            const returnVal = await gradableItemModel.GetGradableItemDetails(gradableItemID);
            console.log("gradable item return: " + returnVal);
            return returnVal;
        } catch (error) {
            console.log(error);
            return [];
        }
    }

    /*Creates gradable item*/
    public async CreateItem(courseID: number, name: string, duedate: string, weight: number, gItemAccuracy: number) {
        const gradableItemModel = new GradableItemModel();
        console.log("Gradable Item Controller - create item");
        try {
            const returnVal = await gradableItemModel.CreateItem(courseID, name, duedate, weight, gItemAccuracy);
            console.log("gradable item return: " + returnVal);
            return returnVal;
        } catch (error) {
            console.log(error);
            return [];
        }
    }

}
