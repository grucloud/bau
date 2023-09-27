import { type Context } from "@grucloud/bau-ui/context";
import input from "@grucloud/bau-ui/input";

export default function (context: Context) {
  const { bau } = context;
  const { section, label } = bau.tags;
  const Input = input(context);

  return function ProjectCreateContent({ org_id }: any) {
    org_id;
    return section(
      // Select org
      label(
        "Project Name",
        Input({
          autofocus: true,
          placeholder: "Project name",
          name: "project_name",
          minLength: 1,
          maxLength: 24,
          required: true,
        })
      )
    );
  };
}
