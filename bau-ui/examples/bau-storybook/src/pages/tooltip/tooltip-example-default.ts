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

  return Tooltip({ titleEl: TooltipContent() }, Button({}, "tooltip"));
};
