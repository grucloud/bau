import { type Context } from "@grucloud/bau-ui/context";
import restCountries from "./restCountries";
import country from "./country";
import CountryStore from "./countryStore";

export const createRoutes = ({ context }: { context: Context }) => {
  const store = CountryStore(context);

  const Country = country(context, { store });
  const RestCountries = restCountries(context, { store });

  return [
    {
      path: "",
      action: (routerContext: any) => {
        if (store.getAll.data.val.length == 0) {
          store.getAll.run();
        }
        return {
          routerContext,
          title: "Countries",
          component: () => RestCountries(),
        };
      },
    },
    {
      path: "(?<country>.[^/]+)",
      action: ({ match: { groups } }: any) => {
        store.getByName.reset();
        store.findBorder.reset();

        store.getByName.run({ name: groups.country });
        return {
          title: `${groups.country}`,
          component: () => Country(groups),
        };
      },
    },
  ];
};
