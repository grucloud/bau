import chip from "@grucloud/bau-ui/chip";
import { Context } from "@grucloud/bau-ui/context";

export default (context: Context) => {
  const { bau } = context;
  const { section } = bau.tags;

  const Chip = chip(context, { variant: "outline", color: "primary" });

  return () =>
    section(
      //
      Chip("My Chip")
    );
};
