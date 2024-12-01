import { type Context } from "@grucloud/bau-ui/context";
import select from "@grucloud/bau-ui/select";

export default function (context: Context) {
  const { bau, css } = context;
  const { span, div } = bau.tags;

  const Select = select(context, {
    color: "neutral",
    variant: "plain",
  });

  const options = [
    { label: "All" },
    { label: "Africa" },
    { label: "Americas" },

    { label: "Asia" },
    {
      label: "Europe",
    },
    {
      label: "Oceania",
    },
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

  const className = css``;

  return (props: any) => {
    return Select({
      name: "region",
      class: className,
      options,
      Option,
      getOptionValue: ({ label }: any) => label,
      getOptionLabel: ({ label }: any) => label,
      label: "Filter by region",
      ...props,
    });
  };
}
