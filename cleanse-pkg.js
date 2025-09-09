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


let content = fs.readFileSync(AMD_SCRIPT_PATH, "utf-8");
content = content
    .split("\n")
    .map(line => {
      if (line.trim().startsWith("define(")) {
        return line.replace(
          /(['"])framework\/([^'"]+?)(?:\.js)?\1/g,
          (m, quote, id) => `${quote}${PREFIX}framework/${id}${quote}`
        );
      }
      return line;
    })
    .join("\n");
content = content
    .split("\n")
    .map(line => {
      if (line.trim().startsWith("define(")) {
        return line.replace(
          /(['"])utils\/([^'"]+?)(?:\.js)?\1/g,
          (m, quote, id) => `${quote}${PREFIX}utils/${id}${quote}`
        );
      }
      return line;
    })
    .join("\n");
fs.writeFileSync(AMD_SCRIPT_PATH, content, "utf8");