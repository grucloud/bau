import { Context } from "@grucloud/bau-ui/context";

import gitRepositoryBranchGitHub from "./gitRepositoryBranchGitHub";
import gitRepositoryBranchGitLab from "./gitRepositoryBranchGitLab";
import gitRepositoryBranchGeneric from "./gitRepositoryBranchGeneric";

export default (context: Context) => {
  //const { bau } = context;
  const GitRepositoryBranchGitHub = gitRepositoryBranchGitHub(context);
  const GitRepositoryBranchGitLab = gitRepositoryBranchGitLab(context);
  const GitRepositoryBranchGeneric = gitRepositoryBranchGeneric(context);

  return function GitRepositoryBranch(props: any) {
    const { provider } = props;
    switch (provider) {
      case "github":
        return GitRepositoryBranchGitHub(props);
      case "gitlab":
        return GitRepositoryBranchGitLab(props);
      case "generic":
        return GitRepositoryBranchGeneric(props);
      default:
        return "Error";
    }
  };
};
