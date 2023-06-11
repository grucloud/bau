import { css } from "goober";
//import { faker } from "@faker-js/faker";

import tabs from "./tabs";
import button from "../button";

export default (context) => {
  const { tr, bau } = context;
  const { section, div, h3, h2, p } = bau.tags;

  // const createRandomTab = () => ({
  //   name: faker.lorem.word(),
  //   Header: ({ name }) => div(name),
  //   Content: () => div(faker.lorem.paragraph()),
  // });

  const createRandomTab = () => ({
    name: "New Tab",
    Header: ({ name }) => div(name),
    Content: () => div("My Paragraph"),
  });

  const Button = button(context);

  const tabDefs = [
    {
      name: "Tab1",
      Header: ({ store }) => div("TAB 1"),
      Content: ({ store }) =>
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
              onclick: (event) =>
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
              onclick: (event) =>
                event.srcElement.dispatchEvent(
                  new CustomEvent("tab.remove", {
                    detail: { tabName: "Tab2" },
                    bubbles: true,
                  })
                ),
            },
            "Remove Tab"
          ),
          p(faker.lorem.paragraph())
        ),

      enter: async () => console.log("tab1 enter"),
      exit: async () => console.log("tab1 exit"),
    },
    {
      name: "Tab2",
      Header: ({ tab }) => div("TAB 2"),
      Content: ({ store }) => div(p(faker.lorem.paragraph())),
      enter: async () => console.log("tab2 enter"),
      exit: async () => console.log("tab2 exit"),
    },
    {
      name: "Tab Disabled",
      disabled: true,
      Header: ({ store }) => div("Tab Disabled"),
    },
  ];

  const Tabs = tabs(context, { tabDefs });

  return () => section(h2(tr("Tabs Examples")), h3("Info"), Tabs({}));
};
