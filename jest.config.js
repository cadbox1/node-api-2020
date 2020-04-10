module.exports = {
	preset: "ts-jest",
	globals: {
		"ts-jest": {
			tsConfig: "./tsconfig.json",
		},
	},
	moduleFileExtensions: ["ts", "js"],
	transform: {
		"^.+\\.(ts|tsx)$": "ts-jest",
	},
	testMatch: ["**/*.test.(ts|js)"],
	testPathIgnorePatterns: ["node_modules", "build"],
	testEnvironment: "node",
	setupFilesAfterEnv: ["./jest-test-setup.js"],
	resetModules: true,
};
