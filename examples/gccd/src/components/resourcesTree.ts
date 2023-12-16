import rubico from "rubico";
const { pipe, map, tap } = rubico;
import rubicox from "rubico/x";
const { pluck, prepend, callProp } = rubicox;
import { type Context } from "@grucloud/bau-ui/context";
import checkbox from "@grucloud/bau-ui/checkbox";
import treeView from "@grucloud/bau-ui/treeView";
import button from "@grucloud/bau-ui/button";

import useQuery from "../utils/useQuery";
import tableSkeleton from "./tableSkeleton";
import runLogsModal from "./run/runLogsModal";

export default function (context: Context) {
  const { bau, css, window, stores, config } = context;
  const { form, article, header, pre, a, p, label } = bau.tags;

  const className = css`
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    & article {
      overflow-x: scroll;
    }
  `;

  const Checkbox = checkbox(context, { color: "neutral", variant: "outline" });
  const TableSkeleton = tableSkeleton(context);
  const ButtonDelete = button(context, {
    variant: "solid",
    color: "danger",
  });

  const toTree = pipe([
    tap((params: any) => {
      console.log("toTree", params);
    }),
    map(({ resources = [], groupType }: any) =>
      pipe([
        () => resources,
        map(({ name, id, live, dependencies }: any) => ({
          data: { name, id, type: "resource" },
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
        (children: any) => ({
          data: { name: groupType, type: "group" },
          children,
        }),
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

  const getAllChecked = (event: any) => {
    const formEl = event.target.closest("form");
    const checkboxesChecked = formEl.querySelectorAll(
      'input[type="checkbox"][data-type="resource"]:checked'
    );
    return checkboxesChecked;
  };

  return function ResourcesTree({ data }: any) {
    // const { org_id, project_id, workspace_id } = data.val;
    console.assert(data);
    // console.assert(org_id);
    // console.assert(project_id);
    // console.assert(workspace_id);
    const RunLogsModal = runLogsModal(context);

    const selectedCount = bau.state(0);

    const query = useQuery(context);

    const onsubmit = async (event: any) => {
      event.preventDefault();
      const { org_id, project_id, workspace_id } = data.val;
      const formEl = event.target.closest("form");
      const ids = pluck("id")([...getAllChecked(event)]);

      const { run_id, container_id } = await stores.run.createQuery.run(
        { org_id, project_id, workspace_id },
        {
          kind: "destroy",
          engine: config.engine,
          args: pipe([
            () => ids,
            map(prepend("--id ")),
            callProp("join", " "),
          ])(),
        }
      );
      const search = new URLSearchParams(window.location.search);
      search.set("run_id", run_id);
      if (container_id) {
        search.set("container_id", container_id);
      }
      window.history.pushState("", "", `?${search}`);

      const modalEl = RunLogsModal({
        org_id,
        project_id,
        workspace_id,
        run_id,
        container_id,
      });
      formEl.append(modalEl);
      modalEl.showModal();
    };

    const getResources = query(
      async (stateUrl: any) => {
        try {
          const response = await fetch(stateUrl);
          if (response.ok) {
            const res = await response.json();
            return res.result?.lives?.results[0].results;
          }
          throw Error(response.statusText);
        } catch (error) {
          throw error;
        }
      },
      { initialState: [] }
    );

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
        event.stopPropagation();
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

        const checkboxesChecked = getAllChecked(event);
        selectedCount.val = checkboxesChecked.length;
      };

    const renderMenuItem = ({ item, parent, depth }: any) => {
      const { id, name, content, type } = item.data;
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
            "data-type": type,
          }),
        content ? pre(content) : a({}, name)
      );
    };

    const TreeView = treeView(context, { renderMenuItem, variant: "plain" });

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

    return form(
      {
        class: className,
        onsubmit,
      },
      header(
        p(
          ButtonDelete(
            { type: "submit" },
            () => `Delete ${selectedCount.val} Resource(s)`
          )
        )
      ),
      article(() =>
        getResources.loading.val
          ? TableSkeleton({ columnsSize: 2, rowSize: 20 })
          : TreeView({ tree: toTree(getResources.data.val) })
      )
    );
  };
}
