import { type Context } from "@grucloud/bau-ui/context";
import tabs, { Tabs } from "@grucloud/bau-ui/tabs";
import runDetailContent from "./runDetailContent";
import resourcesTree from "../resourcesTree";

export default function (context: Context) {
  const { bau, css } = context;
  const { div, a } = bau.tags;
  const className = css``;
  const RunDetailContent = runDetailContent(context);
  const ResourcesTree = resourcesTree(context);

  return function RunTabs(props: any) {
    const tabDefs: Tabs = [
      {
        name: "summary",
        Header: () => a({ href: "#summary" }, "Run Summary"),
        Content: () => RunDetailContent(props),
      },
      {
        name: "resources",
        Header: () => a({ href: "#resources" }, "Resources"),
        Content: () => ResourcesTree(props),
      },
    ];

    const Tabs = tabs(context, { tabDefs, variant: "plain", color: "neutral" });

    return div(
      {
        class: className,
      },
      Tabs(props)
    );
  };
}
