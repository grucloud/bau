import { Context } from "@grucloud/bau-ui/context";
import useQuery from "../utils/useQuery";

export default function (context: Context) {
  const { rest, window } = context;
  const query = useQuery(context);

  const getAllQuery = query(() => rest.get("infra"));
  const createQuery = query((data: any) => rest.post("infra", data));
  const getByIdQuery = query((id: string) => rest.get(`infra/${id}`));

  const infraStore = {
    getAll: async () => {
      const response: any = await getAllQuery.run();
      if (!response.length) {
        window.history.pushState("", "", "/infra/create");
      }
    },
    getAllQuery,
    createQuery,
    getById: async () => {
      getByIdQuery.run();
    },
  };

  return infraStore;
}
