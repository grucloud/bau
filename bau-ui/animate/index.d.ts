declare module "@grucloud/bau-ui/animate" {
  export type AnimateProps = {
    parent: Element;
    animationHide: string;
    animationShow: string;
  };

  type Component = import("../bau-ui").ComponentOneChild<AnimateProps>;

  export default function (context: any): Component;
}
