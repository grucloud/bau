import breadcrumbs, {
  type BreadcrumbsProps,
} from "@grucloud/bau-ui/breadcrumbs";

import { Context } from "../context";
import componentGrid from "./componentGrid";

export default (context: Context) => {
  const { tr, bau } = context;
  const { section, h2, h3 } = bau.tags;

  const breadcrumbs1: BreadcrumbsProps = {
    items: [
      {
        href: "/",
        name: "\u2302",
      },
      { name: "Dir" },
      { href: "/dir/subdir", name: "SubDir" },
    ],
  };

  const ComponentGrid = componentGrid(context);
  const Breadcrumbs = breadcrumbs(context);

  return () =>
    section(
      { id: "breadcrumbs" },
      h2(tr("Breadcrumbs")),
      h3("Bacis Breadcrumb"),
      Breadcrumbs(breadcrumbs1),
      h3("Breadcrumbs Table"),
      ComponentGrid({
        Item: (props: any) => Breadcrumbs({ ...props, ...breadcrumbs1 }),
      })
    );
};
