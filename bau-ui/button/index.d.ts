declare module "@grucloud/bau-ui/button" {
  type DefaultDesignProps = import("../constants").DefaultDesignProps;
  type ComponentOption = import("../bau-ui").ComponentOption;

  type ButtonProps = {
    href?: string;
  } & DefaultDesignProps;

  type Component = import("../bau-ui").Component<
    ButtonProps,
    HTMLButtonElement | HTMLAnchorElement
  >;

  export default function (context: any, options?: ComponentOption): Component;
}
