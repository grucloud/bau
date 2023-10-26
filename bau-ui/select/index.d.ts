declare module "@grucloud/bau-ui/select" {
  type DefaultDesignProps = import("../constants").DefaultDesignProps;
  type ComponentOption = import("../bau-ui").ComponentOption;

  export type SelectProps = {
    options: object[];
    id?: string;
    label: string;
    defaultOption?: any;
    getOptionLabel: (item: object | string) => HTMLElement | string;
    getOptionValue: (item: object | string) => string;
    Option: (props) => HTMLElement;
  } & DefaultDesignProps;

  type Component = import("../bau-ui").Component<SelectProps, HTMLInputElement>;

  export default function (context: any, option?: ComponentOption): Component;
}
