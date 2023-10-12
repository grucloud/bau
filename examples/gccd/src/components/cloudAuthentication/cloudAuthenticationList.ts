import { type Context } from "@grucloud/bau-ui/context";
import tableContainer from "@grucloud/bau-ui/tableContainer";

export default function (context: Context) {
  const { bau, css } = context;
  const { table, thead, tbody, th, tr, td, section, a } = bau.tags;
  const TableContainer = tableContainer(context, {
    class: css`
      & th {
        text-align: left;
      }
    `,
  });

  const ListItem = ({
    // org_id,
    // project_id,
    workspace_id,
    cloud_authentication_id,
    provider_type,
    env_vars,
  }: any) =>
    tr(
      {
        "data-cloud-authentication-list-item-name": cloud_authentication_id,
      },
      td(provider_type),
      td(
        env_vars.AWS_REGION ?? env_vars.AZURE_LOCATION ?? env_vars.GOOGLE_REGION
      ),
      td(
        a(
          {
            href: `${workspace_id}/cloud_authentication/${cloud_authentication_id}/edit/${provider_type}`,
          },
          "Edit"
        ),
        " ",
        "\u2022",
        " ",
        a(
          {
            href: `${workspace_id}/cloud_authentication/${cloud_authentication_id}/destroy?provider=${provider_type}`,
          },
          "Remove"
        )
      )
    );

  const headers = ["Provider", "Region", "Action"];

  return function RunList(runs: any) {
    return section(
      TableContainer(
        table(
          thead(headers.map((header) => th({ scope: "col" }, header))),
          tbody(runs.map(ListItem))
        )
      )
    );
  };
}
