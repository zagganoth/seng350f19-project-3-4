/**
 * @jest-environment node
 */
import { NextFunction, Request, Response} from "express";
import fs from "fs";
import {JSDOM} from "jsdom";
import { PDFParser } from "../../Modules/PDFParser";
const path = require("path");
describe("PDF Parser Tests", () => {
    it("Runs Parse on the SENG360 Outline PDF", async () => {

        const file = fs.readFileSync(path.resolve(__dirname, "../../../sample_outlines/Seng360Outline.pdf"));
        const retObj = await new PDFParser().parse({data: file}, "heat");
        const expectedObj = {
            CourseName: "SENG 360",
            GradableItems: {
                "Final": {Weight: "25"},
                "Midterm": {Weight: "15"},
                "Class Attendant and participation": {Weight: "5"},
                "Group cybersecurity game report and defence strategies presentation": {Weight: "5"},
                "Assignment 1": {Weight: 5, DueDate: new Date("2019-09-27")},
                "Assignment 2": {Weight: 5, DueDate: new Date("2019-10-04")},
                "Assignment 3": {Weight: 5, DueDate: new Date("2019-10-11")},
                "Assignment 4": {Weight: 5, DueDate: new Date("2019-10-18")},
                "Assignment 5": {Weight: 5, DueDate: new Date("2019-10-25")},
                "Assignment 6": {Weight: 5, DueDate: new Date("2019-11-01")},
                "Assignment 7": {Weight: 5, DueDate: new Date("2019-11-08")},
                "Assignment 8": {Weight: 5, DueDate: new Date("2019-11-15")},
                "Assignment 9": {Weight: 5, DueDate: new Date("2019-11-22")},
                "Assignment 10": {Weight: 5, DueDate: new Date("2019-11-29")},
            },
        };
        expect(retObj).toEqual(expectedObj);
    });
    it("Runs Parse with an invalid file", async () => {
        const file = "";
        const retObj = await new PDFParser().parse(file, "heat");
        expect(retObj).toEqual({});
    });
});
