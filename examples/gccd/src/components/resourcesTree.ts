import rubico from "rubico";
const { pipe, map } = rubico;
import { type Context } from "@grucloud/bau-ui/context";
import treeView from "@grucloud/bau-ui/treeView";
import useQuery from "../utils/useQuery";
import tableSkeleton from "./tableSkeleton";

export default function (context: Context) {
  const { bau, css } = context;
  const { div, pre, a } = bau.tags;

  const className = css`
    overflow-x: scroll;
  `;
  const TableSkeleton = tableSkeleton(context);

  const query = useQuery(context);

  const getResources = query(
    async (stateUrl: any) => {
      try {
        const response = await fetch(stateUrl);
        if (response.ok) {
          const res = await response.json();
          return res.result.lives.results[0].results;
        }
        throw response;
      } catch (error) {
        throw error;
      }
    },
    { initialState: null }
  );

  const toTree = pipe([
    map(({ resources, groupType }: any) =>
      pipe([
        () => resources,
        map(({ name, live, dependencies }: any) => ({
          data: { name },
          children: [
            {
              data: {
                name: "live data",
              },
              children: [{ data: { content: JSON.stringify(live, null, 4) } }],
            },
            {
              data: {
                name: "dependencies",
              },
              children: [
                { data: { content: JSON.stringify(dependencies, null, 4) } },
              ],
            },
          ],
        })),
        (children: any) => ({ data: { name: groupType }, children }),
      ])()
    ),
    // tap((params: any) => {
    //   console.log(params);
    // }),
    (children: any) => ({ data: { name: "Root Menu" }, children }),
  ]);

  const renderMenuItem = ({ name, content }: any) =>
    content ? pre(content) : a({}, name);

  const TreeView = treeView(context, { renderMenuItem, variant: "plain" });

  return function ResourcesTree({ data }: any) {
    bau.derive(() => {
      const { stateUrl } = data.val;
      if (stateUrl && !getResources.data.val && !getResources.error.val) {
        getResources.run(stateUrl);
      }
    });

    return div(
      {
        class: className,
      },
      () =>
        getResources.loading.val
          ? TableSkeleton({ columnsSize: 2, rowSize: 20 })
          : TreeView({ tree: toTree(getResources.data.val) })
    );
  };
}
