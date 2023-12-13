declare module "@grucloud/bau-ui/radioButtonGroup" {
  type DefaultDesignProps = import("../constants").DefaultDesignProps;
  type ComponentOption = import("../bau-ui").ComponentOption;

  type RadioComponent = import("../bau-ui").ComponentGeneric;

  type RadioItem = {
    id: string;
    Label: RadioComponent | RadioComponent[];
  };
  export type RadioButtonGroupProps = {
    name: string;
    value?: any;
    oninput?: (event) => any;
    radios: RadioItem[];
  } & DefaultDesignProps;

  type Component = import("../bau-ui").Component<RadioButtonGroupProps>;

  export default function (context: any, option?: ComponentOption): Component;
}
