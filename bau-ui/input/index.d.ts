declare module "@grucloud/bau-ui/input" {
  export type InputProps = {
    name: string;
    id: string;
    label: string;
    error?: string;
  };

  type Component = import("../bau-ui").Component<InputProps>;

  export default function (context: any): Component;
}
