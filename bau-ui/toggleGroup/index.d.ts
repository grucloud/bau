declare module "@grucloud/bau-ui/toggleGroup" {
  type DefaultDesignProps = import("../constants").DefaultDesignProps;
  type ComponentOption = import("../bau-ui").ComponentOption;

  export type ToggleGroupProps = {
    exclusive?: boolean;
    onChange: (input: { values: string[] }) => void;
  } & DefaultDesignProps;

  type Component = import("../bau-ui").Component<ToggleGroupProps>;

  export default function (context: any, option?: ComponentOption): Component;
}
