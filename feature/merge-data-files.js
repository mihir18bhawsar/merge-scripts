const fs = require("fs");
const iconv = require("iconv-lite");

const fileSearch = require("../util/filesearch.js");
const path = require("path");
const { exit } = require("process");

function mergeDataFiles() {
	let schemas;
	try {
		schemas = JSON.parse(process.env.SCHEMAS);
	} catch (e) {
		console.log("problem with schema env");
		exit(0);
	}
	schemas.forEach((schema) => {
		let str = "";
		let results;
		try {
			results = fileSearch(schema);
		} catch (e) {
			console.log("problem with base path");
			exit(0);
		}
		results.sort((a, b) => {
			return a.parent.localeCompare(b.parent);
		});
		files = results.map((r) => r.filePath);
		files.forEach((path) => {
			try {
				str += fs.readFileSync(path);
			} catch (e) {
				console.log("path doesn't exist");
			} finally {
				str += "\n\n";
			}
		});

		const resultDecoded = iconv.decode(str, "utf-8");

		const outputcontent = resultDecoded
			.split("\n")
			.filter((line) => !line.startsWith("--"))
			.join("\n");

		try {
			fs.writeFileSync(
				path.join(process.env.OUTPUT_PATH, `output_${schema}.sql`),
				outputcontent,
				"utf-8"
			);
		} catch (e) {
			console.log("problem with output path");
			exit(0);
		}
	});
}

module.exports = mergeDataFiles;
