declare module "@grucloud/bau-ui/pages/login" {
  type ComponentOption = import("../bau-ui").ComponentOption;

  export type LoginProps = {
    // severity: string;
    // onRemove?: Function;
  };

  type Component = import("../bau-ui").Component<LoginProps>;

  export default function (context: any): Component;
}
