import tooltip from "@grucloud/bau-ui/tooltip";
import button from "@grucloud/bau-ui/button";

import { Context } from "../context";

export default (context: Context) => {
  const { tr, bau, css } = context;
  const { section, div, h2, em, a, p } = bau.tags;

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
      p("A ", em("tooltip"), " can be any component"),
      a({ href: "https://github.com/grucloud/bau" }, "visit bau's website")
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
        Button({ raised: true }, "top-start")
      ),
      Tooltip(
        { side: "top-centered", titleEl: TooltipContent() },
        Button({ raised: true }, "top-centered")
      ),
      Tooltip(
        { side: "top-end", titleEl: TooltipContent() },
        Button({ raised: true }, "top-end")
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
        Button({ raised: true }, "left-start")
      ),
      Tooltip(
        { side: "right-start", titleEl: TooltipContent() },
        Button({ raised: true }, "right-start")
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
        Button({ raised: true }, "left-centered")
      ),
      Tooltip(
        { side: "right-centered", titleEl: TooltipContent() },
        Button({ raised: true }, "right-centered")
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
        Button({ raised: true }, "left end")
      ),
      Tooltip(
        { side: "right-end", titleEl: TooltipContent() },
        Button({ raised: true }, "right end")
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
        Button({ raised: true }, "bottom start")
      ),
      Tooltip(
        { side: "bottom-centered", titleEl: TooltipContent() },
        Button({ raised: true }, "bottom centered")
      ),
      Tooltip(
        { side: "bottom-end", titleEl: TooltipContent() },
        Button({ raised: true }, "bottom end")
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
          Button({ raised: true }, "custom tooltip")
        )
      )
    );
};
