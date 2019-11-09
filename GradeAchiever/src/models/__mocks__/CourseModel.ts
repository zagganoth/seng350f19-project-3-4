export class CourseModel {
    public GetCourseDetails(id: number) {
        if (id === 1) {
            const retval = {
                CourseID: 1,
                StudentID: 1,
                CourseName: "SENG350",
                PerceivedDifficulty: 3,
                GradeGoal: 89,
                CurrentGrade: 80,
                GradableItems: [1, 2],
                };
            return retval;
        }
        if (id === 2) {
            const retval = {
                CourseID: 2,
                StudentID: 1,
                CourseName: "SENG360",
                PerceivedDifficulty: 2,
                GradeGoal: 88,
                CurrentGrade: 75,
                GradableItems: [3, 4],
             };
            return retval;
        } else {
            return [];
        }
    }

}
