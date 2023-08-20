declare module "@grucloud/bau-ui/animate" {
  export type AnimateProps = {
    animationHide?: () => string;
    animationShow?: () => string;
  };

  type Component = import("../bau-ui").ComponentOneChild<AnimateProps>;

  export default function (context: any): Component;
}
