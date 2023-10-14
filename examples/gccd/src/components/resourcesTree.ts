import rubico from "rubico";
const { pipe, map } = rubico;
import { type Context } from "@grucloud/bau-ui/context";
import treeView from "@grucloud/bau-ui/treeView";
import useQuery from "../utils/useQuery";

export default function (context: Context) {
  const { bau, css } = context;
  const { div, pre, a } = bau.tags;

  const className = css`
    overflow-x: scroll;
  `;

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

  return function ResourcesTree(props: any) {
    const { stateUrl } = props;

    if (!getResources.data.val && !getResources.error.val) {
      getResources.run(stateUrl);
    }

    return div(
      {
        class: className,
      },
      () =>
        getResources.data.val &&
        TreeView({ tree: toTree(getResources.data.val) })
    );
  };
}
