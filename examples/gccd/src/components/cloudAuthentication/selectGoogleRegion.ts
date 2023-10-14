import { Context } from "@grucloud/bau-ui/context";
import selectNative from "@grucloud/bau-ui/selectNative";

export default (context: Context) => {
  const { bau } = context;
  const { option } = bau.tags;

  const SelectNative = selectNative(context);

  return function SelectGoogleRegion(props: any) {
    //console.log("SelectGoogleRegion", props);
    const { regions } = props;

    return SelectNative(
      {
        required: "required",
        title: "Select a region",
        name: "GOOGLE_REGION",
        ...props,
      },
      option({ value: "" }, "--Please choose a region--"),
      regions.map((value: any) =>
        option({ value, selected: props.value == value }, value)
      )
    );
  };
};
