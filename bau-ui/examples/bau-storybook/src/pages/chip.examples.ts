import chip from "@grucloud/bau-ui/chip";
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

  const Chip = chip(context);
  const ChipCustom = chip(context, {
    class: css`
      background-color: teal;
      color: var(--color-content-inverse);
      padding: 0.8rem;
      border-radius: 0px;
    `,
  });

  return () =>
    section(
      { id: "chip" },
      h2(tr("Chip")),
      h3("Basic Chip"),
      Container(Chip("Chip")),
      h3("Chip outline"),
      Container(Chip({ outline: true }, "Outline Chip")),
      h3("Chip primary"),
      Container(Chip({ primary: true }, "Primary Chip")),
      h3("Chip primary"),
      Container(Chip({ secondary: true }, "Secondary Chip")),
      h3("Chip success"),
      Container(Chip({ success: true }, "Success Chip")),
      h3("Chip danger"),
      Container(Chip({ danger: true }, "Danger Chip")),
      h3("Chip Custom"),
      Container(ChipCustom("Chip Custom")),
      h3("Chip Clickable"),
      Container(
        Chip(
          {
            onclick: () => {
              alert("Clicked");
            },
          },
          "Chip"
        )
      )
    );
};
