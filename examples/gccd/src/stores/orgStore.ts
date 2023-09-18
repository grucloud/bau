import { Context } from "@grucloud/bau-ui/context";
import useQuery from "../utils/useQuery";

export default function (context: Context) {
  const { rest } = context;
  const query = useQuery(context);

  return {
    getAllQuery: query(() => rest.get("org")),
    createQuery: query((id: string) => rest.get(`org/${id}`)),
    getByIdQuery: query((data: any) => rest.post("org", data)),
    destroyQuery: query((id: string) => rest.del(`org/${id}`)),
    patchQuery: query((id: string, data: any) => rest.patch(`org/${id}`, data)),
  };
}
