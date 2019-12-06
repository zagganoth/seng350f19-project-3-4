import { course_calculation, item_completed_calculation, new_item_calculation } from "../../algorithm/Algorithm";

test("test item completed calculation", () => {
	let itemRatio = 0;
	itemRatio = item_completed_calculation(80, 8, 4, 40, 20);
	expect(itemRatio === 4);
	},
);

test("test course calculation", () => {
	const itemRatio = [.5, 1.3, .7, 1.5];
	const percentageWorth = [10, 10, 10, 10];
	const percentageAchieved = [80, 80, 80, 80];
	let testValue = [0, 0, 0];
	testValue = course_calculation(itemRatio, percentageWorth, percentageAchieved, 80);
	expect(testValue[0] === 1);
	expect(testValue[1] === 40);
	expect(testValue[2] === 80);
	},
);

test("new item calculation easy", () => {
	let testValue = 0;
	testValue = new_item_calculation(1, 20, 3, 80, 10);
	expect(testValue === 5);
	},
);
