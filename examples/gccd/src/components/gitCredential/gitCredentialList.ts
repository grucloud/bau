import { type Context } from "@grucloud/bau-ui/context";
import tableContainer from "@grucloud/bau-ui/tableContainer";

export default function (context: Context) {
  const { bau, css } = context;
  const { span, a, table, tr, td } = bau.tags;
  const TableContainer = tableContainer(context, {
    class: css``,
  });

  const ListItem = ({ org_id, username, git_credential_id }: any) =>
    tr(
      {
        "data-git-credential-list-item-name": git_credential_id,
      },
      td(
        a(
          {
            href: `${org_id}/git_credential/${git_credential_id}`,
            class: css`
              width: 100%;
              display: flex;
              align-items: center;
              justify-content: space-between;
              gap: 1rem;
              color: var(--font-color);
            `,
          },
          span(username)
        )
      )
    );

  return function GitCredentialList(items: any) {
    return items
      ? TableContainer(table(items.map(ListItem)))
      : "No Git Credential";
  };
}
