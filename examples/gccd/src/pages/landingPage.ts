import { Context } from "@grucloud/bau-ui/context";

export default function (context: Context) {
  const { bau, stores } = context;
  const { div } = bau.tags;

  return function Main({}) {
    console.log("Main");
    stores.infra.getAll();
    return div({}, "Main");
  };
}
