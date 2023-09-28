import button from "@grucloud/bau-ui/button";

import { Context } from "@grucloud/bau-ui/context";

export default (context: Context) => {
  const { window } = context;

  const Button = button(context);

  return function ButtonBack() {
    return Button(
      {
        onclick: () => window.history.back(),
        variant: "outline",
        color: "primary",
      },
      "Cancel"
    );
  };
};
