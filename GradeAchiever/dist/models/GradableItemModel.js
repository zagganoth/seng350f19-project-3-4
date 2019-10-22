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
var GradableItemModel = /** @class */ (function (_super) {
    __extends(GradableItemModel, _super);
    /*
        Gradable Item Model Fields:
                ○ GradableItemID (auto-generated,auto-increment,int)
                ○ CourseID
                ○ GradableItemName (string)
                ○ DueDate (Date)
                ○ Weight (float? Int?) (Constraint: Item weights must add to 100)
                GItemAlgorithmAccuracy (float?)
     */
    function GradableItemModel() {
        return _super.call(this, "GradableItem") || this;
    }
    GradableItemModel.prototype.SetDate = function (gradableItemID, date) {
        //ensure this is a valid date first
    };
    GradableItemModel.prototype.SetWeight = function (gradableItemID, weight) {
        //ensure that sum of all weights for a course is 100
    };
    GradableItemModel.prototype.SetAlgAccuracy = function (gradableItemID, accuracy) {
        //Ensure between 0.5-2
    };
    GradableItemModel.prototype.GetGradableItemDetails = function (gradableItemID) {
        //Returns gradableItem name, id, course id, due date, weight
    };
    GradableItemModel.prototype.GetAlgorithmAccuracy = function (gradableItemID) {
    };
    return GradableItemModel;
}(BaseModel_1.BaseModel));
exports.GradableItemModel = GradableItemModel;
//# sourceMappingURL=GradableItemModel.js.map