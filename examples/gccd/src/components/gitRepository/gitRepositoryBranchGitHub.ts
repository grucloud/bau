import { Context } from "@grucloud/bau-ui/context";
import autocomplete from "@grucloud/bau-ui/autocomplete";

export default (context: Context) => {
  const { bau, stores, css } = context;
  const { label, div, section } = bau.tags;
  const { listRepoQuery, listBranchesQuery } = stores.gitHub;

  const Autocomplete = autocomplete(context, { variant: "outline" });

  return function GitRepositoryBranchGitHub(props: any) {
    const { username } = props;
    listRepoQuery.run({ username });
    const GitRepository = ({}: any) =>
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
