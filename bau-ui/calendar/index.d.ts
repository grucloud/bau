declare module "@grucloud/bau-ui/calendar" {
  type DefaultDesignProps = import("../constants").DefaultDesignProps;

  export type CalendarProps = {} & DefaultDesignProps;

  type Component = import("../bau-ui").Component<
    CalendarProps,
    HTMLInputElement
  >;

  type Option = {
    class?: string;
  };

  export default function (context: any, option?: Option): Component;
}
