import { Context } from "@grucloud/bau-ui/context";
import autocomplete from "@grucloud/bau-ui/autocomplete";

export default (context: Context) => {
  const { bau, stores } = context;
  const { label, div } = bau.tags;
  const { listRepoQuery, listBranchesQuery } = stores.gitLab;

  const Autocomplete = autocomplete(context, { variant: "outline" });

  return function GitRepositoryBranchGitLab(props: any) {
    const { username, password } = props;
    const branchState = bau.state(props.branch);

    if (username && !listRepoQuery.completed.val) {
      listRepoQuery.run({ username, password });
    }

    const GitRepository = ({}: any) =>
      label("Repository URL", () =>
        Autocomplete({
          options: listRepoQuery.data.val ?? [],
          Option: (opt) => div(opt.name_with_namespace),
          getOptionLabel: ({ http_url_to_repo }: any) => http_url_to_repo,
          getOptionValue: ({ http_url_to_repo }: any) => http_url_to_repo,
          label: "Repositories",
          placeholder: "Search repository",
          name: "repository_url",
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
