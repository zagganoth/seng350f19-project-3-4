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
var route_1 = require("./route");
var SessionController_1 = require("../controllers/SessionController");
/**
 * / route
 *
 * @class IndexRoute
 */
var IndexRoute = /** @class */ (function (_super) {
    __extends(IndexRoute, _super);
    /**
     * Constructor
     *
     * @class IndexRoute
     * @constructor
     */
    function IndexRoute() {
        return _super.call(this) || this;
    }
    /**
     * Create the routes.
     *
     * @class IndexRoute
     * @method create
     * @static
     */
    IndexRoute.create = function (router) {
        //log
        console.log("[IndexRoute::create] Creating index route.");
        var path = require('path');
        //add home page route
        router.get("/", function (req, res, next) {
            new IndexRoute().index(req, res, next);
        });
        /*
        router.get("/stylesheets/style.css", (req: Request, res: Response, next: NextFunction) =>
        {
            res.sendFile(path.join(__dirname + "../../../stylesheets/style.css"));
        });*/
    };
    /**
     * The login page route.
     *
     * @class IndexRoute
     * @method index
     * @param req {Request} The express Request object.
     * @param res {Response} The express Response object.
     * @next {NextFunction} Execute the next method.
     */
    IndexRoute.prototype.index = function (req, res, next) {
        var _this = this;
        //The index page should be default be the login page
        //Create a SessionController to get a list of all users
        //Populate page with users from SessionController
        var session = new SessionController_1.SessionController();
        //set custom title
        this.title = "Grade Achiever";
        session.RequestUsers(req, res, next)
            .then(function (mess) {
            console.log(mess);
            //set message
            var options = {
                "users": mess
            };
            return options;
        })
            .then(function (options) {
            //console.log("I'm doing the thing: "+options);
            //res.send(options);
            //render template
            _this.render(req, res, "index", options);
        });
    };
    return IndexRoute;
}(route_1.BaseRoute));
exports.IndexRoute = IndexRoute;
//# sourceMappingURL=index.js.map