import { type Context } from "@grucloud/bau-ui/context";
import input from "@grucloud/bau-ui/input";

export const workspaceFormDataToPayload = (event: any) => {
  const { workspace_id } = event.target.elements;
  return {
    workspace_id: workspace_id.value,
  };
};

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
          placeholder: "Workspace Name",
          name: "workspace_id",
          minLength: 1,
          maxLength: 24,
          required: true,
        })
      )
    );
  };
}
