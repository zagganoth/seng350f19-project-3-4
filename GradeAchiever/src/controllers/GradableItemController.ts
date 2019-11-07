import { NextFunction, Request, Response, Router } from "express";
import { GradableItemModel} from "../models/GradableItemModel";

export class GradableItemController {
    constructor() {

    }

    /*Gets gradable item details by  */
    public async RequestGradableItem(gradableItemID: number) {
        const gradableItemModel = new GradableItemModel();
        console.log("Gradable Item Controller - Request gradable item from id "+gradableItemID);
        try {
            const returnVal = await gradableItemModel.GetGradableItemDetails(gradableItemID);
            console.log("gradable item return: "+returnVal);
            return returnVal;
        } catch (error) {
            console.log(error);
            return [];
        }
    }

   
}
