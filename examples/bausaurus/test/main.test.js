// import assert from "assert";
// import rubico from "rubico";
// import path from "path";
// import { describe, it } from "node:test";

// const { pipe, tap } = rubico;

// import { walkDirectory } from "../src/utils.js";
// import { onFile, writeFiles } from "../src/bausaurus.js";

// import body from "../src/Body.js";

// const inputDir = "test/sitedir";

// describe("Bausaurus", async function () {
//   it("run", () =>
//     pipe([
//       () => path.resolve(inputDir),
//       walkDirectory({
//         includePattern: ".md",
//         onFile: onFile({}),
//       }),
//       tap((params) => {
//         assert(true);
//       }),
//       writeFiles({ outputDir: path.resolve("dist"), body }),
//       tap((params) => {
//         assert(true);
//       }),
//     ])());
// });
