import { Context } from "@grucloud/bau-ui/context";
import selectNative from "@grucloud/bau-ui/selectNative";

export default (context: Context) => {
  const { bau } = context;
  const { option } = bau.tags;
  const SelectNative = selectNative(context);

  return function SelectGoogleZone(props: any) {
    const { project_id, zones = [] } = props;
    //console.log("SelectGoogleZone zones", zones, project_id);
    return SelectNative(
      {
        required: "required",
        title: "Select a zone",
        name: "GOOGLE_ZONE",
        disabled: !project_id,
        ...props,
      },
      option({ value: "" }, "--Please choose a zone--"),
      zones.map((value: any) =>
        option({ value, selected: props.value == value }, value)
      )
    );
  };
};
