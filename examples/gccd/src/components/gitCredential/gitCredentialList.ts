import { type Context } from "@grucloud/bau-ui/context";
import tableContainer from "@grucloud/bau-ui/tableContainer";
import tableSkeleton from "../tableSkeleton";

export default function (context: Context) {
  const { bau, css } = context;
  const { a, table, tr, th, td, tbody, thead } = bau.tags;
  const TableContainer = tableContainer(context);
  const TableSkeleton = tableSkeleton(context);

  const ListItem = ({
    org_id,
    username,
    provider,
    auth_type,
    git_credential_id,
  }: any) =>
    tr(
      {
        "data-git-credential-list-item-name": git_credential_id,
      },
      td(provider),
      td(auth_type),
      td(username),
      td(
        a(
          {
            href: `/org/${org_id}/git_credential/${git_credential_id}`,
            class: css`
              color: var(--font-color);
            `,
          },
          "Edit"
        ),
        " ",
        a(
          {
            href: `/org/${org_id}/git_credential/${git_credential_id}/destroy`,
            class: css`
              color: var(--font-color);
            `,
          },
          "Remove"
        )
      )
    );

  const headers = [
    "Git Provider",
    "Authentication Type",
    "Username",
    "Actions",
  ];

  return function GitCredentialList({ data, loading }: any) {
    return TableContainer(
      table(thead(headers.map((h) => th(h))), () =>
        loading.val
          ? TableSkeleton({ columnsSize: 3, rowSize: 3 })
          : tbody(data.val.map(ListItem))
      )
    );
  };
}
