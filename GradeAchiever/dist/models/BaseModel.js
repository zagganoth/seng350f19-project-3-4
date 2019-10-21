"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var DbClient = require("../DbClient");
var BaseModel = /** @class */ (function () {
    function BaseModel(tableName) {
        this.tableName = tableName;
    }
    BaseModel.prototype.getAll = function (req, res, next) {
        var _this = this;
        DbClient.connect()
            .then(function (db) {
            return db.collection(_this.tableName).find().toArray();
        })
            .then(function (heroes) {
            console.log(heroes);
            res.send(heroes);
        })
            .catch(function (err) {
            console.log("err.message");
        });
    };
    BaseModel.prototype.getOne = function (req, res) {
        var _this = this;
        DbClient.connect()
            .then(function (db) {
            return db.collection(_this.tableName).find().toArray();
        })
            .then(function (heroes) {
            console.log(heroes);
            res.send(heroes);
        })
            .catch(function (err) {
            console.log("err.message");
        });
    };
    return BaseModel;
}());
exports.BaseModel = BaseModel;
//# sourceMappingURL=BaseModel.js.map