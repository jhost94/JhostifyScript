import typescript from "@rollup/plugin-typescript";
import { nodeResolve } from "@rollup/plugin-node-resolve";

/**
 * Rollup config to build a UMD bundle for RequireJS
 * while still using tsc for ESM/CJS + type declarations.
 */
export default {
  input: "src/jhostifyScript.ts",
  output: {
    file: "dist/jhostifyScript.umd.js",
    format: "umd",
    name: "@jhub-center/jhostify-script",
    sourcemap: true
  },
  plugins: [
    nodeResolve(),
    typescript({ tsconfig: "./tsconfig.json" })
  ]
};
