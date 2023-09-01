import { Context } from "@grucloud/bau-ui/context";

export default function (context: Context) {
  const { bau } = context;
  const { div } = bau.tags;

  return function Main({}) {
    return div({}, "Main");
  };
}
