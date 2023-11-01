import { Context } from "@grucloud/bau-ui/context";
import autocomplete from "@grucloud/bau-ui/autocomplete";

export default (context: Context) => {
  const { bau, stores, css } = context;
  const { label, div, section } = bau.tags;
  const { listRepoQuery, listBranchesQuery } = stores.gitLab;

  const Autocomplete = autocomplete(context, { variant: "outline" });

  return function GitRepositoryBranchGitLab(props: any) {
    const { username, password } = props;
    listRepoQuery.run({ username, password });

    const GitRepository = ({}: any) =>
      label("Repository URL", () =>
        Autocomplete({
          options: listRepoQuery.data.val ?? [],
          Option: (opt) => div(opt.name_with_namespace),
          getOptionLabel: ({ http_url_to_repo }: any) => http_url_to_repo,
          getOptionValue: ({ http_url_to_repo }: any) => http_url_to_repo,
          label: "Repositories",
          placeholder: "Search repository",
          name: "repository",
          required: true,
          defaultOption: listRepoQuery.data.val.find(
            ({ http_url_to_repo }: any) =>
              http_url_to_repo == props.repository_url
          ),
          onSelect: (item: any) => {
            if (username) {
              listBranchesQuery.run({
                username,
                password,
                repo: item.id,
              });
            }
          },
          loading: listRepoQuery.loading.val,
        })
      );

    const GitBranch = ({ branch }: any) =>
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
          ...(branch && { defaultOption: { name: branch } }),
          loading: listBranchesQuery.loading.val,
        })
      );

    return section(
      {
        class: css`
          display: flex;
          flex-direction: column;
        `,
      },
      GitRepository({}),
      GitBranch(props)
    );
  };
};
