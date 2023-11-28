import { type Context } from "@grucloud/bau-ui/context";
import input from "@grucloud/bau-ui/input";

export default function (context: Context) {
  const { bau, css } = context;
  const { label } = bau.tags;
  const Input = input(context);
  const className = css``;

  return function GitWorkingDirectory(props: any) {
    const { working_directory } = props;
    return label(
      {
        class: className,
      },
      "Working Directory",
      Input({
        placeholder: "Working Directory",
        name: "working_directory",
        defaultValue: working_directory,
      })
    );
  };
}
