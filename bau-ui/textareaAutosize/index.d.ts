declare module "@grucloud/bau-ui/textareaAutosize" {
  type DefaultDesignProps = import("../constants").DefaultDesignProps;
  type ComponentOption = import("../bau-ui").ComponentOption;

  export type TextareaAutosizeProps = {
    minRows?: number | import("@grucloud/bau").State<number>;
    maxRows?: number | import("@grucloud/bau").State<number>;
  } & DefaultDesignProps;

  type Component = import("../bau-ui").Component<
    TextareaAutosizeProps,
    HTMLTextAreaElement
  >;

  export default function (context: any, option?: ComponentOption): Component;
}
