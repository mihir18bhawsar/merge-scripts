const fs = require("fs");
const iconv = require("iconv-lite");

const fileSearch = require("./filesearch.js");

function mergeDataFiles() {
	const schemas = JSON.parse(process.env.SCHEMAS);
	schemas.forEach((schema) => {
		let str = "";
		let results = fileSearch(schema);
		results.sort((a, b) => {
			return a.parent.localeCompare(b.parent);
		});
		files = results.map((r) => r.filePath);
		files.forEach((path) => {
			try {
				str += fs.readFileSync(path);
			} catch (e) {
			} finally {
				str += "\n\n";
			}
		});

		const resultDecoded = iconv.decode(str, "utf-8");

		const outputcontent = resultDecoded
			.split("\n")
			.filter((line) => !line.startsWith("--"))
			.join("\n");

		fs.writeFileSync(`./output_${schema}.sql`, outputcontent, "utf-8");
	});
}

module.exports = mergeDataFiles;
