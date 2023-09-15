import createThemeSwitch from "@grucloud/bau-ui/themeSwitch";
import { Context } from "@grucloud/bau-ui/context";

export default (context: Context, options: any) => {
  const ThemeSwitch = createThemeSwitch(context, options);

  return (props: any) => ThemeSwitch(props);
};
