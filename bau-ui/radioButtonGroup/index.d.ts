declare module "@grucloud/bau-ui/radioButtonGroup" {
  type DefaultDesignProps = import("../constants").DefaultDesignProps;
  type ComponentOption = import("../bau-ui").ComponentOption;

  type RadioComponent = import("../bau-ui").ComponentGeneric;

  type RadioItem = {
    value: string;
    Label: RadioComponent | RadioComponent[];
  };
  export type RadioButtonGroupProps = {
    name: string;
    value?: any;
    oninput?: ({ target }: { target: HTMLInputElement }) => void;
    radios: RadioItem[];
  } & DefaultDesignProps;

  type Component = import("../bau-ui").Component<
    RadioButtonGroupProps,
    HTMLInputElement
  >;

  export default function (context: any, option?: ComponentOption): Component;
}
