declare module "@grucloud/bau-ui/alert" {
  type DefaultDesignProps = import("../constants").DefaultDesignProps;

  export type AnimateProps = {
    onRemove?: Function;
  } & DefaultDesignProps;

  type Component = import("../bau-ui").Component<AnimateProps>;

  export default function (context: Object): Component;
}
