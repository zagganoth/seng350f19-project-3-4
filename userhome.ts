
import { NextFunction, Request, Response, Router } from "express";
import { BaseRoute } from "./route";


/**
 * / route
 *
 * @class UserHomeRoute
 */
export class UserHomeRoute extends BaseRoute {

    /**
     * Create the routes.
     *
     * @class UserHomeRoute
     * @method create
     * @static
     */
    public static create(router: Router) {
        //log
        console.log("[UserHomeRoute::create] Creating user homepage route.");

        //add user home page route
        router.post("/overview", (req: Request, res: Response, next: NextFunction) => {
            new UserHomeRoute().userhome(req, res, next);
        });
    }

    /**
     * Constructor
     *
     * @class UserHomeRoute
     * @constructor
     */
    constructor() {
        super();
    }

    /**
     * The user home page route.
     *
     * @class UserHomeRoute
     * @method userhome
     * @param req {Request} The express Request object.
     * @param res {Response} The express Response object.
     * @next {NextFunction} Execute the next method.
     */
    public userhome(req: Request, res: Response, next: NextFunction) {
        //set custom title
        this.title = "Overview";
        //set options
        let options: Object = {
            "username": req.body.user
        };

        //render template
        this.render(req, res, "userhome", options);
    }
}
