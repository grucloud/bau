declare module "@grucloud/bau-ui/button" {
  type Props = import("@grucloud/bau").Props;

  type ButtonProps = {
    raised?: boolean;
    primary?: boolean;
    accent?: boolean;
    ripple?: boolean;
    disabled?: boolean;
    href?: string;
  };

  type Component = import("../bau-ui").Component<
    ButtonProps,
    HTMLButtonElement | HTMLAnchorElement
  >;

  export default function (context: any): Component;
}
