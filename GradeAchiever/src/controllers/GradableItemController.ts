import { Algorithm } from "../algorithm/Algorithm";
import { CourseModel } from "../models/CourseModel";
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
    public async CreateItem(gradableItem: IGradableItem) {
        try {
            return this.gradableItemModel.CreateItem(gradableItem);
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
          let gradableItem = await this.gradableItemModel.GetGradableItemDetails(id);
          const courseID: any = gradableItem.CourseID;
          const hoursRecommended = gradableItem.RecommendedTime;
          const hoursSpent = gradableItem.StudiedTime;
          const courseModel = new CourseModel();
          const gradeGoalCourse = await courseModel.GetCourseDetails( courseID );
          const gradeGoal = gradeGoalCourse.GradeGoal;
          const algorithm = new Algorithm();
          const itemRatio = algorithm.item_completed_calculation(gradeGoal, hoursSpent, hoursRecommended, grade);
          try {
          await this.gradableItemModel.AddGItemAccuracy(Number(id), Number(itemRatio));
        } catch (error) {
            console.log(error);
            return false;
        }
          const gradableItems = gradeGoalCourse.GradableItems;
          const i = 0;
          const itemRatios = [];
          const percentageWorth = [];
          const percentageAchieved = [];
          for (const val of gradableItems) {
            gradableItem = await this.gradableItemModel.GetGradableItemDetails(val);
            itemRatios[i] = gradableItem.GItemAccuracy;
            percentageWorth[i] = gradableItem.Weight;
            percentageAchieved[i] = gradableItem.CurrentGrade;
        }
    }
    }
    public async EditGradableItemWeight(id: number, weight: number) {
        try {
            return this.gradableItemModel.EditGradableItemWeight(id, weight);
        } catch (error) {
            return false;
        }
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
     public async editGradableItemName(gradableItemID: number, newName: string) {
        return this.gradableItemModel.EditGradableItemName(Number(gradableItemID), String(newName));
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
        const totalTime: number = Number(prevtime) + Number(newtime);
        return this.gradableItemModel.AddStudyTime(Number(gradableItemID), totalTime);
    }

    public async deleteGradableItem(gradableItemID: number) {
        return this.gradableItemModel.DeleteGradableItem(gradableItemID);
    }
}
