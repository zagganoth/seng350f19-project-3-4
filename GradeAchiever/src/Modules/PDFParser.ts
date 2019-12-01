const pdf = require("pdf-parse");
pdf.disableWorker = true;

export class PDFParser {
    constructor() {

    }
    public async parse(file: any, type: string) {
        if (file.data === null || file.data === undefined) {return {}; }
        if (type === "heat") {
            const data = await pdf(file.data);
            const returnObject = this.parseHeatOutline(data);
            return returnObject;
        }
    }
    public parseHeatOutline(data: any) {
        const returnObject: any = {};
        const text = data.text;
        returnObject.CourseName = this.getCourseName(text, /[0-9/]+(.*?)\sOutline/);
        const gradableItems = this.getWeightInfo(text, /(Grading|Assessment.*)\n(?:.*\n)?(\n?((?!\s[0-9]).)*?(\s*)([0-9]+%).*)+/gm, /\n((?:\w|[ ])+?)(s?)([0-9]+)%/g);
        // The below two functions modify gradableItems (typescript passes by reference)
        this.getDueDates(gradableItems, text, /(?:Assignments|Term Schedule)(?:\n(?:(?!Exams).)*)+?(.*(Due)? [dD]ate)(\n(.*)((?:Oct|Sept|Nov|Dec).*))*/gm, /\n(.*?)([0-9]?[0-9]?%)?(?:(?:Oct|Sept|Nov|Dec).*)?((?:Oct|Sept|Nov|Dec).*)/g);
        this.ensureWeightSum100(gradableItems);
        returnObject.GradableItems = gradableItems;
        return returnObject;
    }
    private getCourseName(text: string, nameReg: RegExp) {
        // Get the course name here
        const courseMatch = nameReg.exec(text);
        let courseName: string = "";
        // Try to get the course name from the outline
        if (courseMatch != null && courseMatch.length > 1) {
            courseName = courseMatch[1];
        }
        return courseName;
    }
    private getPluralItem(gradableItems: any, numItem: RegExpExecArray|null, match: RegExpExecArray) {
        if (numItem != null) {
            let itemName = numItem[2];
            if (itemName === "Quizze") {itemName = "Quiz"; }
            for (let i = 0; i < +numItem[1]; i++) {
                if (!((itemName + " " + (i + 1)) in gradableItems)) {
                    gradableItems[itemName + " " + (i + 1)] = {};
                }
                gradableItems[itemName + " " + (i + 1)].Weight = (+match[3]) / (+numItem[1]);

            }
        }
    }
    private parseGradeBreakdown(gradableItems: any, match: RegExpExecArray|null, gradeBreakdown: string, gradableItemReg: RegExp) {
        while (match != null) {
            // If the gradable item is plural and has an attached number
            if (match[2] !== "") {
                const numberReg = /([0-9]*)\s(.*)/;
                // This should get the number of gradable items of a type, and the type of gradable items
                // Eg: If it reads 5 Quizzes, the array below will have [1] be 5 and [2] be Quizzes
                // Then we can initially assume that all quizzes are equally weighted
                // let numItem =
                this.getPluralItem(gradableItems, numberReg.exec(match[1]), match);
            } else {
                if (!(match[1] in gradableItems)) {
                    gradableItems[match[1]] = {};
                }
                gradableItems[match[1]].Weight = match[3];
            }
            match = gradableItemReg.exec(gradeBreakdown);
        }
    }
    private getWeightInfo(text: string, gradingReg1: RegExp, gradingReg2: RegExp) {
        const gradableItems: any = {};
        // Get the grading breakdown here
        const gradeBreakdownArray = text.match(gradingReg1);
        let gradeBreakdown;
        if (gradeBreakdownArray != null && gradeBreakdownArray.length > 0) {gradeBreakdown = gradeBreakdownArray[0]; } else { return {}; }
        const match = gradingReg2.exec(gradeBreakdown);
        this.parseGradeBreakdown(gradableItems, match, gradeBreakdown, gradingReg2);
        return gradableItems;
    }
    private getDueDates(gradableItems: any, text: string, assignmentReg: RegExp, assignmentReg2: RegExp) {

        const initialBreakdown = text.match(assignmentReg);
        let assignmentBreakdown = "";
        if (initialBreakdown != null && initialBreakdown.length > 0) {assignmentBreakdown = initialBreakdown[0]; }
        let match = assignmentReg2.exec(assignmentBreakdown);
        while (match != null) {

            if (!(match[1] in gradableItems)) {
                gradableItems[match[1]] = {};
            }
            gradableItems[match[1]].Weight = match[2];
            gradableItems[match[1]].DueDate = new Date(match[3] + " " + new Date().getFullYear());
            gradableItems[match[1]].DueDate.setUTCHours(0);
            match = assignmentReg2.exec(assignmentBreakdown);
        }
    }
    // This function simply tries to guess the weight of a gradable item if it doesn't have one by looking at remaining
    // unassigned percentage and dividing it equally
    private ensureWeightSum100(gradableItems: any) {
        let sumWeight = 0;
        let noWeightCount = 0;
        for (const key in gradableItems) {
            if (gradableItems[key].Weight !== undefined) {
                sumWeight += +gradableItems[key].Weight;
            } else {
                noWeightCount++;
            }
        }
        for (const key in gradableItems) {
            if (gradableItems[key].Weight === undefined) {
                gradableItems[key].Weight = (100 - sumWeight) / noWeightCount;
            }
        }
    }
}
