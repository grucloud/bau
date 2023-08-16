import input from "@grucloud/bau-ui/input";
import { Context } from "@grucloud/bau-ui/context";

export default (context: Context) => {
  const { bau } = context;
  const { section } = bau.tags;

  const Input = input(context);

  return section(
    Input({
      id: "my-input",
      name: "my-input",
      placeholder: "Enter Text",
      // oninput: (event)=> {}
    })
  );
};
