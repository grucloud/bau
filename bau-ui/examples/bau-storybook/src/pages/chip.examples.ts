import chip from "@grucloud/bau-ui/chip";
import { Context } from "@grucloud/bau-ui/context";
import componentGrid from "./componentGrid";

export default (context: Context) => {
  const { tr, bau, css } = context;
  const { section, div, h3, h2 } = bau.tags;

  const ComponentGrid = componentGrid(context);

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
  // const ChipCustom = chip(context, {
  //   class: css`
  //     background-color: teal;
  //     color: var(--color-content-inverse);
  //     padding: 0.8rem;
  //     border-radius: 0px;
  //   `,
  // });

  return () =>
    section(
      { id: "chip" },
      h2(tr("Chip")),
      h3("Chip Default"),
      Container(Chip("My Chip")),
      h3("Chip Clickable"),
      Container(
        Chip(
          {
            color: "danger",
            onclick: () => {
              alert("Clicked");
            },
          },
          "Chip"
        )
      ),
      h3("Chip Table"),
      ComponentGrid({
        Item: (props: any) =>
          Chip(
            {
              ...props,
            },
            `Chip ${props.color}`
          ),
      })
    );
};
