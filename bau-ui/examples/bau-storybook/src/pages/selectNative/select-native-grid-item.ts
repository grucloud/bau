import selectNative from "@grucloud/bau-ui/selectNative";
import { Context } from "@grucloud/bau-ui/context";

export default (context: Context, options?: any) => {
  const { bau } = context;
  const { option } = bau.tags;

  const SelectNative = selectNative(context, options);

  const phoneOptions = [
    { code: "AD", label: "Andorra", phone: "376" },
    {
      code: "AE",
      label: "United Arab Emirates",
      phone: "971",
    },
    { code: "AF", label: "Afghanistan", phone: "93" },
  ];

  return (props: any) =>
    SelectNative(
      props,
      phoneOptions.map(({ label, phone }) => option({ value: phone }, label))
    );
};
