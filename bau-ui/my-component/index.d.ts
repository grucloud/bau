declare module "@grucloud/bau-ui/my-component" {
  export type MyComponentProps = {
    // severity: string;
    // onRemove?: Function;
  };

  type Component = import("../bau-ui").Component<MyComponentProps>;

  export default function (context: any): Component;
}
