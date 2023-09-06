import { Context } from "@grucloud/bau-ui/context";
import useQuery from "../utils/useQuery";

export default function (context: Context) {
  const { rest } = context;
  const query = useQuery(context);

  const getAllQuery = query(() => rest.get("git_credential"));
  const createQuery = query((data: any) => rest.post("git_credential", data));
  const getByIdQuery = query((id: string) => rest.get(`git_credential/${id}`));
  const patchQuery = query((id: string, data: object) =>
    rest.patch(`git_credential/${id}`, data)
  );
  const deleteQuery = query((id: string) => rest.del(`git_credential/${id}`));

  return {
    getAllQuery,
    getByIdQuery,
    createQuery,
    patchQuery,
    deleteQuery,
  };
}
