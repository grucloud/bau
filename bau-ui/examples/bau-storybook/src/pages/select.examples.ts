import select from "@grucloud/bau-ui/select";
import componentGrid from "./componentGrid";

import { Context } from "../context";

export default (context: Context) => {
  const { tr, bau, css } = context;
  const { section, div, h3, h2, span } = bau.tags;
  const Container = (...children: any[]) =>
    div(
      {
        class: css`
          display: flex;
          border: 1px dotted var(--color-gray-500);
          padding: 1rem;
        `,
      },
      ...children
    );

  const ComponentGrid = componentGrid(context);
  const Select = select(context);

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

  return () =>
    section(
      {
        id: "select",
        class: css``,
      },
      h2(tr("Select")),
      h3("Basic Select"),
      Container(
        Select({
          options,
          Option,
          getOptionLabel: ({ label }: any) => label,
          label: "Select a country...",
        })
      ),
      h2(tr("Select Table")),
      ComponentGrid({
        Item: (props: any) =>
          div(
            Select({
              ...props,
              options,
              Option,
              getOptionLabel: ({ label }: any) => label,
              label: "Select a country...",
            })
          ),
      })
    );
};
