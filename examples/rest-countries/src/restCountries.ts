import { type Context } from "@grucloud/bau-ui/context";
import inputSearch from "@grucloud/bau-ui/inputSearch";
import selectRegion from "./selectRegion";
import countries from "./countries";

export default function (context: Context, { store }: any) {
  const { bau, css } = context;
  const { article, p, form } = bau.tags;

  const InputSearch = inputSearch(context, {
    size: "lg",
    color: "neutral",
    variant: "plain",
  });

  const searchState = bau.state("");
  const regionState = bau.state("");

  const filteredCountries = bau.derive(() => {
    let data = store.getAll.data.val;
    if (searchState.val) {
      data = data.filter(({ name }: any) =>
        new RegExp(`${searchState.val}`, "i").test(name)
      );
    }
    if (regionState.val) {
      data = data.filter(({ region }: any) => region == regionState.val);
    }
    return data;
  });

  const SelectRegion = selectRegion(context);
  const Countries = countries(context, { store });

  const className = css`
    padding-inline: 3rem;
    padding-block: 2rem;
    > p {
      margin-block: 1rem;
    }
    .search {
      display: flex;
      justify-content: space-between;
      align-items: flex-start;
      flex-wrap: wrap;
      gap: 1rem;
    }
  `;

  return () => {
    return article(
      { class: className },
      form(
        p(
          { class: "search" },
          InputSearch({
            name: "country",
            placeholder: "Search for a country",
            size: 24,
            value: searchState.val,
            oninput: (event: any) => (searchState.val = event.target.value),
          }),
          SelectRegion({
            defaultOption: { label: regionState.val },
            onSelect: (option: any) => {
              option.label == "All"
                ? (regionState.val = "")
                : (regionState.val = option.label);
            },
          })
        )
      ),
      p(() => Countries({ data: filteredCountries.val }))
    );
  };
}
