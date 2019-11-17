import { NextFunction, Request, Response, Router } from "express";
import { BaseRoute } from "../../routes/route";
import { anyTypeAnnotation } from "@babel/types";

describe("Base Routing Tests", () => {
    let TestBaseRoute: BaseRoute;
    const req = {} as Request;
    const res = {} as Response;
    const next = {} as NextFunction;
    const router = {} as Router;
    beforeEach(() => {
        TestBaseRoute = new BaseRoute();
    });

    it("Initializes BaseRoute render", async () => {
		const view = "userhome";
		res.locals = {};
		res.render = () =>{return};
        TestBaseRoute.render(req,res,view);
        expect(TestBaseRoute).toBeInstanceOf(BaseRoute);
	});
	
	it("Initializes BaseRoute render", async () => {
		const title = TestBaseRoute.gettitle()
		expect(title === "My New TypeScript Web app");
	});

	it("Adds script to base route", () => {
		TestBaseRoute.addScript("The Sky is Blue");
		expect(TestBaseRoute.getScripts() === ["The Sky is Blue"]);
	})

    
});



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
