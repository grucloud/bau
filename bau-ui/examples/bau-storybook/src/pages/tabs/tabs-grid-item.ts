import tabs, { Tabs } from "@grucloud/bau-ui/tabs";
import { Context } from "@grucloud/bau-ui/context";

export default (context: Context, options?: any) => {
  const { bau } = context;
  const { div, p, a } = bau.tags;

  const tabDefs: Tabs = [
    {
      name: "Tab1",
      Header: () => a({ href: "#Tab1" }, "TAB 1"),
      Content: () => div(p("My Tab 1 Content")),
    },
    {
      name: "Tab2",
      Header: () => a({ href: "#Tab2" }, "TAB 2"),
      Content: () => div(p("My tab 2 Content")),
    },
  ];

  const Tabs = tabs(context, { tabDefs, ...options });

  return (props: any) => Tabs(props);
};
