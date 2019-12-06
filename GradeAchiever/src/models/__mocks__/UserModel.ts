export class UserModel {
    public GetUserDetails(id: number) {
        if (id === 2 ) {
            return {
                StudentID: 2,
                Email: "ashenwai@uvic.ca",
                StudentName: "AShenwai",
                NotificationLevel: 2,
                AlgorithmAccuracy: 1.5,
                Courses: [],
                IsAdmin: false,
            };
        } else if (id === 1) {
            return {
                StudentID: 1,
                Email: "test@uvic.ca",
                StudentName: "Shaelyn",
                NotificationLevel: 2,
                AlgorithmAccuracy: 1.5,
                Courses: [1, 2],
                IsAdmin: false,
            };
        }
    }

    public AddCourse(userid: number, CourseIDs: number[]) {
        if (userid === 0) {
            const retVal = {
                matchedCount: 0,
            };
            return retVal;
        } else {
            const retVal = {
                matchedCount: 1,
            };
            return retVal;
        }
    }

}
