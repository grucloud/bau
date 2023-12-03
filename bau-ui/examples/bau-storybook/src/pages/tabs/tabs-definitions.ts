import { Tabs } from "@grucloud/bau-ui/tabs";
import { Context } from "@grucloud/bau-ui/context";

export default (context: Context): Tabs => {
  const { bau } = context;
  const { div, p } = bau.tags;

  return [
    {
      name: "Tab1",
      Header: () => "TAB",
      Content: () => div(p("My Tab 1 Content")),
    },
    {
      name: "Tab2",
      Header: () => "TAB 2",
      Content: () => div(p("My tab 2 Content")),
    },
  ];
};
