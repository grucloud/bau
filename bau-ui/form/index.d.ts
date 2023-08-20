declare module "@grucloud/bau-ui/form" {
  type DefaultDesignProps = import("../constants").DefaultDesignProps;
  type ComponentOption = import("../bau-ui").ComponentOption;

  export type FormProps = {} & DefaultDesignProps;

  type Component = import("../bau-ui").Component<FormProps>;

  export default function (context: any, option?: ComponentOption): Component;
}
