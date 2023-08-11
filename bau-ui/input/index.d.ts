declare module "@grucloud/bau-ui/input" {
  type DefaultDesignProps = import("../constants").DefaultDesignProps;

  export type InputProps = {
    name: string;
    id: string;
    label: string;
    error?: string;
  } & DefaultDesignProps;

  type Component = import("../bau-ui").Component<InputProps>;

  export default function (context: any): Component;
}
