import rubico from "rubico";
const { pipe, map, tap } = rubico;
import { type Context } from "@grucloud/bau-ui/context";
import checkbox from "@grucloud/bau-ui/checkbox";
import treeView from "@grucloud/bau-ui/treeView";
import useQuery from "../utils/useQuery";
import tableSkeleton from "./tableSkeleton";

export default function (context: Context) {
  const { bau, css } = context;
  const { div, pre, a, label } = bau.tags;

  const className = css`
    overflow-x: scroll;
  `;

  const Checkbox = checkbox(context, { color: "neutral", variant: "outline" });

  const TableSkeleton = tableSkeleton(context);

  const query = useQuery(context);

  const getResources = query(
    async (stateUrl: any) => {
      try {
        const response = await fetch(stateUrl);
        if (response.ok) {
          const res = await response.json();
          return res.result?.lives?.results[0].results;
        }
        throw response;
      } catch (error) {
        throw error;
      }
    },
    { initialState: [] }
  );

  const toTree = pipe([
    tap((params: any) => {
      console.log("toTree", params);
    }),
    map(({ resources = [], groupType }: any) =>
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
    tap((params: any) => {
      console.log("toTree", params);
    }),
    (children: any) => ({
      data: { name: "Resources" },
      expanded: true,
      children,
    }),
  ]);

  const getCheckboxId = ({ id, name }: any) => id ?? name;
  const getCheckboxEl = (data: any): HTMLInputElement =>
    window.document.getElementById(getCheckboxId(data)) as HTMLInputElement;

  const walkTree =
    ({ onNode }: any) =>
    (item: any) => {
      onNode(item);
      const { children = [] } = item;
      children.map(walkTree({ onNode }));
    };

  const isParentIndeterminate = ({ parent }: any) => {
    if (parent) {
      const { children } = parent;
      const parentCheckboxEl = getCheckboxEl(parent.data);
      if (parentCheckboxEl) {
        const allUnchecked = children.every((child: any) => {
          const { checked, indeterminate } = getCheckboxEl(child.data);
          return !checked && !indeterminate;
        });
        parentCheckboxEl.indeterminate =
          !allUnchecked &&
          children.some((child: any) => !getCheckboxEl(child.data).checked);
        parentCheckboxEl.checked = children.every(
          (child: any) => getCheckboxEl(child.data).checked
        );
      }
      isParentIndeterminate({ parent: parent.parent });
    }
  };

  const onclickCheckbox =
    ({ item, parent }: any) =>
    (event: any) => {
      isParentIndeterminate({ parent });
      walkTree({
        onNode: (node: any) => {
          const checkboxEl = getCheckboxEl(node.data);
          if (checkboxEl) {
            checkboxEl.checked = event.target.checked;
            checkboxEl.indeterminate = false;
          }
        },
      })(item);
      event.stopPropagation();
    };

  const renderMenuItem = ({ item, parent, depth }: any) => {
    const { id, name, content } = item.data;
    const checkboxId = id ?? name;
    return label(
      {
        class: css`
          display: flex;
          flex-direction: row;
          align-items: center;
          padding-right: 1rem;
        `,
        onclick: (event: any) => event.stopPropagation(),
      },
      depth <= 3 &&
        Checkbox({
          onclick: onclickCheckbox({ item, parent }),
          name: checkboxId,
          id: checkboxId,
        }),
      content ? pre(content) : a({}, name)
    );
  };

  const TreeView = treeView(context, { renderMenuItem, variant: "plain" });

  return function ResourcesTree({ data }: any) {
    bau.derive(() => {
      const { stateUrl } = data.val;
      if (
        stateUrl &&
        !getResources.data.val.length &&
        !getResources.error.val
      ) {
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
