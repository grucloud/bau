import { Context } from "@grucloud/bau-ui/context";
import button from "@grucloud/bau-ui/button";
import spinner from "@grucloud/bau-ui/spinner";

import infraList from "../../components/infra/infraList";

export default function (context: Context) {
  const { bau, stores, css } = context;
  const { section, span, header } = bau.tags;
  const Button = button(context);
  const Spinner = spinner(context, { size: "lg" });

  const InfraList = infraList(context);

  const className = css`
    display: flex;
    flex-direction: column;
    gap: 1rem;
    & > header {
      display: flex;
      gap: 2rem;
      align-items: center;
      & > .title {
        font-weight: 700;
        font-size: 1.3rem;
      }
    }
  `;

  return function Main({}) {
    stores.infra.getAll();
    return section(
      { class: className },
      header(
        span({ class: "title" }, "Infrastructure List"),
        Button(
          { href: "infra/create", color: "primary", variant: "solid" },
          "+ New Infrastructure"
        )
      ),
      InfraList(),
      Spinner({
        visibility: stores.infra.getAllQuery.loading,
      })
    );
  };
}
