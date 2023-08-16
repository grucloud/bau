declare module "@grucloud/bau-ui/popover" {
  type ComponentOption = import("../bau-ui").ComponentOption;

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

  export default function (context: any, option?: ComponentOption): Component;
}
