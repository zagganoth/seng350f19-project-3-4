export class Algorithm {
/*
This function gives a value for the item, used to calculate how well the user is doing in their current course.
*/

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
  public course_calculation(itemRatio: number[], percentageWorth: number[], percentageAchieved: number[], courseGoal: number) {
    let  courseRatio = 0;
    let percentageDone = 0;
    let coursePercent = 0;
    for (let i = 0; i < itemRatio.length; i++) {
      courseRatio += percentageWorth[i] * itemRatio[i];
      percentageDone += percentageWorth[i];
      coursePercent += percentageWorth[i] * percentageAchieved[i];
    }
    const newCourseGoal = ((courseGoal - coursePercent * percentageDone) * courseGoal) / (1 - percentageDone);
    const coursePercentRetVal = coursePercent/percentageDone;
    const retVal = [courseRatio, percentageDone, newCourseGoal, coursePercentRetVal];
    return retVal;
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
    let itemHours = itemPercentage * courseGoal * courseDifficulty * 50;
    if (percentageDone > 0 && courseRatio > 1.001) {
      itemHours = itemHours * (100 - percentageDone) + itemHours * (percentageDone * courseRatio);
    }
    return itemHours;
  }

}
