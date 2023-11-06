import { Context } from "@grucloud/bau-ui/context";
import input from "@grucloud/bau-ui/input";

export default (context: Context) => {
  const { bau } = context;
  const { label } = bau.tags;

  const Input = input(context);

  return function GitRepositoryBranchGeneric(props: any) {
    const { repository_url, branch } = props;

    const GitRepository = ({}) =>
      label(
        "Repository URL",
        Input({
          autofocus: true,
          placeholder:
            "Git repository URL: https://git-codecommit.us-east-2.amazonaws.com/v1/repos/MyDemoRepo",
          name: "repository_url",
          minLength: 3,
          size: 80,
          required: true,
          defaultValue: repository_url,
        })
      );

    const GitBranch = ({}: any) =>
      label(
        "Branch",
        Input({
          placeholder: "Git Branch",
          name: "branch",
          minLength: 3,
          required: true,
          value: branch,
        })
      );

    return [GitRepository(props), GitBranch(props)];
  };
};
