jest.mock('../routes/route');
jest.mock("express");
import {BaseRoute} from "../routes/route";
import {Request, Response } from "express";
let testBaseRoute = new BaseRoute();

test("testBaseRouteInit", () => {
	expect(testBaseRoute.gettitle() == "My New TypeScript Web app");
	},
);


testBaseRoute = testBaseRoute.addScript("The Sky is Blue");

test("testBaseRouteAddScript", () => {
	expect(testBaseRoute.getScripts()== "The Sky is Blue");

	},
);

let testRender = new BaseRoute();
testRender = testBaseRoute.addScript("The sky is purple");
testRender.render(req, res, "userhome", options);

test("testRender", () => {
	expect(testBaseRoute.getScripts()== "The Sky is Blue");
	expect(res.locals.BASE_URL == "/");
	expect(res.locals.title == testRender.title);
	expect(res.locals.scripts == testRender.scripts);
	},
);


test("testBaseRouteAddScriptFAIL", () => {
	expect(testBaseRoute.getScripts()== "The Sky is Blue");

	},
);
