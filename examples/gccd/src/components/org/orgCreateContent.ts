import { type Context } from "@grucloud/bau-ui/context";
import input from "@grucloud/bau-ui/input";

export default function (context: Context) {
  const { bau } = context;
  const { section, label } = bau.tags;
  const Input = input(context);

  return function OrgCreateContent({}) {
    return section(
      label(
        "Organisation",
        Input({
          autofocus: true,
          placeholder: "Organisation",
          name: "organisation",
          minLength: 1,
          maxLength: 24,
          required: true,
        })
      )
    );
  };
}
