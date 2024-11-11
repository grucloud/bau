import { Context } from "@grucloud/bau-ui/context";
import useQuery from "./useQuery";
import { Country } from "./types";

export default function (context: Context) {
  const query = useQuery(context);

  const fetchData = async ({ url }: { url: string }) => {
    console.log(url);
    const response = await fetch(url, {
      method: "get",
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (response.ok) {
      const json = await response.json();
      return json;
    } else {
      throw Error(response.statusText || String(response.status));
    }
  };

  return {
    getAll: query(
      () =>
        fetchData({
          url: `https://restcountries.com/v2/all?fields=name,capital,flag,population,region`,
        }),
      {
        initialState: [],
      }
    ),
    getByName: query(({ name }: any) =>
      fetchData({ url: `https://restcountries.com/v2/name/${name}` })
    ),
    findBorder: query(
      (borders: string[]): Promise<Country[]> =>
        fetchData({
          url: `https://restcountries.com/v3.1/alpha?codes=${borders.join(
            ","
          )}&fields=name,`,
        }),
      {
        initialState: [],
      }
    ),
  };
}
