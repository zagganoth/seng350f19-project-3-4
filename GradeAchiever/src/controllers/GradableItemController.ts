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
    public async CreateItem(courseID: number, name: string, duedate: string, weight: number) {
        const gradableItemModel = new GradableItemModel();
        let newID: any = await gradableItemModel.GetNewID();
        newID = Number(newID[0].GradableItemID) + 1;
        console.log("Gradable Item Controller - create item");
        const newItem: object = {
            GradableItemID: newID,
            CourseID: courseID,
            GradableItemName: name,
            DueDate: duedate,
            Weight: weight,
        };
        try {
            const returnVal = await gradableItemModel.CreateItem(newItem);
            console.log("gradable item return: " + returnVal);
            return returnVal;
        } catch (error) {
            console.log(error);
            return [];
        }
    }

}
