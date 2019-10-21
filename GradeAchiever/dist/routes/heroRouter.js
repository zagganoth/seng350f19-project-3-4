"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var DbClient = require("../DbClient");
var HeroRouter = /** @class */ (function () {
    function HeroRouter() {
        // not much here yet
    }
    HeroRouter.create = function (router) {
        //log
        console.log("[HeroRoute::create] Creating HeroRoutes route.");
        //add home page route
        router.get("/api/heroes", function (req, res, next) {
            new HeroRouter().getAll(req, res, next);
        });
        router.get("/api/heroes/:id", function (req, res, next) {
            new HeroRouter().getOne(req, res, next);
        });
    };
    /**
     * GET all Heroes.
     */
    HeroRouter.prototype.getAll = function (req, res, next) {
        DbClient.connect()
            .then(function (db) {
            return db.collection("heroes").find().toArray();
        })
            .then(function (heroes) {
            console.log(heroes);
            res.send(heroes);
        })
            .catch(function (err) {
            console.log("err.message");
        });
    };
    /**
     * GET one hero by id
     */
    HeroRouter.prototype.getOne = function (req, res, next) {
        //console.log(req.params['id']);
        DbClient.connect()
            .then(function (db) {
            return db.collection("heroes").find({ id: +req.params.id }).toArray();
        })
            .then(function (heroes) {
            console.log(heroes);
            res.send(heroes);
        })
            .catch(function (err) {
            console.log("err.message");
        });
    };
    return HeroRouter;
}());
exports.HeroRouter = HeroRouter;
//# sourceMappingURL=heroRouter.js.map