import { Context } from "@grucloud/bau-ui/context";
import useQuery from "../utils/useQuery";

export default function (context: Context) {
  const { rest } = context;
  const query = useQuery(context);

  const getAllQuery = query(() => rest.get("infra"));
  const createQuery = query((data: any) => rest.post("infra", data));
  const getByIdQuery = query((id: string) => rest.get(`infra/${id}`));
  const destroyQuery = query((id: string) => rest.del(`infra/${id}`));
  const patchQuery = query((id: string, data: any) =>
    rest.patch(`infra/${id}`, data)
  );

  const scanQuery = query(({ id }: any) =>
    rest.post(`cloudDiagram/`, { infra_id: id })
  );

  const infraStore = {
    getAll: async () => {
      const response: any = await getAllQuery.run();
      return response;
      // if (!response.length) {
      //   window.history.pushState("", "", "/infra/create");
      // }
    },
    getAllQuery,
    createQuery,
    getByIdQuery,
    destroyQuery,
    patchQuery,
    scanQuery,
  };

  return infraStore;
}
