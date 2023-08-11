declare module "@grucloud/bau-ui/fileInput" {
  type DefaultDesignProps = import("../constants").DefaultDesignProps;

  export type FileInputProps = {
    disabled?: boolean;
  } & DefaultDesignProps;

  type Component = import("../bau-ui").Component<
    FileInputProps,
    HTMLInputElement
  >;

  export default function (context: any): Component;
}
