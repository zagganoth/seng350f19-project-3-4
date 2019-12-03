import { GradableItemModel} from "../models/GradableItemModel";
import { CourseModel }      from "../models/CourseModel";
import { Algorithm }        from "../algorithm/Algorithm";

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
    public async EditGradableItem(id: number, name: string, duedate: Date, hours: number, grade: number) {
        const gradableItemModel = new GradableItemModel();
        try {
            await gradableItemModel.AddStudyTime(Number(id), Number(hours));
            await gradableItemModel.EditDueDate(Number(id), duedate.toString());
            await gradableItemModel.EditGradableItemGrade(Number(id), Number(grade));
            await gradableItemModel.EditGradableItemName(Number(id), name);
        } catch (error) {
            console.log(error);
            return false;
        }
        if (grade !== 0) {
          let gradableItem = await gradableItemModel.GetGradableItemDetails(id);
          const courseID: any = gradableItem.CourseID;
          const hoursRecommended = gradableItem.RecommendedTime;
          const hoursSpent = gradableItem.StudiedTime;
          const courseModel = new CourseModel();
          const gradeGoalCourse = await courseModel.GetCourseDetails( courseID );
          const gradeGoal = gradeGoalCourse.GradeGoal;
          const algorithm = new Algorithm();
          const itemRatio = algorithm.item_completed_calculation(gradeGoal, hoursSpent, hoursRecommended, grade);

        try {
          await gradableItemModel.AddGItemAccuracy(Number(id), Number(itemRatio));
        } catch (error) {
            console.log(error);
            return false;
        }
        const gradableItems = gradeGoalCourse.GradableItems;
        let i = 0;
        let itemRatios = [];
        let percentageWorth = [];
        let percentageAchieved = [];
        for (let val of gradableItems) {
            gradableItem = await gradableItemModel.GetGradableItemDetails(val);
            itemRatios[i] = gradableItem.GItemAccuracy;
            percentageWorth[i] = gradableItem.Weight;
            percentageAchieved[i] = gradableItem.CurrentGrade;
        }
        const courseCalResults = algorithm.course_calculation(itemRatios, percentageWorth, percentageAchieved, gradeGoal)
        const courseRatio = courseCalResults[0];
        const percentageDone = courseCalResults[1];
        const newCourseGoal = courseCalResults[2];
        const courseGrade = courseCalResults[3];
        try {
          await courseModel.EditCurrentGrade(Number(courseID), Number( courseGrade ));
          await courseModel.EditGradeNeeded(Number(courseID), Number( newCourseGoal ));
          await courseModel.EditPercentageDone(Number(courseID), Number( percentageDone ));
          await courseModel.EditCourseRatio(Number(courseID), Number( courseRatio ));
        } catch (error) {
            return false;
        }
        i = 0;
        const difficulty = gradeGoalCourse.PerceivedDifficulty;
        let weight = 0;
        let itemHours = 0;
        let itemID = 0;
        for (let val of gradableItems) {
          gradableItem = await gradableItemModel.GetGradableItemDetails(val);
          weight = gradableItem.Weight;
          if (weight>0) {
            itemHours = algorithm.new_item_calculation(courseRatio, percentageDone, difficulty, newCourseGoal, weight);
            itemID = gradableItem.GradableItemID;
            try {
              await gradableItemModel.AddRecommendedTime(Number(itemID), Number(itemHours));
            }
            catch (error) {
                return false;
            }
          }
        }
      }
        return true;
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
