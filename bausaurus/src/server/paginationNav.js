import assert from "assert";
import rubico from "rubico";

import { filenameToHref } from "./utils.js";

const { pipe, tap, get } = rubico;

const walkTree =
  ({ nodes = [], hrefToMatch }) =>
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
            const result = {};
            index > 0 && (result.previous = children[index - 1].data);
            index < children.length - 1 &&
              (result.next = children[index + 1].data);
            return result;
          } else if (children[index].children) {
            const result = walkTree({
              nodes: [...nodes, children[index]],
              hrefToMatch,
            })(children[index]);
            if (result) return result;
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
      assert(filename);
    }),
    () => filename,
    filenameToHref(site),
    (hrefToMatch) => walkTree({ hrefToMatch })(navBarTree),
    tap((params) => {
      assert(true);
    }),
  ])();
