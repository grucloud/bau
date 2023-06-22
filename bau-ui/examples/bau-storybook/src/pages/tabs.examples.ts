import tabs, { Tabs } from "@grucloud/bau-ui/tabs";
import button from "@grucloud/bau-ui/button";
import { Context } from "../context";

export default (context: Context) => {
  const { tr, bau, css } = context;
  const { section, div, h3, h2, p, i } = bau.tags;

  const TabsContainer = (...children: any[]) =>
    div(
      {
        class: css`
          border: 1px dotted var(--color-gray-500);
          padding: 1rem;
        `,
      },
      ...children
    );

  const createRandomTab = () => ({
    name: "New Tab",
    Header: ({ name }: any) => div(name),
    Content: () => div("My Paragraph"),
  });

  const Button = button(context);

  const tabDefs: Tabs = [
    {
      name: "Tab1",
      Header: () => div("TAB"),
      Content: () => div(p("My Tab 1 Content")),
    },
    {
      name: "Tab2",
      Header: () => div("TAB 2"),
      Content: () => div(p("My tab 2 Content")),
    },
    {
      name: "Tab Disabled",
      disabled: true,
      Header: () => div("Tab Disabled"),
      Content: () => div(p("My tab Disabled")),
    },
  ];

  const Tabs = tabs(context, { tabDefs });

  const tabDefsExtented: Tabs = [
    {
      name: "Tab1",
      Header: () =>
        div(
          i(
            {
              class: css`
                font-size: 1rem;
                margin: 0 0.3rem;
              `,
            },
            "\u2302"
          ),
          "TAB 1"
        ),
      Content: () =>
        div(
          {
            class: css`
              > button {
                margin: 10px;
              }
            `,
          },
          Button(
            {
              raised: true,
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
              accent: true,
              onclick: (event: any) =>
                event.srcElement.dispatchEvent(
                  new CustomEvent("tab.remove", {
                    detail: { tabName: "Tab2" },
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
      Content: () => div(p("My Content")),
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

  const TabsExtended = tabs(context, { tabDefs: tabDefsExtented });

  return () =>
    section(
      { id: "tabs" },
      h2(tr("Tabs")),
      h3("Basic Tabs"),
      TabsContainer(Tabs({})),
      h3("Full Witdth"),
      TabsContainer(
        Tabs({
          class: css`
            & ul {
              justify-content: center;
              & li {
                flex-grow: 1;
              }
            }
          `,
        })
      ),
      h3("Centered"),
      TabsContainer(
        Tabs({
          class: css`
            & ul {
              justify-content: center;
            }
          `,
        })
      ),
      h3("Bottom Header"),
      TabsContainer(
        Tabs({
          class: css`
            flex-direction: column-reverse;
          `,
        })
      ),
      h3("Uppercase header"),
      TabsContainer(
        Tabs({
          class: css`
            & ul {
              & li {
                text-transform: uppercase;
              }
            }
          `,
        })
      ),
      h3("Horizontal Tabs"),
      TabsContainer(
        Tabs({
          class: css`
            flex-direction: row;
            & ul {
              border-right: 2px solid var(--color-primary);
              border-bottom: none;
              margin-right: 1rem;
              flex-direction: column;
              align-items: flex-start;
            }
          `,
        })
      ),
      h3("Add and remove tabs"),
      TabsContainer(TabsExtended({}))
    );
};
