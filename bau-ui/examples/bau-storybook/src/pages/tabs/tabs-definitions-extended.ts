import { Tabs } from "@grucloud/bau-ui/tabs";
import { Context } from "@grucloud/bau-ui/context";
import button from "@grucloud/bau-ui/button";

export default (context: Context): Tabs => {
  const { bau, css } = context;
  const { div, p } = bau.tags;

  const Button = button(context);

  const createRandomTab = () => ({
    name: "New Tab",
    Header: ({ name }: any) => div(name),
    Content: () => div("My Paragraph"),
  });

  return [
    {
      name: "Tab1",
      Header: () => div("TAB 1"),
      Content: () =>
        div(
          {
            class: css`
              display: flex;
              flex-direction: column;
              gap: 1rem;
            `,
          },
          Button(
            {
              color: "primary",
              variant: "outline",
              onclick: (event: any) =>
                event.srcElement.dispatchEvent(
                  new CustomEvent("tab.add", {
                    detail: { tab: createRandomTab() },
                    bubbles: true,
                  })
                ),
            },
            "Add a new Tab"
          ),
          Button(
            {
              color: "danger",
              variant: "solid",
              onclick: (event: any) =>
                event.srcElement.dispatchEvent(
                  new CustomEvent("tab.remove", {
                    detail: { tabName: "New Tab" },
                    bubbles: true,
                  })
                ),
            },
            "Remove Tab"
          ),
          p("My Content")
        ),

      enter: async () => console.log("tab1 enter"),
      exit: async () => console.log("tab1 exit"),
    },
    {
      name: "Tab2",
      Header: () => div("TAB 2"),
      Content: () => div(p("My TAB 2 Content")),
      enter: async () => console.log("tab2 enter"),
      exit: async () => console.log("tab2 exit"),
    },
    {
      name: "Tab Disabled",
      disabled: true,
      Header: () => div("Tab Disabled"),
      Content: () => div(p("My Content")),
    },
  ];
};
