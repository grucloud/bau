import list from "@grucloud/bau-ui/list";
import { Context } from "@grucloud/bau-ui/context";

const phoneCodes = [
  { code: "AD", label: "Andorra", phone: "376" },
  { code: "AF", label: "Afghanistan", phone: "93" },
];

export default (context: Context, options?: any) => {
  const { bau, css } = context;
  const { span, li } = bau.tags;

  const List = list(context, options);

  const ListItem = ({ code, label }: any) =>
    li(
      {
        class: css`
          display: flex;
          gap: 1rem;
        `,
      },
      span(code),
      span(label)
    );

  return (props: any) =>
    List(
      {
        ...props,
      },
      phoneCodes.map(ListItem)
    );
};
