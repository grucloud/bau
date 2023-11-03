import { Context } from "@grucloud/bau-ui/context";
import select from "@grucloud/bau-ui/select";
import gitRepositoryBranch from "./gitRepositoryBranch";

export default (context: Context) => {
  const { bau, stores, css } = context;
  const { section, header, p, label, span, div } = bau.tags;

  const Select = select(context, { variant: "outline" });

  const GitRepositoryBranch = gitRepositoryBranch(context);

  return function GitRepositoryFormContent(props: any) {
    const { git_credential_id } = props;
    const gitCredential = bau.state({
      git_credential_id: "",
      username: "",
      provider: "",
      auth_type: "",
    });

    const findCredentialById = (id: string) =>
      stores.gitCredential.getAllByOrgQuery.data.val.find(
        ({ git_credential_id }: any) => git_credential_id == id
      );

    bau.derive(() => {
      if (git_credential_id && !gitCredential.val.git_credential_id) {
        gitCredential.val = findCredentialById(git_credential_id);
      }
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
          defaultOption: findCredentialById(git_credential_id),
          loading: () => stores.gitCredential.getAllByOrgQuery.loading.val,
          onSelect: (item: any) => {
            gitCredential.val = item;
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
        bau.bind({
          deps: [gitCredential],
          render: () => () =>
            GitRepositoryBranch({ ...gitCredential.val, ...props }),
        })
        // div(() => {
        //   return GitRepositoryBranch({ ...gitCredential.val, ...props });
        // })
      )
    );
  };
};
