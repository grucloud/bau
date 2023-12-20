import button from "@grucloud/bau-ui/button";
import { Context } from "@grucloud/bau-ui/context";

export default (context: Context) => {
  const { bau } = context;
  const { section } = bau.tags;

  const Button = button(context, { color: "primary", variant: "outline" });
  const onclick = () => {
    alert("Click");
  };
  return () =>
    section(
      //
      Button({ onclick }, "Click me")
    );
};
