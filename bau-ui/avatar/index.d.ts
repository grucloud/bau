declare module "@grucloud/bau-ui/avatar" {
  export type AvatarProps = {
    class?: string;
    alt: string;
    src: string;
    width?: Number;
    height?: Number;
  };

  type Component = import("../bau-ui").Component<AvatarProps>;

  export default function (context: any): Component;
}
