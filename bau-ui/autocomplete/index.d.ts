declare module "@grucloud/bau-ui/autocomplete" {
  type DefaultDesignProps = import("../constants").DefaultDesignProps;
  type ComponentOption = import("../bau-ui").ComponentOption;

  export type Autocomplete = {
    options: object[];
    id?: string;
    label: string;
    placeholder: string;
    size?: string;
    getOptionLabel: (item: object | string) => HTMLElement | string;
    getOptionValue: (item: object | string) => string;
    Option: (props) => HTMLElement;
    defaultOption?: any;
  } & DefaultDesignProps;

  type Component = import("../bau-ui").Component<
    Autocomplete,
    HTMLInputElement
  >;

  export default function (context: any, option?: ComponentOption): Component;
}
