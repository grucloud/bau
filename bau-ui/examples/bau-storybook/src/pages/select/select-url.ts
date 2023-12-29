import { Context } from "@grucloud/bau-ui/context";
import button from "@grucloud/bau-ui/button";
import select from "@grucloud/bau-ui/select";

export default (context: Context) => {
  const { bau, css, window } = context;
  const { form, article, footer, div, span } = bau.tags;

  const selectName = "country";

  const Select = select(context);
  const ButtonSubmit = button(context, { variant: "solid", color: "primary" });

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

  return () => {
    const onsubmit = (event: any) => {
      event.preventDefault();
      const payload = Object.fromEntries(new FormData(event.currentTarget));
      alert(JSON.stringify(payload));
    };

    const getOptionValue = ({ code }: any) => code;

    const onSelect = (option: any) => {
      const search = new URLSearchParams(window.location.search);
      search.delete(selectName);
      search.append(selectName, getOptionValue(option));
      window.history.replaceState(
        "",
        "",
        `?${search.toString()}${window.location.hash}`
      );
    };

    const search = new URLSearchParams(window.location.search);

    return form(
      { onsubmit },
      article(
        Select({
          name: selectName,
          options,
          Option,
          defaultOption: options.find(
            ({ code }) => code == search.get(selectName)
          ),
          getOptionValue,
          getOptionLabel: ({ label }: any) => label,
          label: "Select a country...",
          onSelect,
        })
      ),
      footer(ButtonSubmit({ type: "submit" }, "Submit"))
    );
  };
};
