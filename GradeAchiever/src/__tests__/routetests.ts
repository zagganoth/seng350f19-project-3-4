import { NextFunction, Request, Response, Router } from "express";
import { BaseRoute } from "../routes/route";

let testBaseRoute = new BaseRoute();

test("testBaseRouteInit", () => {
	expect(testBaseRoute.gettitle() === "My New TypeScript Web app");
	},
);

testBaseRoute = testBaseRoute.addScript("The Sky is Blue");

test("testBaseRouteAddScript", () => {
	expect(testBaseRoute.getScripts() === ["The Sky is Blue"]);
	},
);

const testRender = new BaseRoute();
const req = new Request("helloworld");
const res = new Response();
const options = new Object();
testRender = testBaseRoute;
testRender.render(req, res, "userhome", options);
test("testRender", () => {
	expect(testRender.getScripts() === ["The Sky is Blue"]);
	expect(res.locals.BASE_URL === "/");
	expect(res.locals.title === testRender.title);
	expect(res.locals.scripts === testRender.scripts);
	},
);
