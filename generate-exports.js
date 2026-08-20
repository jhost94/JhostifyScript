const fs = require('fs');
const path = require('path');
const { execSync } = require("child_process");

const OUTPUT_DIR_NAME = "dist";
const OUTPUT_PATH = path.resolve(__dirname, `./${OUTPUT_DIR_NAME}`);
const PACKAGE_PATH = path.resolve(__dirname, './dist/package.json');
const AMD_SCRIPT_PATH = path.resolve(__dirname, './dist/jhostifyScript.js');
const pkgData = require(PACKAGE_PATH);

pkgData.exports = {};

function walk(directory) {
    const result = [];

    for (const entry of fs.readdirSync(directory, { withFileTypes: true })) {
        const fullPath = path.join(directory, entry.name);

        if (entry.isDirectory()) {
            result.push(...walk(fullPath));
            continue;
        }

        if (entry.isFile() && entry.name.endsWith(".js")) {
            result.push(fullPath);
        }
    }

    return result;
}


function generateExports() {
    const files = walk(OUTPUT_PATH);
    const exports = {};

    for (const file of files) {
        const relative = path.relative(OUTPUT_PATH, file).replaceAll("\\", "/");

        let exportPath = relative.replace(/\.js$/, "");

        if (exportPath.endsWith("/index")) {
            exportPath = exportPath.substring(0, exportPath.length - "/index".length);
        }

        if (exportPath === "index") {
            continue;
        }


        const declaration = `./${relative.replace(/\.js$/, ".d.ts")}`;

        const javascript = `./${relative}`;


        exports[`./${exportPath}`] = {
            types: declaration,
            import: javascript
        };
    }

    return exports;
}

console.log("Generating exports...");

pkgData.exports = generateExports();
fs.writeFileSync(PACKAGE_PATH, JSON.stringify(pkgData, null, 4));

console.log("Exports generated successfully.");