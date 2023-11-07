import multiSelect from "@grucloud/bau-ui/multiSelect";
import { Context } from "@grucloud/bau-ui/context";

export default (context: Context, componentOptions?: any) => {
  const { bau, css } = context;
  const { div, span } = bau.tags;

  const MultiSelect = multiSelect(context, componentOptions);

  const options = [
    { group: "EC2" },
    { group: "ECS" },
    { group: "RDS" },
    { group: "AccessAnalyzer" },
    { group: "ACM" },
    { group: "Account" },
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
      span(option.group)
    );

  return (props: any) =>
    MultiSelect({
      ...props,
      options,
      Option,
      getOptionValue: ({ code }: any) => code,
      getOptionLabel: ({ label }: any) => label,
      label: "Select services",
    });
};
