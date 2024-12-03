import chip from "@grucloud/bau-ui/chip";
import { Context } from "@grucloud/bau-ui/context";

export default (context: Context) => {
  const { bau, css } = context;
  const { section } = bau.tags;

  const Chip = chip(context, {
    class: css`
      &.chip {
        font-weight: 700;
        font-size: 0.7rem;
        border-radius: 0.8rem;
        padding-inline: 0.5rem;
        padding-block: 0.2rem;
        text-transform: uppercase;
      }
    `,
    variant: "solid",
    color: "primary",
  });

  return () => {
    return section(
      //
      Chip("My Custom Chip")
    );
  };
};
