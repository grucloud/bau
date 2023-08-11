import badge from "@grucloud/bau-ui/badge";
import componentGrid from "./componentGrid";
import { Context } from "../context";

export default (context: Context) => {
  const { bau, css } = context;
  const { section, div, h3, h2 } = bau.tags;
  componentGrid;
  const Container = (...children: any[]) =>
    div(
      {
        class: css`
          border: 1px dotted var(--color-gray-500);
          padding: 1rem;
        `,
      },
      ...children
    );

  const ComponentGrid = componentGrid(context);

  const Badge = badge(context);
  const BadgeCutom = badge(context, {
    class: css`
      & span {
        background-color: lightseagreen;
      }
    `,
  });

  return () =>
    section(
      { id: "badge" },
      h2("Badge"),
      h3("Basic Badge"),
      Container(Badge({ content: "10" }, "\u260F")),
      h3("Badges Table"),
      ComponentGrid({
        Item: (props: any, { index }: any) =>
          Badge({ ...props, content: `${index * 100}` }, "\u260F"),
      }),
      h3("Badge custom"),
      Container(BadgeCutom({ content: "1" }, "\u260F"))
    );
};
