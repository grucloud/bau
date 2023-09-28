import { Context } from "@grucloud/bau-ui/context";
import useQuery from "../utils/useQuery";

export default function (context: Context) {
  const { rest } = context;
  const query = useQuery(context);

  const getAllByOrgQuery = query(({ org_id }: any) =>
    rest.get(`org/${org_id}/git_credential`)
  );
  const createQuery = query(({ org_id }: any, data: any) =>
    rest.post(`org/${org_id}/git_credential`, data)
  );
  const getByIdQuery = query(({ org_id, git_credential_id }: any) =>
    rest.get(`org/${org_id}/git_credential/${git_credential_id}`)
  );
  const patchQuery = query(({ org_id, git_credential_id }: any, data: object) =>
    rest.patch(`org/${org_id}/git_credential/${git_credential_id}`, data)
  );
  const deleteQuery = query(({ org_id, git_credential_id }: any) =>
    rest.del(`org/${org_id}/git_credential/${git_credential_id}`)
  );

  return {
    getAllByOrgQuery,
    getByIdQuery,
    createQuery,
    patchQuery,
    deleteQuery,
  };
}
