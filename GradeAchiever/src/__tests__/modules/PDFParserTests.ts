/**
 * @jest-environment node
 */
import { NextFunction, Request, Response} from "express";
import { PDFParser } from "../../Modules/PDFParser";
import fs from 'fs';
import {JSDOM} from 'jsdom';
const path = require('path');
describe("PDF Parser Tests", () => {
    it("Runs Parse on the SENG360 Outline PDF", async () => {

        let file = fs.readFileSync(path.resolve(__dirname,'../../../sample_outlines/Seng360Outline.pdf'));
        let retObj = await new PDFParser().parse({data: file},"heat");
        let expectedObj = {
            CourseName: "SENG 360",
            GradableItems: {
                Final: {Weight: "25"},
                Midterm: {"Weight": "15"},
                'Class Attendant and participation': {Weight: '5'},
                'Group cybersecurity game report and defence strategies presentation': {Weight: '5'},
                'Assignment 1': {Weight: 5, DueDate: new Date("2019-09-27T09:00:00.000Z")},
                'Assignment 2': {Weight: 5, DueDate: new Date("2019-10-04T09:00:00.000Z")},
                'Assignment 3': {Weight: 5, DueDate: new Date("2019-10-11T09:00:00.000Z")},
                'Assignment 4': {Weight: 5, DueDate: new Date("2019-10-18T09:00:00.000Z")},
                'Assignment 5': {Weight: 5, DueDate: new Date("2019-10-25T09:00:00.000Z")},
                'Assignment 6': {Weight: 5, DueDate: new Date("2019-11-01T09:00:00.000Z")},
                'Assignment 7': {Weight: 5, DueDate: new Date("2019-11-08T09:00:00.000Z")},
                'Assignment 8': {Weight: 5, DueDate: new Date("2019-11-15T09:00:00.000Z")},
                'Assignment 9': {Weight: 5, DueDate: new Date("2019-11-22T09:00:00.000Z")},
                'Assignment 10': {Weight: 5, DueDate: new Date("2019-11-29T09:00:00.000Z")},
            }
        };
        expect(retObj).toEqual(expectedObj);
    });
    it("Runs Parse with an invalid file", async()=>{
        let file = "";
        let retObj = await new PDFParser().parse(file,"heat");
        expect(retObj).toEqual({});
    })
});