import list from "@grucloud/bau-ui/list";
import { Context } from "@grucloud/bau-ui/context";
import componentGrid from "./componentGrid";

const phoneCodes = [
  { code: "AD", label: "Andorra", phone: "376" },
  {
    code: "AE",
    label: "United Arab Emirates",
    phone: "971",
  },
  { code: "AF", label: "Afghanistan", phone: "93" },
];

export default (context: Context) => {
  const { tr, bau, css } = context;
  const { section, div, h3, h2, li, span } = bau.tags;

  const ComponentGrid = componentGrid(context);

  const Container = (...children: any[]) =>
    div(
      {
        class: css`
          border: 1px dotted red;
          padding: 1rem;
        `,
      },
      ...children
    );

  const List = list(context);

  const renderItem = ({ code, label }: any) =>
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

  return () =>
    section(
      { id: "list" },
      h2(tr("List")),
      h3("List outline primary"),
      Container(
        List(
          { variant: "outline", color: "primary" },
          phoneCodes.map(renderItem)
        )
      ),
      h3("List Table"),
      ComponentGrid({
        Item: (props: any) =>
          List(
            {
              ...props,
            },
            phoneCodes.map(renderItem)
          ),
      })
    );
};
