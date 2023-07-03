import assert from "assert";
import rubico from "rubico";
import rubicox from "rubico/x/index.js";

import Path from "path";
import fs from "fs/promises";

const { pipe, tap, map } = rubico;
const { callProp, prepend } = rubicox;

const chunckNameToUrl = pipe([callProp("replace", ".md", ""), prepend("/")]);

export const pagesHashMapToString = pipe([
  Object.fromEntries,
  map.entries(([chunkName, hash]) => [chunckNameToUrl(chunkName), hash]),
  JSON.stringify,
]);

export const writePagesHashMap = ({
  site: { rootDir, outDir },
  pageToHashMap,
}) =>
  pipe([
    tap(() => {
      assert(rootDir);
      assert(outDir);
      assert(pageToHashMap);
    }),
    () => pageToHashMap,
    pagesHashMapToString,
    (hashmap) =>
      fs.writeFile(Path.resolve(rootDir, outDir, "hashmap.json"), hashmap),
  ])();
