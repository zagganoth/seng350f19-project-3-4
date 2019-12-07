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

    public CreateItem(g: IGradableItem) {// courseID: number, gradableItemName: string, dueDate= "", weight: number, gItemAccuracy: number) {
        if (g.CourseID !== 1) {
            const returnVal = {
                ops: [{GradableItemID: -1}],
            };
            return returnVal;
        } else {
            const returnVal = {
                ops: [{GradableItemID: 1}],
            };
            return returnVal;
        }
    }

    public GetNewID() {
        return 5;
    }

    public EditGradableItemName(id: number, newName: number) {
        if (id === 0) {
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

    public EditGradableItemGrade(id: number, newGrade: number) {
        if (id === 0) {
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

    public EditDueDate(id: number, newGrade: number) {
        if (id === 0) {
            throw Error;
        } else {
            const retVal = {
                matchedCount: 1,
            };
            return retVal;
        }
    }

    public AddStudyTime(id: number, newGrade: number) {
        if (id === 0) {
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

    public EditGradableItemWeight(id: number, newGrade: number) {
        if (id === 0) {
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

    public EditGradeGoal(id: number, newGrade: number) {
        if (id === 0) {
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

    public DeleteGradableItem(id: number) {
        if (id === 0) {
            throw Error;
        } else {
            const retVal = {
                removedCount: 1,
            };
            return retVal;
        }
    }

}
