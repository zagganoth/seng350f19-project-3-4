import { BaseRoute } from "./routes/route";
import {Request, Response } from "express";

testBaseRouteInit({
	  let testBaseRoute:BaseRoute = new BaseRoute();
  	expect(testBaseRoute.gettitle() == "My New TypeScript Web app");
})

testBaseRouteAddScript({
  let testBaseRoute:BaseRoute = new BaseRoute();
  testBaseRoute = testBaseRoute.addScript("The Sky is Blue");
  expect(testBaseRoute.getScripts()== "The Sky is Blue");
})

 testBaseRouteRender({
  let testRender:BaseRoute = new BaseRoute();
  testRender = testBaseRoute.addScript("The sky is purple");
  testRender.render(req, res, "userhome", options);
  expect(res.locals.BASE_URL == "/");
  expect(res.locals.scripts == testRender.scripts);
  expect(res.locals.title == testRender.title);
})

testBaseRouteAddScriptFAIL({
  let testBaseRoute:BaseRoute = new BaseRoute();
  let ans = 2;
try {
  testBaseRoute.addScript(420);
}
catch(error) {
  ans = 3;
}
expect(ans==3);
})
