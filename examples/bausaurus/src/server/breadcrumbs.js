import assert from "assert";
import rubico from "rubico";
import rubicox from "rubico/x/index.js";

const { pipe, tap, eq, switchCase, get, map } = rubico;
const { callProp, pluck } = rubicox;

const walkTree = ({ result, nodes = [], hrefToMatch }) =>
  pipe([
    tap((params) => {
      assert(hrefToMatch);
      assert(nodes);
    }),
    switchCase([
      eq(get("data.href"), hrefToMatch),
      pipe([
        tap((params) => {
          result.push(...pluck("data")(nodes));
        }),
      ]),
      get("children"),
      pipe([
        get("children"),
        map((node) =>
          walkTree({ result, nodes: [...nodes, node], hrefToMatch })(node)
        ),
      ]),
      () => undefined,
    ]),
    tap((params) => {
      assert(true);
    }),
  ]);

export const navBarTreeToBreadcrumbs = ({ navBarTree, site, filename }) =>
  pipe([
    tap((params) => {
      assert(navBarTree);
      assert(site);
      assert(site.rootDir);
      assert(filename);
    }),
    () => filename,
    callProp("replace", site.rootDir, ""),
    callProp("replace", ".md", ""),
    (hrefToMatch) => {
      const result = [];
      walkTree({ result, hrefToMatch })(navBarTree);
      return result;
    },
  ])();
