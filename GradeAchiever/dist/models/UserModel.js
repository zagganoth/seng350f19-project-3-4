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
var UserModel = /** @class */ (function (_super) {
    __extends(UserModel, _super);
    function UserModel(userID) {
        var _this = _super.call(this, "User") || this;
        //We can test here the id of the user submitting the request - if it's an admin user we can allow for admin actions
        var isAdmin = false;
        _this.isAdmin = isAdmin;
        _this.userID = userID;
        return _this;
    }
    UserModel.prototype.AddUser = function (userName, email) {
        //Add the user to the database using dbClient
        if (this.isAdmin) {
        }
        else {
            throw new Error("Invalid admin credentials");
        }
    };
    UserModel.prototype.RemoveUser = function (userID) {
        if (this.isAdmin) {
        }
        else {
            throw new Error("Invalid admin credentials");
        }
    };
    UserModel.prototype.SetAlgorithmAccuracy = function (algAccuracy) {
    };
    UserModel.prototype.SetNotificationLevel = function (notificationLevel) {
    };
    UserModel.prototype.SetEmail = function (email) {
    };
    UserModel.prototype.AddCourse = function (course) {
    };
    UserModel.prototype.RemoveCourse = function (courseName) {
        //The course should be uniquely identifiable by the user id and course name
    };
    UserModel.prototype.GetUserDetails = function () {
    };
    UserModel.prototype.GetAlgorithmAccuracy = function () {
    };
    UserModel.prototype.GetCourses = function () {
    };
    return UserModel;
}(BaseModel_1.BaseModel));
exports.UserModel = UserModel;
//# sourceMappingURL=UserModel.js.map