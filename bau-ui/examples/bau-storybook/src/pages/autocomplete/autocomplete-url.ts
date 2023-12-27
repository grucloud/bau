import { Context } from "@grucloud/bau-ui/context";
import autocomplete from "@grucloud/bau-ui/autocomplete";
import button from "@grucloud/bau-ui/button";

export default (context: Context) => {
  const { bau, css } = context;
  const { form, article, footer, div, span } = bau.tags;

  const Autocomplete = autocomplete(context);
  const Button = button(context, {
    variant: "outline",
    color: "primary",
  });

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

  const autocompleteName = "country";

  return () => {
    const onsubmit = (event: any) => {
      event.preventDefault();
      const payload = Object.fromEntries(new FormData(event.currentTarget));
      alert(JSON.stringify(payload));
    };

    const search = new URLSearchParams(window.location.search);
    const defaultCode = search.get("country");

    const getOptionValue = ({ code }: any) => code;

    const onSelect = (option: any) => {
      const search = new URLSearchParams(window.location.search);
      search.delete(autocompleteName);
      search.append(autocompleteName, getOptionValue(option));
      window.history.replaceState(
        "",
        "",
        `?${search.toString()}${window.location.hash}`
      );
    };

    return form(
      { onsubmit },
      article(
        Autocomplete({
          name: autocompleteName,
          options,
          Option,
          defaultOption: options.find(({ code }) => code == defaultCode),
          getOptionValue: ({ code }: any) => code,
          getOptionLabel: ({ label }: any) => label,
          label: "Country",
          placeholder: "Search countries",
          onSelect,
        })
      ),
      footer(Button({ type: "submit" }, "Submit"))
    );
  };
};
