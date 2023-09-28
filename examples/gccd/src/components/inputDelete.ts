import input from "@grucloud/bau-ui/input";

import { Context } from "@grucloud/bau-ui/context";

export default (context: Context) => {
  const Input = input(context);

  return function InputDelete() {
    return Input({
      placeholder: "Type 'delete'",
      autocomplete: false,
      autofocus: true,
      pattern: "delete",
      required: true,
    });
  };
};
