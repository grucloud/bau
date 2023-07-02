import assert from "assert";
import rubico from "rubico";
import Path from "path";
import fs from "fs/promises";

const { pipe, tap, get } = rubico;

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
    Object.fromEntries,
    JSON.stringify,
    (hashmap) =>
      fs.writeFile(Path.resolve(rootDir, outDir, "hashmap.json"), hashmap),
  ])();
