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
    const retVal = {courseRatio, percentageDone, newCourseGoal};
    return retVal;
  }

  public new_item_calculation(courseRatio: number, percentageDone: number, courseDifficulty: number, courseGoal: number, itemPercentage: number ) {
    let userIsFOOBAR = false;
    if (courseGoal >= 1) {
      courseGoal = 1;
      userIsFOOBAR = true;
    }
    let userIsKillingIt = false;
    if (courseGoal <= 0.25) {
      courseGoal = 0.25;
      userIsKillingIt = true;
    }
    let itemHours = itemPercentage * courseGoal * courseDifficulty * 50;
    let userIsBehind = false;
    if (percentageDone > 0 && courseRatio > 1) {
      userIsBehind = true;
      itemHours = itemHours * (100 - percentageDone) + itemHours * (percentageDone * courseRatio);
    }
    return {itemHours, userIsBehind, userIsFOOBAR, userIsKillingIt};
  }

}
