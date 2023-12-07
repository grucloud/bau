import keyValueList from "@grucloud/bau-ui/keyValueList";
import { Context } from "@grucloud/bau-ui/context";

export default (context: Context) => {
  const { bau } = context;
  const { section, li, label, span } = bau.tags;

  const KeyValueList = keyValueList(context);

  return () =>
    section(
      KeyValueList(
        li(label("My label"), span("My Value")),
        li(label("My other label"), span("My Other Value"))
      )
    );
};
