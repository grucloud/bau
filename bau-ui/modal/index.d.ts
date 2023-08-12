declare module "@grucloud/bau-ui/modal" {
  type DefaultDesignProps = import("../constants").DefaultDesignProps;
  type ComponentOption = import("../bau-ui").ComponentOption;

  export type ModalProps = {} & DefaultDesignProps;

  type Component = import("../bau-ui").Component<ModalProps, HTMLDialogElement>;

  export default function (context: any, option?: ComponentOption): Component;
}
