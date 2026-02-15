const fs = require("fs");
const path = require("path");
const cp = require("child_process");

const FILE_ENCODING = "utf8";
const NOME_MODULES_FOLDER = "node_modules";
const REQUIRE_JS_PATH = NOME_MODULES_FOLDER + "/requirejs/require.js";
const TSLIB_PATH = NOME_MODULES_FOLDER + "/tslib/tslib.js";
const FRAMEWORK_PATH = NOME_MODULES_FOLDER + "/@jhub-center/jhostify-script/jhostifyScript.js";
const FAMEWORK_CONFIG_FILE = "jhostconfig.json";
const NOT_ALLOWED_CHARACTERS = " ";
const FRAMEWORK_CONFIG_FIELDS = [ 
    [ "appName", "string" ],
    [ "htmlEntry", "string" ]
];
const FRAMEWORK_DEFAULT_CONFIG = {
    appName: "jhostify",
    htmlEntry: "index.html"
};

let options;

function buildFrontend() {
    const projDir = getProjectDir(process.argv[1]);
    options = getOptions(process.argv);
    
    log({msg: "Running with Debug ON", level: 'DEBUG'});
    
    log({msg: "Gathering config options"});
    const configStr = cp.execSync(`tsc --showConfig`, { encoding: FILE_ENCODING, stdio: "pipe" });

    if (!configStr) {
        throw "No config found";
    }

    const config = JSON.parse(configStr);

    if (!config.compilerOptions.outFile) {
        throw "No outFile configured";
    }

    const frameworkConfigStr = getFrameWorkConfig(projDir);
    let frameworkConfig;
    if (frameworkConfigStr) {
        frameworkConfig = JSON.parse(frameworkConfigStr);
    }

    if (frameworkConfig) {
        validateFrameworkConfig(frameworkConfig);
        frameworkConfig = applyFrameworkConfigDefaults(frameworkConfig);
        log({msg: ["Framework config: ", frameworkConfig], level: 'DEBUG'});
    }

    const destDir = path.resolve(projDir, normalizePath(path.dirname(config.compilerOptions.outFile)));
    const destFile = path.resolve(destDir, normalizePath(path.basename(config.compilerOptions.outFile)));

    // 1. Compile frontend entry with tsc
    console.log("📦 Compiling TypeScript...");
    cp.execSync(`tsc`, { stdio: "inherit" });

    // 2. Collect required files
    const requireJs = fs.readFileSync(path.resolve(projDir, REQUIRE_JS_PATH), FILE_ENCODING);
    const tslibJs = fs.readFileSync(path.resolve(projDir, TSLIB_PATH), FILE_ENCODING);
    const jhostifyScriptJs = fs.readFileSync(path.resolve(projDir, FRAMEWORK_PATH), FILE_ENCODING);
    const entryCode = fs.readFileSync(destFile, FILE_ENCODING);

    // 3. Concatenate
    const bundle = `
    /* --- require.js --- */
    ${requireJs}

    /* --- tslib.js --- */
    ${tslibJs}

    /* --- jhostifyScript.js --- */
    ${jhostifyScriptJs}

    /* --- app code --- */
    ${entryCode}
    `;

    fs.writeFileSync(destFile, bundle);
    log({msg: "Compilation done!"});

    if (frameworkConfig) {
        log({msg: "Building App!"});
        const scriptInject = `<script>
        require(['index'], function(main) {
        main.render(); // assuming your frontend exports a start() function
        });
  </script>`;
        const tag1 = `<${frameworkConfig.appName}/>`;
        const tag2 = `<${frameworkConfig.appName}></${frameworkConfig.appName}>`;
        let iHtml = fs.readFileSync(path.resolve(projDir, 'src', frameworkConfig.htmlEntry), FILE_ENCODING);
        if (iHtml.includes(tag1)) {
            iHtml = iHtml.replace(tag1, scriptInject);
        } else if (iHtml.includes(tag2)) {
            /**
             * TODO: later fix this so it can find the tag despite it has any  white characters
             */
            iHtml = iHtml.replace(tag2, scriptInject);
        }
        fs.writeFileSync(path.resolve(destDir, frameworkConfig.htmlEntry), iHtml);
    }
}

function getDirNAbove(filePath, count) {
    if (count < 1) return filePath;
    return getDirNAbove(path.dirname(filePath), --count);
}

function getFrameWorkConfig(projDir) {
    try {
        return fs.readFileSync(path.resolve(projDir, FAMEWORK_CONFIG_FILE), FILE_ENCODING);
    } catch {
        return undefined;
    }
}

function getProjectDir(filePath) {
    if (path.basename(filePath) === NOME_MODULES_FOLDER) 
        return path.dirname(filePath);
    return getProjectDir(path.dirname(filePath));
}

function normalizePath(path) {
    if (path.startsWith("./")) {
        return path.slice(2);
    }
    return path
}

function validateFrameworkConfig(config) {
    if(config) {
        FRAMEWORK_CONFIG_FIELDS.forEach(f => {
           if (config[f[0]]) {
            switch(f[1]) {
                case 'string':
                    validStringField(config[f[0]], f[0]);
            }
           }
        });
    }
}

function applyFrameworkConfigDefaults(config) {
    if (config) {
        FRAMEWORK_CONFIG_FIELDS.forEach(f => {
           if (!config[f[0]]) {
                config[f[0]] = FRAMEWORK_DEFAULT_CONFIG[f[0]];
           }
        });
    }
    return config;
}

function validStringField(field, fieldName) {
    const invalidChars = field
        .split()
        .filter(c => NOT_ALLOWED_CHARACTERS.includes(c))
        .join(', ');
    if(invalidChars.length > 0) {
            throw `Prohibited characters found in ${fieldName}. Characters: ${invalidChars}`;
        }
}

function getOptions(args) {
    log({msg: ["Args: ", args]});
    const debug = args.includes("--debug")
    return {
        runner: args[0],
        path: args[1],
        debug
    }
}

function log(msg = {msg: undefined, level: 'INFO'}) {
    if (!msg.level) msg.level = 'INFO';
    
    switch (msg.level) {
        case 'INFO':
            if (typeof msg.msg === "string") console.log(msg.msg);
            else console.log(...msg.msg);
            break;
        case 'DEBUG':
            if (options.debug) {
                if (typeof msg.msg === "string") console.log(msg.msg);
            else console.log(...msg.msg);
            }
           break;
        default:
            if (typeof msg.msg === "string") console.log(msg.msg);
            else console.log(...msg.msg);
            break;
    }
}

module.exports = { buildFrontend };