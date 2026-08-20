const fs = require("fs");
const path = require("path");
const cp = require("child_process");

const FILE_ENCODING = "utf8";
const NOME_MODULES_FOLDER = "node_modules";
const REQUIRE_JS_PATH = NOME_MODULES_FOLDER + "/requirejs/require.js";
const TSLIB_PATH = NOME_MODULES_FOLDER + "/tslib/tslib.js";
const FRAMEWORK_NAME = "@jhub-center/jhostify-script";
const FRAMEWORK_PATH = NOME_MODULES_FOLDER + "/" + FRAMEWORK_NAME;
const FAMEWORK_CONFIG_FILE = "jhostconfig.json";
const NOT_ALLOWED_CHARACTERS = " ";
const JHOSTYIFY_SCRPIT_LIB_LOCATION = "lib";
const FRAMEWORK_CONFIG_FIELDS = [ 
    [ "appName", "string" ],
    [ "htmlEntry", "string" ],
    [ "includeFramework", "boolean" ]
];
const FRAMEWORK_DEFAULT_CONFIG = {
    appName: "jhostify",
    htmlEntry: "index.html",
    includeFramework: true
};

const pkgData = require(path.resolve(FRAMEWORK_PATH) + "/package.json");
const JHOSTYIFY_SCRPIT_LIB_PATH = `./${JHOSTYIFY_SCRPIT_LIB_LOCATION}`;

let options;

function generateHtmlImports(projDir, rootDir, outDir) {
    const imports = {};
    Object.keys(pkgData.exports)
        .map(e => {
            if (e.startsWith(".")) e = e.substring(1);
            if (e.startsWith("/")) e = e.substring(1);
            return e;
        })
        .forEach(e => imports[`${FRAMEWORK_NAME}/${e}`] = `${JHOSTYIFY_SCRPIT_LIB_PATH}/${e}.js`);
    
    return resolveProjectImports(outDir, outDir, imports);
}

function resolveProjectImports(originalPath, omit, imports = {}) {
    log({msg: `Resolving imports in ${originalPath}`, level: 'DEBUG'});
    //fs.mkdirSync(path, { recursive: true });

    for (const entry of fs.readdirSync(originalPath, { withFileTypes: true })) {
        const filePath = `${originalPath}/${entry.name}`;

        if (entry.isDirectory()) {
            resolveProjectImports(filePath, omit, imports);
            continue;
        }

        if (entry.isFile() && path.extname(entry.name) === ".js") {
            const finalPath = filePath
                                .replace(`${omit}`, "")
                                .replaceAll("././", "./")
                                .replaceAll("//", "/");
            log({msg: `Resolving import: ${finalPath.substring(0, finalPath.length - 3)} to ${finalPath}`, level: 'DEBUG'});
            imports[finalPath.substring(0, finalPath.length - 3)] = finalPath;
        }
    }
    return imports;
}

function copyFramework(destDir) {
    const source = path.resolve(FRAMEWORK_PATH);
    const destination = path.resolve(`${destDir}/${JHOSTYIFY_SCRPIT_LIB_PATH}`);

    copyJsFiles(source, destination);
}

function copyJsFiles(sourceDir, destinationDir) {
    fs.mkdirSync(destinationDir, { recursive: true });

    for (const entry of fs.readdirSync(sourceDir, { withFileTypes: true })) {
        const sourcePath = path.join(sourceDir, entry.name);
        const destinationPath = path.join(destinationDir, entry.name);

        if (entry.isDirectory()) {
            copyJsFiles(sourcePath, destinationPath);
            continue;
        }

        if (entry.isFile() && path.extname(entry.name) === ".js") {
            fs.copyFileSync(sourcePath, destinationPath);
        }
    }
}

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

    const destDir = config.compilerOptions.outDir;
    const rootDir = config.compilerOptions.rootDir;

    if (!destDir) {
        throw "Destination not set. Aborting";
    }

    if (!rootDir) {
        throw "Root directory not set. Aborting";
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

    // 1. Compile frontend entry with tsc
    console.log("📦 Compiling TypeScript...");
    cp.execSync(`tsc`, { stdio: "inherit" });

    log({msg: "Compilation done!"});

    if (frameworkConfig) {
        log({msg: "Building App!"});
        const htmlImports = `<script type="importmap">{"imports":${JSON.stringify(generateHtmlImports(projDir, rootDir, destDir))}}</script>`;
        const scriptInject = `${htmlImports}<script type="module" src="index.js"></script>`;
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
        
        if (frameworkConfig.includeFramework) {
            copyFramework(destDir);
        }
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