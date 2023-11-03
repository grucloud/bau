import { Context } from "@grucloud/bau-ui/context";
import select from "@grucloud/bau-ui/select";

export default (context: Context) => {
  const { bau, stores, css } = context;
  const { label, span, div } = bau.tags;

  const Select = select(context, { variant: "outline" });

  return function GitProviderSelect(props: any) {
    const { git_credential_id, onSelect } = props;

    const findCredentialById = (id: string) =>
      stores.gitCredential.getAllByOrgQuery.data.val.find(
        ({ git_credential_id }: any) => git_credential_id == id
      );

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

    return label(
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
        onSelect,
      })
    );
  };
};
