import { NextFunction, Request, Response, Router } from "express";
import { BaseRoute } from "../routes/route";

let testBaseRoute = new BaseRoute();


test("Initialize BaseRoute", () => {
    let testBaseRoute = new BaseRoute();
    expect(testBaseRoute).toBeInstanceOf(BaseRoute);
});


test("testBaseRouteInit", () => {
	let testBaseRoute = new BaseRoute();
	expect(testBaseRoute.gettitle() === "My New TypeScript Web app");
	},
);



test("testBaseRouteAddScript", () => {
	let testBaseRoute = new BaseRoute();
	testBaseRoute = testBaseRoute.addScript("The Sky is Blue");
	expect(testBaseRoute.getScripts() === ["The Sky is Blue"]);
	},
);

/*
test("test BaseRoute render", () => {
	let testBaseRoute = new BaseRoute();
	var res = {
		viewName: ""
		, data : {}
		};
	var req = {
		viewName: ""
		, data : {}
		};
	testBaseRoute.render(req, res, "index")
	expect(testBaseRoute.getScripts() === ["The Sky is Blue"]);
	},
);

*/

/*
let testRender = new BaseRoute();
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
*/