import selectNative from "@grucloud/bau-ui/selectNative";

import { Context } from "@grucloud/bau-ui/context";
import regionsMap from "./azureRegion.json";

export default (context: Context) => {
  const { bau } = context;
  const { optgroup, option } = bau.tags;
  const SelectNative = selectNative(context);

  return function SelectAzureRegion(props: any) {
    return SelectNative(
      {
        required: "required",
        title: "Select an Azure region",
        name: "region",
        ...props,
      },
      option({ value: "" }, "--Please choose a region--"),
      regionsMap.map(({ group, regions }) =>
        optgroup(
          { label: group },
          regions.map(({ name, displayName }) =>
            option({ value: name, selected: props.value == name }, displayName)
          )
        )
      )
    );
  };
};
