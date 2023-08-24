import paginationNavigation from "@grucloud/bau-ui/paginationNavigation";
import { Context } from "@grucloud/bau-ui/context";

export default (context: Context) => {
  const PaginationNavigation = paginationNavigation(context);

  const data = {
    next: { name: "next page", label: "My Next Page", href: "#next" },
    previous: {
      name: "previous page",
      label: "My Previous Page",
      href: "#previous",
    },
  };

  return (props: any) => PaginationNavigation({ ...props, data });
};
