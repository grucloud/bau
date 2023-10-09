import selectNative from "@grucloud/bau-ui/selectNative";

import { Context } from "@grucloud/bau-ui/context";
import regionsMap from "./googleRegion.json";

export default (context: Context) => {
  const { bau } = context;
  const { option } = bau.tags;
  const SelectNative = selectNative(context);

  return function SelectGoogleRegion(props: any) {
    return SelectNative(
      {
        required: "required",
        title: "Select a region",
        name: "GCP_REGION",
        ...props,
      },
      option({ value: "" }, "--Please choose a region--"),
      regionsMap.map((value) =>
        option({ value, selected: props.value == value }, value)
      )
    );
  };
};
