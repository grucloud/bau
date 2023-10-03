import { Context } from "@grucloud/bau-ui/context";
import useQuery from "../utils/useQuery";

export default function (context: Context) {
  const { rest } = context;
  const query = useQuery(context);

  const getAllQuery = query(() => rest.get("git_repository"), {
    initialState: [],
  });
  const createQuery = query((data: any) => rest.post("git_repository", data));
  const getByIdQuery = query((id: string) => rest.get(`git_repository/${id}`));
  const patchQuery = query((id: string, data: object) =>
    rest.patch(`git_repository/${id}`, data)
  );
  const deleteQuery = query((id: string) => rest.del(`git_repository/${id}`));

  return {
    getAllQuery,
    getByIdQuery,
    createQuery,
    patchQuery,
    deleteQuery,
  };
}
