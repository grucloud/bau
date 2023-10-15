declare module "@grucloud/bau-ui/dropdownMenu" {
  type DefaultDesignProps = import("../constants").DefaultDesignProps;
  type ComponentOption = import("../bau-ui").ComponentOption;

  export type DropdownMenuProps = {
    items: object[];
    id?: string;
    label: string;
    ListItem: (props) => HTMLElement;
  } & DefaultDesignProps;

  type Component = import("../bau-ui").Component<
    DropdownMenuProps,
    HTMLInputElement
  >;

  export default function (context: any, option?: ComponentOption): Component;
}
