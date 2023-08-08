declare module "@grucloud/bau-ui/calendar" {
  export type CalendarProps = {};

  type Component = import("../bau-ui").Component<
    CalendarProps,
    HTMLInputElement
  >;

  type Option = {
    class?: string;
  };

  export default function (context: any, option?: Option): Component;
}
