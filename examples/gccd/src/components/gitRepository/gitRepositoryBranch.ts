import { Context } from "@grucloud/bau-ui/context";

import gitRepositoryBranchGitHub from "./gitRepositoryBranchGitHub";
import gitRepositoryBranchGitLab from "./gitRepositoryBranchGitLab";
import gitRepositoryBranchGeneric from "./gitRepositoryBranchGeneric";

export default (context: Context) => {
  const { bau, css } = context;
  const { fieldset, legend } = bau.tags;
  const GitRepositoryBranchGitHub = gitRepositoryBranchGitHub(context);
  const GitRepositoryBranchGitLab = gitRepositoryBranchGitLab(context);
  const GitRepositoryBranchGeneric = gitRepositoryBranchGeneric(context);

  function GitRepositoryBranch(props: any) {
    const { git_provider_type } = props;
    switch (git_provider_type) {
      case "GitHub":
        return GitRepositoryBranchGitHub(props);
      case "GitLab":
        return GitRepositoryBranchGitLab(props);
      case "Generic":
        return GitRepositoryBranchGeneric(props);
      default:
        return undefined;
    }
  }

  return function (props: any) {
    return fieldset(
      {
        class: css`
          display: flex;
          flex-direction: column;
        `,
      },
      legend("Repository & Branch"),
      GitRepositoryBranch(props)
    );
  };
};
