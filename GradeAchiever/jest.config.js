module.exports = {
	"roots": [
		"<rootDir>/src"
	],
	verbose: true,
	"transform": {
		"^.+\\.tsx?$": "ts-jest"
	},
	preset: "jest-puppeteer"
}
