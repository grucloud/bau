declare module "@grucloud/bau-ui/calendar" {
  type DefaultDesignProps = import("../constants").DefaultDesignProps;
  type ComponentOption = import("../bau-ui").ComponentOption;

  export type CalendarProps = {} & DefaultDesignProps;

  type Component = import("../bau-ui").Component<
    CalendarProps,
    HTMLInputElement
  >;

  export default function (context: any, option?: ComponentOption): Component;
}
