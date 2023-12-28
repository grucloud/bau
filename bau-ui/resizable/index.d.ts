declare module "@grucloud/bau-ui/resizable" {
  type DefaultDesignProps = import("../constants").DefaultDesignProps;
  type ComponentOption = import("../bau-ui").ComponentOption;

  export type ResizableProps = {
    direction?: "vertical" | "horizontal";
  } & DefaultDesignProps;

  type Component = import("../bau-ui").Component<ResizableProps>;

  export default function (
    context: any,
    option?: ComponentOption & ResizableProps
  ): { Panel: Component; PanelGroup: Component; Handle: Component };
}
