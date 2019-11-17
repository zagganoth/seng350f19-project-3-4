import { NextFunction, Request, Response, Router } from "express";
import { IndexRoute } from "../../routes/index";

describe("Index Routing Tests", () => {
    let TestIndexRoute: IndexRoute;
    const req = {} as Request;
    const res = {} as Response;
    const next = {} as NextFunction;
    const router = {} as Router;
    beforeEach(() => {
        TestIndexRoute = new IndexRoute();
    });

    it("Initializes indexRoute index", async () => {
        TestIndexRoute.index(req, res, next);
        expect(TestIndexRoute).toBeInstanceOf(IndexRoute);
    });

});
