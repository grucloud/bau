import tooltip from "@grucloud/bau-ui/tooltip";
import button from "@grucloud/bau-ui/button";
import componentGrid from "./componentGrid";

import { Context } from "@grucloud/bau-ui/context";

export default (context: Context) => {
  const { tr, bau, css } = context;
  const { section, div, h2, em, p } = bau.tags;

  const ComponentGrid = componentGrid(context);
  const Button = button(context);

  const Tooltip = tooltip(context);
  const TooltipCustom = tooltip(context, {
    class: css`
      .container > .content {
        background-color: lightgreen;
        border: 2px dotted darkgreen;
        font-size: 1.5rem;
      }
      .container.top {
        &::after {
          position: absolute;
          content: " ";
          bottom: 0%;
          left: 20%;
          margin-top: 5px;
          border-width: 5px;
          border-style: solid;
          border-color: transparent transparent var(--color-emphasis-400)
            transparent;
        }
      }
      .container.bottom {
        &::after {
          position: absolute;
          content: " ";
          top: 0%;
          left: 20%;
          margin-left: 5px;
          border-width: 5px;
          border-style: solid;
          border-color: var(--color-emphasis-400) transparent transparent
            transparent;
        }
      }
    `,
  });

  const TooltipContent = () =>
    div(
      {
        class: css`
          font-size: larger;
        `,
      },
      p("A ", em("tooltip"), " can be any component")
    );

  const TooltipGrid = () => [
    div(
      {
        class: css`
          display: flex;
          justify-content: space-around;
        `,
      },
      Tooltip(
        { side: "top-start", titleEl: TooltipContent() },
        Button({}, "top-start")
      ),
      Tooltip(
        { side: "top-centered", titleEl: TooltipContent() },
        Button({}, "top-centered")
      ),
      Tooltip(
        { side: "top-end", titleEl: TooltipContent() },
        Button({}, "top-end")
      )
    ),
    div(
      {
        class: css`
          display: flex;
          justify-content: space-between;
        `,
      },
      Tooltip(
        { side: "left-start", titleEl: TooltipContent() },
        Button({}, "left-start")
      ),
      Tooltip(
        { side: "right-start", titleEl: TooltipContent() },
        Button({}, "right-start")
      )
    ),
    div(
      {
        class: css`
          display: flex;
          justify-content: space-between;
        `,
      },
      Tooltip(
        { side: "left-centered", titleEl: TooltipContent() },
        Button({}, "left-centered")
      ),
      Tooltip(
        { side: "right-centered", titleEl: TooltipContent() },
        Button({}, "right-centered")
      )
    ),
    div(
      {
        class: css`
          display: flex;
          justify-content: space-between;
        `,
      },
      Tooltip(
        { side: "left-end", titleEl: TooltipContent() },
        Button({}, "left end")
      ),
      Tooltip(
        { side: "right-end", titleEl: TooltipContent() },
        Button({}, "right end")
      )
    ),
    div(
      {
        class: css`
          display: flex;
          justify-content: space-around;
        `,
      },
      Tooltip(
        { side: "bottom-start", titleEl: TooltipContent() },
        Button({}, "bottom start")
      ),
      Tooltip(
        { side: "bottom-centered", titleEl: TooltipContent() },
        Button({}, "bottom centered")
      ),
      Tooltip(
        { side: "bottom-end", titleEl: TooltipContent() },
        Button({}, "bottom end")
      )
    ),
  ];

  return () =>
    section(
      { id: "tooltip" },
      h2(tr("Tooltip")),
      div(
        {
          class: css`
            border: 1px dotted var(--color-gray-500);
            padding: 1rem;
            display: flex;
            flex-direction: column;
            gap: 1rem;
            max-width: 400px;
            margin: auto;
          `,
        },
        TooltipGrid()
      ),
      h2(tr("Tooltip moved")),
      div(
        {
          class: css`
            border: 1px dotted var(--color-gray-500);
            padding: 1rem;
            display: flex;
            flex-direction: column;
            gap: 1rem;
          `,
        },
        TooltipGrid()
      ),
      h2(tr("Tooltip custom")),
      div(
        {
          class: css`
            border: 1px dotted var(--color-gray-500);
            padding: 1rem;
            display: flex;
            flex-direction: column;
            gap: 1rem;
          `,
        },
        TooltipCustom(
          { titleEl: TooltipContent() },
          Button({}, "custom tooltip")
        )
      ),

      h2(tr("Tooltip Table")),
      ComponentGrid({
        Item: (props: any) =>
          Tooltip(
            { titleEl: TooltipContent(), ...props },
            Button({}, `${props.color} ${props.variant}`)
          ),
      })
    );
};
