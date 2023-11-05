import { type Context } from "@grucloud/bau-ui/context";
import tabs, { Tabs } from "@grucloud/bau-ui/tabs";
import runDetailContent from "./runDetailContent";
import resourcesTree from "../resourcesTree";

export default function (context: Context) {
  const RunDetailContent = runDetailContent(context);
  const ResourcesTree = resourcesTree(context);

  return function RunTabs(props: any) {
    const tabDefs: Tabs = [
      {
        name: "summary",
        Header: () => "Run Summary",
        Content: () => RunDetailContent(props),
      },
      {
        name: "resources",
        Header: () => "Resources",
        Content: () => ResourcesTree(props),
      },
    ];

    const Tabs = tabs(context, { tabDefs, variant: "plain", color: "neutral" });

    return Tabs(props);
  };
}
