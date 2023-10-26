import { Context } from "@grucloud/bau-ui/context";
import input from "@grucloud/bau-ui/input";
import select from "@grucloud/bau-ui/select";
import autocomplete from "@grucloud/bau-ui/autocomplete";
//import tableSkeleton from "../tableSkeleton";

export default (context: Context) => {
  const { bau, stores, css } = context;
  const { section, header, p, label, div, ol, li } = bau.tags;
  const { listRepoQuery, listBranchesQuery } = stores.gitHub;
  // const TableSkeleton = tableSkeleton(context, {
  //   class: css`
  //     height: 2rem;
  //     margin: 0.5rem;
  //     min-width: 20rem;
  //   `,
  // });

  const Autocomplete = autocomplete(context, { variant: "outline" });
  const Select = select(context, { variant: "outline" });

  const Input = input(context);

  const checkedGitProviderState = bau.state("github");

  return function GitRepositoryFormContent(props: any) {
    const { git_credential_id } = props;
    const gitProviderState = bau.state({ git_credential_id, username: "" });
    const GitProvider = () =>
      label(
        "Git Provider",
        Select({
          options: stores.gitCredential.getAllByOrgQuery.data.val,
          Option: (opt) => div(opt.provider_type),
          getOptionLabel: (props: any) => props.provider_type,
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
        }),
        bau.bind({
          deps: [gitProviderState],
          render: () => () => {
            if (gitProviderState.val.username) {
              listRepoQuery.run(gitProviderState.val);
            }
            return undefined;
          },
        })
      );
    const GitRepositoryUrlGitHub = ({}: any) =>
      label("Repository URL", () =>
        Autocomplete({
          options: listRepoQuery.data.val ?? [],
          Option: (opt) => div(opt.name),
          getOptionLabel: ({ clone_url }: any) => clone_url,
          getOptionValue: ({ clone_url }: any) => clone_url,
          label: "Repositories",
          placeholder: "Search repository",
          name: "repository",
          required: true,
          defaultOption: listRepoQuery.data.val.find(
            ({ clone_url }: any) => clone_url == props.repository_url
          ),
          onSelect: (item: any) => {
            const { username } = gitProviderState.val;
            if (username) {
              listBranchesQuery.run({
                username,
                repo: item.name,
              });
            }
          },
          loading: listRepoQuery.loading.val,
        })
      );

    const GitRepositoryUrlStandard = () =>
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
          defaultValue: props.repository_url,
        })
      );

    const GitRepositoryUrl =
      ({ username }: any = {}) =>
      () =>
        !props.repository_url
          ? GitRepositoryUrlGitHub({ username })
          : GitRepositoryUrlStandard();

    const GitBranchGitHub = ({ branch }: any) =>
      label("Branch", () =>
        Autocomplete({
          options: listBranchesQuery.data.val ?? [],
          Option: (opt) => div(opt.name),
          getOptionValue: ({ name }: any) => name,
          getOptionLabel: ({ name }: any) => name,
          label: "Branches",
          placeholder: "Search branches",
          name: "branch",
          required: true,
          value: branch,
          loading: listBranchesQuery.loading.val,
        })
      );

    const GitBranchStandard = ({ branch }: any) =>
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

    //TODO
    const GitBranch =
      ({ branch }: any) =>
      () =>
        checkedGitProviderState.val == "github"
          ? GitBranchGitHub({ branch })
          : GitBranchStandard({ branch });

    const className = css`
      & ol {
        padding-left: 0;
      }
    `;

    return div(
      { class: className },
      header(
        p(
          "Provide information about the git repository. The resources inventory and generated code are stored on your source code git repository."
        )
      ),
      section(
        ol(li(GitProvider()), li(GitRepositoryUrl()), li(GitBranch(props)))
      )
    );
  };
};
