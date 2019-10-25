import { NextFunction, Request, Response, Router } from "express";
import { SessionRoute } from "../../routes/SessionRoute";

test("Initialize SessionRoute", () => {
    const testSessionRoute = new SessionRoute();
    expect(testSessionRoute).toBeInstanceOf(SessionRoute);
});
