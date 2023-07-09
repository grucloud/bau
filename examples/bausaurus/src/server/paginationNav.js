import assert from "assert";
import rubico from "rubico";
import rubicox from "rubico/x/index.js";

const { pipe, tap, eq, switchCase, get, map, some } = rubico;
const { callProp, pluck } = rubicox;

const walkTree =
  ({ result, nodes = [], hrefToMatch }) =>
  (node) =>
    pipe([
      tap((params) => {
        assert(hrefToMatch);
        assert(nodes);
      }),
      () => node,
      get("children", []),
      (children) => {
        for (let index = 0; index < children.length; index++) {
          if (children[index].data?.href === hrefToMatch) {
            index > 0 && (result.previous = children[index - 1].data);
            index < children.length - 1 &&
              (result.next = children[index + 1].data);
            return result;
          } else if (children[index].children) {
            walkTree({
              result,
              nodes: [...nodes, children[index]],
              hrefToMatch,
            })(children[index]);
          }
        }
      },
      tap((params) => {
        assert(true);
      }),
    ])();

export const navBarTreeToPaginationNav = ({ navBarTree, site, filename }) =>
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
      const result = {};
      walkTree({ result, hrefToMatch })(navBarTree);
      return result;
    },
  ])();
