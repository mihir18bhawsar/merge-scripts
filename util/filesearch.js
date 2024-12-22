const fs = require("fs");
const path = require("path");

function fileSearch(schema, dir = process.env.BASE_PATH) {
	let results = [];
	const items = fs.readdirSync(dir);
	for (let item of items) {
		const fullPath = path.join(dir, item);
		const stat = fs.statSync(fullPath);

		// recursive call
		if (stat.isDirectory()) {
			results = results.concat(fileSearch(schema, fullPath));
		} else {
			if (
				item.includes(schema) &&
				item.includes(process.env.FILEMATCHKEY)
			) {
				results.push({ filePath: fullPath, parent: dir }); // Add the full file path to results
			}
		}
	}
	return results;
}

module.exports = fileSearch;
