import badge from "@grucloud/bau-ui/badge";
import { Context } from "../context";

export default (context: Context) => {
  const { tr, bau, css } = context;
  const { section, div, h3, h2 } = bau.tags;

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
      h2(tr("Badge")),
      h3("Basic Badge"),
      Container(Badge({ content: "10" }, "\u260F")),
      h3("Badge Primary"),
      Container(Badge({ content: "2", primary: true }, "\u260F")),
      h3("Badge Secondary"),
      Container(Badge({ content: "10", secondary: true }, "\u260F")),
      h3("Badge Success"),
      Container(Badge({ content: "100", success: true }, "\u260F")),
      h3("Badge Danger"),
      Container(Badge({ content: "1000", danger: true }, "\u260F")),
      h3("Badge empty"),
      Container(Badge({ content: "", primary: true }, "\u260F")),
      h3("Badge custom"),
      Container(BadgeCutom({ content: "1" }, "\u260F"))
    );
};
