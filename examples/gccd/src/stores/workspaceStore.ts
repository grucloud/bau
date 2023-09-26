import { Context } from "@grucloud/bau-ui/context";
import useQuery from "../utils/useQuery";

export default function (context: Context) {
  const { rest } = context;
  const query = useQuery(context);

  return {
    getAllByProject: query(({ org_id, project_id }: any) =>
      rest.get(`org/${org_id}/project/${project_id}/workspace`)
    ),
    getByIdQuery: query(({ org_id, project_id, workspace_id }: any) =>
      rest.get(`org/${org_id}/project/${project_id}/workspace/${workspace_id}`)
    ),
    createQuery: query(({ org_id, project_id }: any, data: any) =>
      rest.post(`org/${org_id}/project/${project_id}/workspace`, data)
    ),
    patchQuery: query(({ org_id, project_id, workspace_id }: any, data: any) =>
      rest.patch(`org/${org_id}/project/${project_id}/${workspace_id}`, data)
    ),
    deleteQuery: query(({ org_id, project_id, workspace_id }: any) =>
      rest.del(`org/${org_id}/project/${project_id}/workspace/${workspace_id}`)
    ),
  };
}
