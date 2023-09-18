import { Context } from "@grucloud/bau-ui/context";

export default function (context: Context) {
  const { window, bau, config } = context;

  return {
    pathname: bau.state(window.location.pathname.replace(config.base, "")),
  };
}
