import { type Context } from "@grucloud/bau-ui/context";
import breadcrumbs from "@grucloud/bau-ui/breadcrumbs";
export default function (context: Context) {
  const { bau, stores } = context;
  const Breadcrumbs = breadcrumbs(context, {
    variant: "plain",
    color: "neutral",
    separator: "/",
  });

  const pathnameState = stores.router.pathname;

  const breadcrumbsState = bau.derive(() => {
    const splitted = pathnameState.val.split("/").reduce(
      (acc: any, value: any, index: number) => [
        ...acc,
        {
          name: index ? value : "\u2302",
          href: index
            ? pathnameState.val
                .split("/")
                .slice(0, index + 1)
                .join("/")
            : "/",
        },
      ],
      []
    );
    return splitted;
  });

  return function BreadcrumbsNav() {
    return () =>
      Breadcrumbs({
        items: breadcrumbsState.val,
      });
  };
}
