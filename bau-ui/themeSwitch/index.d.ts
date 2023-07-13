declare module "@grucloud/bau-ui/themeSwitch" {
  export type ThemeSwitchProps = {};

  type Component = import("../bau-ui").Component<
    ThemeSwitchProps,
    HTMLInputElement
  >;

  export default function (context: any): Component;
}
