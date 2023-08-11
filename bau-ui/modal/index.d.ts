declare module "@grucloud/bau-ui/modal" {
  type DefaultDesignProps = import("../constants").DefaultDesignProps;

  export type ModalProps = {} & DefaultDesignProps;

  type Component = import("../bau-ui").Component<ModalProps, HTMLDialogElement>;

  export default function (context: any): Component;
}
