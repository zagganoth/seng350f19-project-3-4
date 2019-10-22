"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var BaseModel_1 = require("./BaseModel");
var CourseModel = /** @class */ (function (_super) {
    __extends(CourseModel, _super);
    /*
        Course Model Fields:
            ○ CourseID (auto-generated, auto-increment, int)
            ○ StudentID (string)
            ○ CourseName (string)
            ○ PerceivedDifficulty (Float)
            ○ GradeGoal (int: 0 - 100)
            ○ GradableItems[]
            (Removed) CourseAlgorithmAccuracy (float: 0.5f - 2f)
     */
    function CourseModel() {
        return _super.call(this, "Course") || this;
    }
    CourseModel.prototype.CreateCourse = function (userID, courseName) {
    };
    CourseModel.prototype.SetDifficulty = function (courseID, difficulty) {
    };
    CourseModel.prototype.SetGradeGoal = function (courseID, goal) {
        if (goal <= 100) {
        }
    };
    CourseModel.prototype.AddGradableItem = function (courseID, item) {
    };
    CourseModel.prototype.GetCourseDetails = function (courseID) {
        //Course name, student, etc
    };
    CourseModel.prototype.GetGradableItems = function (courseID) {
        //List of all gradable items
    };
    CourseModel.prototype.GetGradeGoal = function (courseID) {
    };
    CourseModel.prototype.GetPerceivedDifficulty = function (courseID) {
    };
    return CourseModel;
}(BaseModel_1.BaseModel));
exports.CourseModel = CourseModel;
//# sourceMappingURL=CourseModel.js.map