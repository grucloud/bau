import select from "@grucloud/bau-ui/select";
import { Context } from "@grucloud/bau-ui/context";

export default (context: Context, componentOptions?: any) => {
  const { bau, css } = context;
  const { div, span } = bau.tags;

  const Select = select(context, componentOptions);

  const options = [
    { code: "AD", label: "Andorra", phone: "376" },
    {
      code: "AE",
      label: "United Arab Emirates",
      phone: "971",
    },
    { code: "AF", label: "Afghanistan", phone: "93" },
  ];

  const Option = (option: any) =>
    div(
      {
        class: css`
          display: flex;
          justify-content: space-between;
          gap: 0.5rem;
        `,
      },
      span(option.label),
      span(option.code)
    );

  return (props: any) =>
    Select({
      ...props,
      options,
      Option,
      getOptionValue: ({ code }: any) => code,
      getOptionLabel: ({ label }: any) => label,
      label: "Select a country...",
    });
};
