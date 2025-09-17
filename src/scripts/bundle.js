var fs = require("fs");
var path = require("path");
var cp = require("child_process");

function buildFrontend() {
    const projDir = getDirNAbove(process.argv[1], 5);
    
    console.log("Gathering config options");
    const configStr = cp.execSync(`tsc --showConfig`, { encoding: 'utf-8', stdio: "pipe" });

    if (!configStr) {
        throw "No config found";
    }

    const config = JSON.parse(configStr);

    if (!config.compilerOptions.outFile) {
        throw "No outFile configured";
    }

    const destDir = path.resolve(projDir, normalizePath(path.dirname(config.compilerOptions.outFile)));
    const destFile = path.resolve(destDir, normalizePath(path.basename(config.compilerOptions.outFile)));

    // 1. Compile frontend entry with tsc
    console.log("📦 Compiling TypeScript...");
    cp.execSync(`tsc`, { stdio: "inherit" });

    // 2. Collect required files
    const requireJs = fs.readFileSync(path.resolve(projDir, "node_modules/requirejs/require.js"), "utf8");
    const tslibJs = fs.readFileSync(path.resolve(projDir, "node_modules/tslib/tslib.js"), "utf8");
    const jhostifyScriptJs = fs.readFileSync(path.resolve(projDir, "node_modules/@jhub-center/jhostify-script/jhostifyScript.js"), "utf8");
    const entryCode = fs.readFileSync(destFile, "utf8");

    // 3. Concatenate
    const bundle = `
    /* --- require.js --- */
    ${requireJs}

    /* --- tslib.js --- */
    ${tslibJs}

    /* --- jhostifyScript.js --- */
    ${jhostifyScriptJs}

    /* --- app code -- INSERT APP NAME HERE -- --- */
    ${entryCode}
    `;

    fs.writeFileSync(destFile, bundle);
    console.log("Compilation done!");
}

function getDirNAbove(filePath, count) {
    if (count < 1) return filePath;
    return getDirNAbove(path.dirname(filePath), --count);
}

function normalizePath(path) {
    if (path.startsWith("./")) {
        return path.slice(2);
    }
    return path
}

module.exports = { buildFrontend };