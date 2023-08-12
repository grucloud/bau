declare module "@grucloud/bau-ui/fileInput" {
  type DefaultDesignProps = import("../constants").DefaultDesignProps;
  type ComponentOption = import("../bau-ui").ComponentOption;

  export type FileInputProps = {
    disabled?: boolean;
  } & DefaultDesignProps;

  type Component = import("../bau-ui").Component<
    FileInputProps,
    HTMLInputElement
  >;

  export default function (context: any, option?: ComponentOption): Component;
}
