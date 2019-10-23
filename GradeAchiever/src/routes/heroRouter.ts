import {NextFunction, Request, Response, Router} from "express";
import DbClient = require("../DbClient");
export class HeroRouter {
    public static create(router: Router) {
        // log
        console.log("[HeroRoute::create] Creating HeroRoutes route.");

        // add home page route
        router.get("/api/heroes", (req: Request, res: Response, next: NextFunction) => {
            new HeroRouter().getAll(req, res, next);
        });

        router.get("/api/heroes/:id", (req: Request, res: Response, next: NextFunction) => {
            new HeroRouter().getOne(req, res, next);
        });
    }

    constructor() {
        // not much here yet
    }

    /**
     * GET all Heroes.
     */
    public getAll(req: Request, res: Response, next: NextFunction) {
        DbClient.connect()
            .then((db) => {
                return db!.collection("heroes").find().toArray();
            })
            .then((heroes: any) => {
                console.log(heroes);
                res.send(heroes);
            })
            .catch((err) => {
                console.log("err.message");
            });
    }
    /**
     * GET one hero by id
     */
    public getOne(req: Request, res: Response, next: NextFunction) {
        // console.log(req.params['id']);
        DbClient.connect()
        .then((db) => {
            return db!.collection("heroes").find({id: +req.params.id}).toArray();
        })
        .then((heroes: any) => {
            console.log(heroes);
            res.send(heroes);
        })
        .catch((err) => {
            console.log("err.message");
        });
    }

}
