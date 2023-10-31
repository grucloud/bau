import button from "@grucloud/bau-ui/button";

import { Context } from "@grucloud/bau-ui/context";

export default (context: Context) => {
  const Button = button(context);

  return function ButtonNext(props: any) {
    return Button(
      {
        variant: "solid",
        color: "primary",
        ...props,
      },
      "Next"
    );
  };
};
