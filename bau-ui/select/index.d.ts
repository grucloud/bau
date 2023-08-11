declare module "@grucloud/bau-ui/select" {
  type DefaultDesignProps = import("../constants").DefaultDesignProps;

  export type SelectProps = {
    options: object[];
    id?: string;
    label: string;
    getOptionLabel?: (item: object | string) => string;
    Option: (props) => HTMLElement;
  } & DefaultDesignProps;

  type Component = import("../bau-ui").Component<SelectProps, HTMLInputElement>;

  type Option = {
    class?: string;
  };

  export default function (context: any, option?: Option): Component;
}
