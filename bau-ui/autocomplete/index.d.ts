declare module "@grucloud/bau-ui/autocomplete" {
  export type Autocomplete = {
    options: object[];
    id: string;
    label: string;
    placeholder: string;
    size?: string;
    getOptionLabel?: (item: object | string) => string;
    Option: (props) => HTMLElement;
  };

  type Component = import("../bau-ui").Component<
    Autocomplete,
    HTMLInputElement
  >;

  type Option = {
    class?: string;
  };

  export default function (context: any, option?: Option): Component;
}
