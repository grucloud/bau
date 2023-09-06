import button from "@grucloud/bau-ui/button";

import { Context } from "@grucloud/bau-ui/context";

export default (context: Context) => {
  const { bau } = context;
  const { i } = bau.tags;

  const Button = button(context);

  return function ButtonPrevious({ onclick }: any) {
    return Button(
      {
        onclick,
        variant: "outline",
        color: "primary",
      },
      i("\u25c0"),
      "Previous"
    );
  };
};
