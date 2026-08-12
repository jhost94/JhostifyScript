const fs = require('fs');
const path = require('path');
const { execSync } = require("child_process");

const PACKAGE_PATH = path.resolve(__dirname, './dist/package.json');
const AMD_SCRIPT_PATH = path.resolve(__dirname, './dist/jhostifyScript.js');
const PREFIX = "@jhub-center/jhostify-script/";
const pkgData = require(PACKAGE_PATH);
delete pkgData.scripts;

fs.writeFile(PACKAGE_PATH, JSON.stringify(pkgData, null, 4), function (err) {
    if (err) throw err;
});


function resolveImport(importPath, filePath, distDir, packageName) {
    // Already a package import / absolute import
    if (!importPath.startsWith(".")) {
        return importPath;
    }

    // Resolve the relative import from the importing file
    const absolutePath = path.resolve(
        path.dirname(filePath),
        importPath
    );

    // Convert it back into a path relative to dist/
    let relativePath = path.relative(
        distDir,
        absolutePath
    );

    // Node paths → URL paths
    relativePath = relativePath.split(path.sep).join("/");

    // Remove .js if it exists
    relativePath = relativePath.replace(/\.js$/, "");

    return `${packageName}/${relativePath}`;
}

function rewriteImports(content, filePath, distDir, packageName) {
    return content.replace(
        /\bfrom\s+["']([^"']+)["']/g,
        (match, importPath) => {
            console.log(`Fixing from: ${match}${importPath}`);
            const resolved = resolveImport(
                importPath,
                filePath,
                distDir,
                packageName
            );
            console.log(`Fixing to: ${resolved}`);

            return `from "${resolved}"`;
        }
    ).replace(
        /\bimport\s+["']([^"']+)["']/g,
        (match, importPath) => {
            console.log(`Fixing from: ${match}${importPath}`);
            const resolved = resolveImport(
                importPath,
                filePath,
                distDir,
                packageName
            );
            console.log(`Fixing to: ${resolved}`);

            return `import "${resolved}"`;
        }
    );
}


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


function fixImports() {
    const rootDir = "src";
    const rootDirMirror = "dist";
    const packageName = "@jhub-center/jhostify-script";
    const files = walk(rootDirMirror);

    files.map(e => e.replace(rootDir, rootDirMirror));

    for (const file of files) {
        console.log(`Fixing imports for: ${file}`);
        const relative = path.relative(__dirname, file).replaceAll("\\", "/");
        console.log(`Relative path: ${file}`);
        const content = fs.readFileSync(relative, "utf-8");
        
        const rewritten = rewriteImports(content, relative, rootDirMirror, packageName);

        fs.writeFileSync(relative, rewritten, "utf8");
    }
}

console.log("Fixing imports...");

fixImports();

console.log("Imports fixed successfully.");