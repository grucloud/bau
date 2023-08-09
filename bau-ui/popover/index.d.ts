declare module "@grucloud/bau-ui/popover" {
  export type PopoverProps = {};

  type Action = {
    openDialog: () => void;
    closeDialog: () => void;
  };

  type Component = import("../bau-ui").Component<
    PopoverProps,
    HTMLDialogElement,
    Action
  >;

  type Option = {
    class?: string;
  };

  export default function (context: any, option?: Option): Component;
}
