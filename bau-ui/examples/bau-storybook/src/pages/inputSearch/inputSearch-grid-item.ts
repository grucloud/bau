import inputSearch from "@grucloud/bau-ui/inputSearch";
import { Context } from "@grucloud/bau-ui/context";

export default (context: Context, options: any = {}) => {
  const InputSearch = inputSearch(context, options);

  return (props: any) =>
    InputSearch({
      name: `myinputSearch-gallery-${options.color}-${options.variant}-${options.size}`,
      id: `myinputSearch-gallery-${options.color ?? props.color}-${
        options.variant ?? props.variant
      }-${props.size ?? options.size}`,
      placeholder: "Enter text",
      ...props,
    });
};
