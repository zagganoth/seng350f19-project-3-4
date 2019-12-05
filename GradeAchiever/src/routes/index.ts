
import { NextFunction, Request, Response, Router } from "express";
import { BaseRoute } from "./route";

import {SessionController} from "../controllers/SessionController";

/**
 * / route
 *
 * @class IndexRoute
 */
export class IndexRoute extends BaseRoute {

    /**
     * Create the routes.
     *
     * @class IndexRoute
     * @method create
     * @static
     */
    public static create(router: Router) {
        // log
        console.log("[IndexRoute::create] Creating index route.");
        const path = require("path");
        // add home page route
        router.get("/", (req: Request, res: Response, next: NextFunction) => {
            new IndexRoute().index(req, res, next);
        });

        router.get("/stylesheets/style.css", (req: Request, res: Response, next: NextFunction) => {
            res.sendFile(path.join(__dirname + "../../../public/stylesheets/style.css"));
        });
    }

    /**
     * Constructor
     *
     * @class IndexRoute
     * @constructor
     */
    constructor() {
        super();
    }

    /**
     * The login page route.
     *
     * @class IndexRoute
     * @method index
     * @param req {Request} The express Request object.
     * @param res {Response} The express Response object.
     * @next {NextFunction} Execute the next method.
     */
    public index(req: Request, res: Response, next: NextFunction) {
        // The index page should be default be the login page
        // Create a SessionController to get a list of all users
        // Populate page with users from SessionController
        const session = new SessionController();

        // set custom title
        this.title = "Grade Achiever";

        session.RequestUsers()
        .then((mess) => {
            // set message
            const options: object = {
                users: mess,
            };
            return options;
        })
        .catch((err) => {
            console.log(err.message);
        })
        .then((options: any) => {
            this.render(req, res, "index", options);
        });
    }
}
