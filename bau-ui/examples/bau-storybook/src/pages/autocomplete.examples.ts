import autocomplete from "@grucloud/bau-ui/autocomplete";
import componentGrid from "./componentGrid";

import { Context } from "@grucloud/bau-ui/context";

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

  const Autocomplete = autocomplete(context);

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
        id: "autocomplete",
        class: css``,
      },
      h2(tr("Autocomplete")),
      h3("Basic Autocomplete"),
      Container(
        Autocomplete({
          options,
          Option,
          getOptionLabel: ({ label }: any) => label,
          label: "Country",
          placeholder: "Search countries",
          id: "country",
        })
      ),
      h3("Autocomplete Table"),
      ComponentGrid({
        Item: (props: any) =>
          Autocomplete({
            ...props,
            options,
            Option,
            getOptionLabel: ({ label }: any) => label,
            label: "Country",
            placeholder: "Search countries",
            id: "country",
          }),
      })
    );
};
