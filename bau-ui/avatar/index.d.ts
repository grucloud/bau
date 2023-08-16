declare module "@grucloud/bau-ui/avatar" {
  type DefaultDesignProps = import("../constants").DefaultDesignProps;
  type ComponentOption = import("../bau-ui").ComponentOption;

  export type AvatarProps = {
    class?: string;
    alt: string;
    src: string;
    width?: Number;
    height?: Number;
  } & DefaultDesignProps;

  type Component = import("../bau-ui").Component<AvatarProps>;

  export default function (context: any, option?: ComponentOption): Component;
}
