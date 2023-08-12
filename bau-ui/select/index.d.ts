declare module "@grucloud/bau-ui/select" {
  type DefaultDesignProps = import("../constants").DefaultDesignProps;
  type ComponentOption = import("../bau-ui").ComponentOption;

  export type SelectProps = {
    options: object[];
    id?: string;
    label: string;
    getOptionLabel?: (item: object | string) => string;
    Option: (props) => HTMLElement;
  } & DefaultDesignProps;

  type Component = import("../bau-ui").Component<SelectProps, HTMLInputElement>;

  export default function (context: any, option?: ComponentOption): Component;
}
