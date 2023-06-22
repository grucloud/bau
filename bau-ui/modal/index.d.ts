declare module "@grucloud/bau-ui/modal" {
  export type ModalProps = {};

  type Component = import("../bau-ui").Component<ModalProps, HTMLDialogElement>;

  export default function (context: any): Component;
}
