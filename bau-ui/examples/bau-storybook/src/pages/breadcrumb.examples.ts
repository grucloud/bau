import breadcrumbs, {
  type BreadcrumbsProps,
} from "@grucloud/bau-ui/breadcrumbs";

import { Context } from "../context";

export default (context: Context) => {
  const { tr, bau } = context;
  const { section, h2 } = bau.tags;

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

  const Breadcrumbs = breadcrumbs(context);

  return () =>
    section(
      { id: "breadcrumbs" },
      h2(tr("Breadcrumbs")),
      Breadcrumbs(breadcrumbs1)
    );
};
