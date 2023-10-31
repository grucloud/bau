import { Context } from "@grucloud/bau-ui/context";
import select from "@grucloud/bau-ui/select";

import gitRepositoryBranchGitHub from "./gitRepositoryBranchGitHub";
import gitRepositoryBranchGitLab from "./gitRepositoryBranchGitLab";
import gitRepositoryBranchGeneric from "./gitRepositoryBranchGeneric";

export default (context: Context) => {
  const { bau, stores, css } = context;
  const { section, header, p, label, div, span } = bau.tags;

  const Select = select(context, { variant: "outline" });

  const GitRepositoryBranchGitHub = gitRepositoryBranchGitHub(context);
  const GitRepositoryBranchGitLab = gitRepositoryBranchGitLab(context);
  const GitRepositoryBranchGeneric = gitRepositoryBranchGeneric(context);

  return function GitRepositoryFormContent(props: any) {
    const { git_credential_id } = props;
    const gitProviderState = bau.state({
      git_credential_id,
      username: "",
      provider: "",
      auth_type: "",
    });

    const Option = (opt: any) =>
      div(
        {
          class: css`
            display: flex;
            gap: 1rem;
          `,
        },
        span(opt.provider),
        span(opt.auth_type),
        span(opt.username)
      );

    const GitProvider = () =>
      label(
        "Git Provider",
        Select({
          options: stores.gitCredential.getAllByOrgQuery.data.val,
          Option,
          getOptionLabel: Option,
          getOptionValue: (props: any) => props.git_credential_id,
          label: "Git Provider",
          placeholder: "Select Git Provider",
          name: "git_credentials",
          required: true,
          defaultOption: stores.gitCredential.getAllByOrgQuery.data.val.find(
            ({ git_credential_id }: any) =>
              git_credential_id == props.git_credential_id
          ),
          loading: () => stores.gitCredential.getAllByOrgQuery.loading.val,
          onSelect: (item: any) => {
            gitProviderState.val = item;
          },
        })
      );

    const className = css``;

    return div(
      { class: className },
      header(
        p(
          "Provide information about the git repository. The resources inventory and generated code are stored on your source code git repository."
        )
      ),
      section(
        GitProvider(),
        div(() => {
          const { provider } = gitProviderState.val;
          switch (provider) {
            case "github":
              return GitRepositoryBranchGitHub(gitProviderState.val);
            case "gitlab":
              return GitRepositoryBranchGitLab(gitProviderState.val);
            case "generic":
              return GitRepositoryBranchGeneric(gitProviderState.val);
            default:
          }
        })
      )
    );
  };
};
