declare module "@grucloud/bau-ui/keyValueList" {
  type DefaultDesignProps = import("../constants").DefaultDesignProps;
  type ComponentOption = import("../bau-ui").ComponentOption;

  export type KeyValueListProps = {} & DefaultDesignProps;

  type Component = import("../bau-ui").Component<KeyValueListProps>;

  export default function (context: any, option?: ComponentOption): Component;
}
