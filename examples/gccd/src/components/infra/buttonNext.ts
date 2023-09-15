import { Context } from "@grucloud/bau-ui/context";
import button from "@grucloud/bau-ui/button";

export default (context: Context) => {
  const { bau } = context;
  const { i } = bau.tags;

  const Button = button(context);

  return function ButtonNext() {
    return Button(
      {
        type: "submit",
        variant: "solid",
        color: "primary",
      },
      "Next",
      i("\u25b6")
    );
  };
};
