import { type Context } from "@grucloud/bau-ui/context";
import chip from "@grucloud/bau-ui/chip";
import tableContainer from "@grucloud/bau-ui/tableContainer";

import providerLogo from "../providerLogo";

export default function (context: Context) {
  const { bau, css, stores } = context;
  const { div, span, a, table, tr, td } = bau.tags;
  const Chip = chip(context);
  const ProviderLogo = providerLogo(context);
  const TableContainer = tableContainer(context, {
    class: css`
      max-width: 650px;
    `,
  });

  const ListItem = ({ id, name, providerName, providerAuth }: any) =>
    tr(
      {
        "data-infra-list-item-name": name,
      },
      td(
        a(
          {
            href: `infra/details/${id}`,
            class: css`
              width: 100%;
              display: flex;
              align-items: center;
              justify-content: space-between;
              gap: 1rem;
              color: var(--font-color);
            `,
          },
          span(name)
        )
      ),
      // TODO
      //         {item.Jobs[0] && <ResourceStat stats={resourceStats(item.Jobs[0])} />}

      td(ProviderLogo({ providerName })),
      td(providerAuth.AWS_REGION && Chip(providerAuth.AWS_REGION))
    );

  const className = css``;
  const { data } = stores.infra.getAllQuery;

  return function InfraList() {
    return div(
      {
        class: className,
      },
      () => data.val && TableContainer({}, table(data.val.map(ListItem)))
    );
  };
}
