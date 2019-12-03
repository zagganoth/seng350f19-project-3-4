import { CourseModel } from "../models/CourseModel";
import { GradableItemModel} from "../models/GradableItemModel";

export class Algorithm {
/*
This function gives a value for the item, used to calculate how well the user is doing in their current course.
*/
  public item_completed_calculation_and_update(id: number){
    try {
    let gradableItem = await gradableItemModel.GetGradableItemDetails(id);
    const courseID: any = gradableItem.CourseID;
    const grade = gradableItem.CurrentGrade;
    const hoursRecommended = gradableItem.RecommendedTime;
    const hoursSpent = gradableItem.StudiedTime;
    const courseModel = new CourseModel();
    const gradeGoalCourse = await courseModel.GetCourseDetails( courseID );
    const gradeGoal = gradeGoalCourse.GradeGoal;
    const algorithm = new Algorithm();
    const itemRatio = algorithm.item_completed_calculation(gradeGoal, hoursSpent, hoursRecommended, grade);
      await gradableItemModel.AddGItemAccuracy(Number(id), Number(itemRatio));
    } catch (error) {
        console.log(error);
        return false;
      }
      return courseID;
  }

  public item_completed_calculation(percentageReccomended: number, hoursSpent: number, hoursRecommended: number, percentageAchieved: number) {
    const percentageRatio = percentageReccomended / percentageAchieved;
    const hoursRatio = hoursSpent / hoursRecommended;
    const itemRatio = percentageRatio * hoursRatio;
    return itemRatio;
  }

/*
This function calculates how well the user is doing in the course in multiple ways.
This is used to calculated how much time the user needs to spend on their project.
*/
  public course_calculation_and_update(courseID: number) {
    const algorithm = new Algorithm();
    const courseModel = await new CourseModel();
    let course = courseModel.GetCourseDetails(courseID);
    const gradableItems = course.GradableItems;
    let i = 0;
    let itemRatios = [];
    let percentageWorth = [];
    let percentageAchieved = [];
    for (let val of gradableItems) {
      gradableItem = await gradableItemModel.GetGradableItemDetails(val);
      if(gradableItem.CurrentGrade != 0){
        itemRatios[i] = gradableItem.GItemAccuracy;
        percentageWorth[i] = gradableItem.Weight;
        percentageAchieved[i] = gradableItem.CurrentGrade;
        i++;
      }
    }
    const gradeGoal = course.GradeGoal;
    const courseCalResults = algorithm.course_calculation(itemRatios, percentageWorth, percentageAchieved, gradeGoal);
    const courseRatio = courseCalResults[0];
    const percentageDone = courseCalResults[1];
    const newCourseGoal = courseCalResults[2];
    const courseGrade = courseCalResults[3];
    try {
      await courseModel.EditCurrentGrade(Number(courseID), Number( courseGrade ));
      await courseModel.EditGradeNeeded(Number(courseID), Number( newCourseGoal ));
      await courseModel.EditPercentageDone(Number(courseID), Number( percentageDone ));
      await courseModel.EditCourseRatio(Number(courseID), Number( courseRatio ));
      return true;
    } catch (error) {
      return false;
    }
  }



  public course_calculation(itemRatio: number[], percentageWorth: number[], percentageAchieved: number[], courseGoal: number) {
    let  courseRatio = 0;
    let percentageDone = 0;
    let coursePercent = 0;
    for (let i = 0; i < itemRatio.length; i++) {
      courseRatio += percentageWorth[i] * itemRatio[i];
      percentageDone += percentageWorth[i];
      coursePercent += percentageWorth[i] * percentageAchieved[i];
    }
    const newCourseGoal = ((courseGoal - coursePercent * percentageDone / 100) * courseGoal) / (100 - percentageDone);
    const coursePercentRetVal = coursePercent / percentageDone;
    const retVal = [courseRatio, percentageDone, newCourseGoal, coursePercentRetVal];
    return retVal;
  }

  public new_item_calculation_and_update(courseID){
    const algorithm = new Algorithm();
    const gradableItemModel = await new GradableItemModel();
    const courseModel = await new CourseModel();
    let course = courseModel.GetCourseDetails(courseID);
    const courseRatio = course.CourseRatio;
    const percentageDone = course.PercentageDone;
    const difficulty = course.PerceivedDifficulty;
    const newCourseGoal = course.GradeNeeded;
    const gradableItems = course.GradableItems;
    i = 0;
    const difficulty = course.PerceivedDifficulty;
    let weight = 0;
    let itemHours = 0;
    let itemID = 0;
    for (let val of gradableItems) {
      gradableItem = await gradableItemModel.GetGradableItemDetails(val);
      weight = gradableItem.Weight;
      if (weight > 0) {
        itemHours = algorithm.new_item_calculation(courseRatio, percentageDone, difficulty, newCourseGoal, weight);
        itemID = gradableItem.GradableItemID;
        try {
          await gradableItemModel.AddRecommendedTime(Number(itemID), Number(itemHours));
        } catch (error) {
          return false;
        }
      }
    }
  }

  public new_item_calculation(courseRatio: number, percentageDone: number, inputCourseDifficulty: number, courseGoal: number, itemPercentage: number ) {
    let courseDifficulty = 1;
    if (inputCourseDifficulty === 1) {
      courseDifficulty = .5;
    } else
    if (inputCourseDifficulty === 2) {
      courseDifficulty = .75;
    } else
    if (inputCourseDifficulty === 3) {
      courseDifficulty = 1;
    } else
    if (inputCourseDifficulty === 4) {
      courseDifficulty = 1.25;
    } else {
      courseDifficulty = 5;
    }
    if(courseGoal < .25) {
      courseGoal = .25;
    }
    if(courseGoal > 2) {
      courseGoal = 2;
    }
    let itemHours = itemPercentage * courseGoal * courseDifficulty * 50;
    if (percentageDone > 0 && courseRatio > 1.001) {
      itemHours = (itemHours * (100 - percentageDone) + itemHours * (percentageDone * courseRatio)) / 100;
    }
    return itemHours;
  }

}
