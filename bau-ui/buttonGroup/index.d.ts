declare module "@grucloud/bau-ui/buttonGroup" {
  type DefaultDesignProps = import("../constants").DefaultDesignProps;

  export type ButtonGroupProps = {} & DefaultDesignProps;

  type Component = import("../bau-ui").Component<ButtonGroupProps>;

  type Option = {
    class?: string;
  };

  export default function (context: any, option?: Option): Component;
}
