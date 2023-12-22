import tooltip from "@grucloud/bau-ui/tooltip";
import button from "@grucloud/bau-ui/button";
import { Context } from "@grucloud/bau-ui/context";

export default (context: Context) => {
  const { bau, css } = context;
  const { div, p, em } = bau.tags;
  const Button = button(context);

  const Tooltip = tooltip(context);

  const TooltipContent = () =>
    div(
      {
        class: css`
          font-size: larger;
        `,
      },
      p("A ", em("tooltip"), " can be any component")
    );

  return () => {
    return Tooltip(
      {
        titleEl: TooltipContent(),
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
      },
      Button({}, "tooltip")
    );
  };
};
