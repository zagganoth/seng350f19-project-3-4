import { CourseController } from "../controllers/CourseController";
import { GradableItemController } from "../controllers/GradableItemController";
import { CourseModel } from "../models/CourseModel";
import { GradableItemModel } from "../models/GradableItemModel";

// export class Algorithm {
// courseController = new CourseController()
// gradableItemController = new GradableItemController();
const gradableItemModel = new GradableItemModel();
const courseModel = new CourseModel();

/*
This function gives a value for the item, used to calculate how well the user is doing in their current course.
*/

export async function item_completed_calculation_and_update(id: number) {
  try {
    const gradableItemDetails = await gradableItemModel.GetGradableItemDetails(id);
    const courseID = gradableItemDetails.CourseID;
    const grade = gradableItemDetails.CurrentGrade;
    const hoursRecommended = gradableItemDetails.RecommendedTime;
    const hoursSpent = gradableItemDetails.StudiedTime;
    const gradeGoal = (await courseModel.GetCourseDetails(courseID)).GradeGoal;
    const itemRatio = item_completed_calculation(gradeGoal, hoursSpent, hoursRecommended, grade);
    await gradableItemModel.AddGItemAccuracy(Number(id), Number(itemRatio));
    return courseID;
  } catch (error) {
    console.log(error);
    return false;
  }
}

export function item_completed_calculation(percentageReccomended: number, hoursSpent: number, hoursRecommended: number, percentageAchieved: number) {
  const percentageRatio = percentageReccomended / percentageAchieved;
  const hoursRatio = hoursSpent / hoursRecommended;
  const itemRatio = percentageRatio * hoursRatio;
  return itemRatio;
}

/*
This function calculates how well the user is doing in the course in multiple ways.
This is used to calculated how much time the user needs to spend on their project.
*/
export async function course_calculation_and_update(courseID: number) {
  try {
    const course = await courseModel.GetCourseDetails(courseID);
    const gradableItems = course.GradableItems;
    let i = 0;
    const itemRatios = [];
    const percentageWorth = [];
    const percentageAchieved = [];
    for (const val of gradableItems) {
      const gradableItem = await gradableItemModel.GetGradableItemDetails(val);
      if (gradableItem.CurrentGrade > 1) {
        itemRatios[i] = gradableItem.GItemAccuracy;
        percentageWorth[i] = gradableItem.Weight;
        percentageAchieved[i] = gradableItem.CurrentGrade;
        i++;
      }
    }
    const gradeGoal = course.GradeGoal;
    const courseCalResults = course_calculation(itemRatios, percentageWorth, percentageAchieved, gradeGoal);
    const courseRatio = courseCalResults[0];
    const percentageDone = courseCalResults[1];
    const newCourseGoal = courseCalResults[2];
    const courseGrade = courseCalResults[3];
    await courseModel.EditCurrentGrade(Number(courseID), Number(courseGrade));
    await courseModel.EditGradeNeeded(Number(courseID), Number(newCourseGoal));
    await courseModel.EditPercentageDone(Number(courseID), Number(percentageDone));
    await courseModel.EditCourseRatio(Number(courseID), Number(courseRatio));
    return true;
  } catch (error) {
    console.log(error);
    return false;
  }
}

export function course_calculation(itemRatio: number[], percentageWorth: number[], percentageAchieved: number[], courseGoal: number) {
  let courseRatio = 0;
  let percentageDone = 0;
  let coursePercent = 0;
  let coursePercentRetVal = 0;
  for (let i = 0; i < itemRatio.length; i++) {
    courseRatio += (Number(percentageWorth[i]) * Number(itemRatio[i])) / 100;
    percentageDone += Number(percentageWorth[i]);
    coursePercent += Number(percentageWorth[i]) * Number(percentageAchieved[i]);
    coursePercentRetVal = Number(percentageAchieved[i]);
  }
  const newCourseGoal = ((courseGoal - (coursePercent * percentageDone / 100)) * courseGoal) / (100 - percentageDone);
  const retVal = [courseRatio, percentageDone, newCourseGoal, coursePercentRetVal];
  return retVal;
}

export async function new_item_calculation_and_update(courseID: number) {
  try {
    const course = await courseModel.GetCourseDetails(courseID);
    const courseRatio = course.CourseRatio;
    const percentageDone = course.PercentageDone;
    const difficulty = course.PerceivedDifficulty;
    const newCourseGoal = course.GradeNeeded;
    const gradableItems = course.GradableItems;
    const i = 0;
    let weight = 0;
    let itemHours = 0;
    let itemID = 0;
    for (const val of gradableItems) {
      const gradableItem = await gradableItemModel.GetGradableItemDetails(val);
      weight = gradableItem.Weight;
      if (weight > 0) {
        itemHours = new_item_calculation(courseRatio, percentageDone, difficulty, newCourseGoal, weight);
        itemID = gradableItem.GradableItemID;
        await gradableItemModel.AddRecommendedTime(Number(itemID), Number(itemHours));
      }
    }
  } catch (error) {
    console.log(error);
    return false;
  }
}

export function new_item_calculation(courseRatio: number, percentageDone: number, inputCourseDifficulty: number, courseGoal: number, itemPercentage: number) {
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
          courseDifficulty = 1;
        }
  if (courseGoal < .15) {
    courseGoal = .15;
  }
  if (courseGoal > 3) {
    courseGoal = 3;
  }
  let itemHours = itemPercentage * courseGoal / 100 * courseDifficulty * 50;
  /*if ((percentageDone > 0 && courseRatio > 1.001)) {
    itemHours = ((itemHours * (100 - percentageDone) / 100) + itemHours * (percentageDone * courseRatio)) / 100;
  }*/
  return itemHours;
}

// }
