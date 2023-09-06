import { type Context } from "@grucloud/bau-ui/context";
import chip from "@grucloud/bau-ui/chip";
import list from "@grucloud/bau-ui/list";

import providerLogo from "../providerLogo";

export default function (context: Context) {
  const { bau, css, stores } = context;
  const { div, li, span, a } = bau.tags;
  const Chip = chip(context);
  const List = list(context);
  const ProviderLogo = providerLogo(context);

  const ListItem = ({ id, name, providerName, providerAuth }: any) =>
    li(
      {
        "data-infra-list-item-name": name,
      },
      a(
        {
          href: `infra/details/${id}`,
          class: css`
            width: 100%;
            display: flex;
            align-items: center;
            justify-content: space-between;
            gap: 1rem;
            text-decoration: none;
            color: var(--font-color);
          `,
        },
        span(name),
        ProviderLogo({ providerName }),
        providerAuth && Chip(providerAuth.AWS_REGION)
      )
    );

  const className = css``;
  const { data } = stores.infra.getAllQuery;

  return function InfraList() {
    return div(
      {
        class: className,
      },
      () =>
        data.val &&
        List({ variant: "outline", color: "none" }, data.val.map(ListItem))
    );
  };
}
