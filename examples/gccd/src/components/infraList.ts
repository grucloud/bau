import { type Context } from "@grucloud/bau-ui/context";
import chip from "@grucloud/bau-ui/chip";
import list from "@grucloud/bau-ui/list";

import providerLogo from "./providerLogo";

export default function (context: Context) {
  const { bau, css, stores } = context;
  const { div, li, span, h1 } = bau.tags;
  const Chip = chip(context);
  const List = list(context);
  const ProviderLogo = providerLogo(context);

  const ListItem =
    ({ onclickItem }: any) =>
    ({ id, name, providerName, providerAuth }: any) =>
      li(
        {
          "data-infra-list-item-name": name,
          onclick: onclickItem({ id }),
          class: css`
            display: flex;
            align-items: center;
            gap: 1rem;
          `,
        },
        span(name),
        ProviderLogo({ providerName }),
        providerAuth && Chip(providerAuth.AWS_REGION)
      );

  const className = css``;
  const { data } = stores.infra.getAllQuery;

  return function InfraList({ onclickItem }: any) {
    return div(
      {
        class: className,
      },
      h1("Infrastructure List"),
      () =>
        data.val &&
        List(
          { variant: "outline", color: "none" },
          data.val.map(ListItem({ onclickItem }))
        )
    );
  };
}
