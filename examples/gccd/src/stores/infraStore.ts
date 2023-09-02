import { Context } from "@grucloud/bau-ui/context";
import useQuery from "../utils/useQuery";

export default function (context: Context) {
  const { rest } = context;
  const query = useQuery(context);

  const getAllQuery = query(() => rest.get("infra"));
  const getByIdQuery = query((id: string) => rest.get(`infra/${id}`));

  const infraStore = {
    getAll: async () => {
      /*const response =*/ await getAllQuery.run();
      //   if (isEmpty(response)) {
      //     context.history.push("/infra/create");
      //   }
    },
    getById: async () => {
      getByIdQuery.run();
    },
  };

  return infraStore;
}
