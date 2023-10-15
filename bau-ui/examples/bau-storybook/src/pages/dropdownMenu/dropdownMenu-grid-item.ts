import dropdownMenu from "@grucloud/bau-ui/dropdownMenu";
import { Context } from "@grucloud/bau-ui/context";

export default (context: Context, componentOptions?: any) => {
  const { bau } = context;
  const { div, span } = bau.tags;

  const DropdownMenu = dropdownMenu(context, componentOptions);

  const items = [
    { label: "List" },
    {
      label: "Plan",
    },
    { label: "Apply" },
  ];

  const ListItem = (item: any) => div(span(item.label));

  return (props: any) =>
    DropdownMenu({
      ...props,
      items,
      ListItem,
      label: "Action",
    });
};
