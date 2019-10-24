import { NextFunction, Request, Response, Router } from "express";
import { IndexRoute } from "../routes/index";

import {SessionController} from "../controllers/SessionController";


test("Initialize IndexRoute", () => {
    let testIndexRoute = new IndexRoute();
    expect(testIndexRoute).toBeInstanceOf(IndexRoute);
});

