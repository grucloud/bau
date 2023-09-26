import { type Context } from "@grucloud/bau-ui/context";
import input from "@grucloud/bau-ui/input";

export default function (context: Context) {
  const { bau } = context;
  const { section, label } = bau.tags;
  const Input = input(context);

  return function WorkspaceCreateContent({}) {
    return section(
      label(
        "Workspace Name",
        Input({
          autofocus: true,
          placeholder: "Workspace name",
          name: "workspace_name",
          minLength: 1,
          maxLength: 24,
          required: true,
        })
      )
    );
  };
}
