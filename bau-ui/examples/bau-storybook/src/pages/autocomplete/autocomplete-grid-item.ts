import { Context } from "@grucloud/bau-ui/context";
import autocomplete from "@grucloud/bau-ui/autocomplete";

export default (context: Context, componentsOptions?: any) => {
  const { bau, css } = context;
  const { div, span } = bau.tags;

  const Autocomplete = autocomplete(context, componentsOptions);

  const options = [
    { code: "AD", label: "Andorra", phone: "376" },
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
    Autocomplete({
      ...props,
      options,
      Option,
      getOptionValue: ({ code }: any) => code,
      getOptionLabel: ({ label }: any) => label,
      label: "Country",
      placeholder: "Search countries",
      name: "country",
      "aria-label": "country",
    });
};
