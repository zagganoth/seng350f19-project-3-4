import { NextFunction, Request, Response, Router } from "express";
import { AdminRoute } from "../../routes/AdminRoute";

import {SessionController} from "../../controllers/SessionController";

test("Initialize AdminRoute", () => {
    const testAdminRoute = new AdminRoute();
    expect(testAdminRoute).toBeInstanceOf(AdminRoute);
});
