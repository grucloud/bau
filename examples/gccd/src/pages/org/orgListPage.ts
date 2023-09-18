import { Context } from "@grucloud/bau-ui/context";
import button from "@grucloud/bau-ui/button";
import spinner from "@grucloud/bau-ui/spinner";

import page from "../../components/page";
import orgList from "../../components/org/orgList";

export default function (context: Context) {
  const { bau, stores, config } = context;
  const { h1, header } = bau.tags;
  const ButtonAdd = button(context, { color: "primary", variant: "solid" });
  const Spinner = spinner(context, { size: "lg" });
  const Page = page(context);

  const OrgList = orgList(context);

  return function OrgListPage({}) {
    stores.org.getAllQuery.run();

    return Page(
      header(
        h1("Organisations"),
        ButtonAdd(
          {
            href: `${config.base}/org/create`,
          },
          "+ New Organisation"
        )
      ),
      OrgList({}),
      Spinner({
        visibility: stores.org.getAllQuery.loading,
      })
    );
  };
}
