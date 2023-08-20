import createThemeSwitch from "@grucloud/bau-ui/themeSwitch";
import { Context } from "@grucloud/bau-ui/context";

export default (context: Context) => {
  const ThemeSwitch = createThemeSwitch(context);

  return (props: any) => ThemeSwitch(props);
};
