const mergeDataFiles = require("./merge-data-files.js");
const splitFunctionAndTables = require("./split-function-and-tables.js");
require("dotenv").config();
switch (process.env.MODE) {
	case "1":
		mergeDataFiles();
		break;
	case "2":
		splitFunctionAndTables();
		break;
	default:
		break;
}
