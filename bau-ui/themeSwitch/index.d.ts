declare module "@grucloud/bau-ui/themeSwitch" {
  type ComponentOption = import("../bau-ui").ComponentOption;

  export type ThemeSwitchProps = {};

  type Component = import("../bau-ui").Component<
    ThemeSwitchProps,
    HTMLInputElement
  >;

  export default function (context: any, option?: ComponentOption): Component;
}
