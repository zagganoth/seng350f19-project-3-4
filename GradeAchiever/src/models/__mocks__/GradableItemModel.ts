export class GradableItemModel {
    public async GetGradableItemDetails(id: number): Promise<any> {
        if (id === 1) {
            return [
                {
                    GradableItemID: 1,
                    CourseID: 1,
                    GradableItemName: "Assignment1",
                    DueDate: "2019-11-15",
                    Weight: 15,
                    GradableItemAccuracy: -1,
                },
             ];
        }
        if (id === 2) {
            return [
                {
                    GradableItemID: 2,
                    CourseID: 1,
                    GradableItemName: "Assignment2",
                    DueDate: "2019-12-15",
                    Weight: 85,
                    GradableItemAccuracy: -1,
                },
            ];
        }
        if (id === 3) {
            return [
                {
                    GradableItemID: 3,
                    CourseID: 2,
                    GradableItemName: "Assignment1",
                    DueDate: "2019-11-15",
                    Weight: 15,
                    GradableItemAccuracy: -1,
                },
            ];
        }
        if (id === 4) {
            return [
                {
                    GradableItemID: 4,
                    CourseID: 2,
                    GradableItemName: "Assignment2",
                    DueDate: "2019-12-15",
                    Weight: 85,
                    GradableItemAccuracy: -1,
                },
            ];
        }
    }
}
