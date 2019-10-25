export class UserModel {
    public async GetUserDetails(id: number): Promise<any> {
        return [
        {
            StudentID: 2,
            Email: "ashenwai@uvic.ca",
            StudentName: "AShenwai",
            NotificationLevel: 2,
            AlgorithmAccuracy: 1.5,
            Courses: [],
            IsAdmin: false,
        },
      ];
        };
  }
