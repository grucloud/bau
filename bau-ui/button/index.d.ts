declare module "@grucloud/bau-ui/button" {
  type DefaultDesignProps = import("../constants").DefaultDesignProps;

  type ButtonProps = {
    disabled?: boolean;
    href?: string;
  } & DefaultDesignProps;

  type Component = import("../bau-ui").Component<
    ButtonProps,
    HTMLButtonElement | HTMLAnchorElement
  >;

  export default function (context: any): Component;
}
