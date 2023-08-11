declare module "@grucloud/bau-ui/avatar" {
  type DefaultDesignProps = import("../constants").DefaultDesignProps;

  export type AvatarProps = {
    class?: string;
    alt: string;
    src: string;
    width?: Number;
    height?: Number;
  } & DefaultDesignProps;

  type Component = import("../bau-ui").Component<AvatarProps>;

  type Option = {
    class?: string;
  };

  export default function (context: any, option?: Option): Component;
}
