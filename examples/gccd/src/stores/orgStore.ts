import { Context } from "@grucloud/bau-ui/context";
import useQuery from "../utils/useQuery";

export default function (context: Context) {
  const { rest } = context;
  const query = useQuery(context);

  return {
    getAllQuery: query(() => rest.get("org")),
    getByIdQuery: query((id: string) => rest.get(`org/${id}`)),
    createQuery: query((data: any) => rest.post("org", data)),
    deleteQuery: query(({ org_id }: any) => rest.del(`org/${org_id}`)),
    patchQuery: query((id: string, data: any) => rest.patch(`org/${id}`, data)),
  };
}
