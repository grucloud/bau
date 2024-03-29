import { Context } from "@grucloud/bau-ui/context";
import autocomplete from "@grucloud/bau-ui/autocomplete";

export default (context: Context) => {
  const { bau, stores } = context;
  const { label, div } = bau.tags;
  const { listRepoQuery, listBranchesQuery } = stores.gitHub;

  const Autocomplete = autocomplete(context, { variant: "outline" });

  return function GitRepositoryBranchGitHub(props: any) {
    const { username, password } = props;
    const branchState = bau.state(props.branch);
    if (username && !listRepoQuery.completed.val) {
      listRepoQuery.run({ username, password });
    }
    const GitRepository = ({}: any) =>
      label("Repository URL", () =>
        Autocomplete({
          options: listRepoQuery.data.val ?? [],
          Option: (opt) => div(opt.name),
          getOptionLabel: ({ clone_url }: any) => clone_url,
          getOptionValue: ({ clone_url }: any) => clone_url,
          label: "Repositories",
          placeholder: "Search repository",
          name: "repository_url",
          required: true,
          defaultOption: listRepoQuery.data.val.find(
            ({ clone_url }: any) => clone_url == props.repository_url
          ),
          onSelect: (item: any) => {
            if (username) {
              listBranchesQuery.run({
                username,
                password,
                repo: item.name,
              });
            }
          },
          loading: listRepoQuery.loading.val,
        })
      );

    const GitBranch = ({}: any) =>
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
          defaultOption: listBranchesQuery.data.val.find(
            ({ name }: any) => name == branchState.val
          ),
          loading: listBranchesQuery.loading.val,
          onSelect: (item: any) => {
            branchState.val = item.name;
          },
        })
      );
    return [GitRepository(props), GitBranch(props)];
  };
};
