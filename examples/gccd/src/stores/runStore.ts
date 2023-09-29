import { Context } from "@grucloud/bau-ui/context";
import useQuery from "../utils/useQuery";

export default function (context: Context) {
  const { rest } = context;
  const query = useQuery(context);

  return {
    getAllByUserQuery: query(() => rest.get(`runs`)),
    getAllByWorkspaceQuery: query(({ org_id, project_id, workspace_id }: any) =>
      rest.get(
        `org/${org_id}/project/${project_id}/workspace/${workspace_id}/run`
      )
    ),
    createQuery: query(({ org_id, project_id, workspace_id }: any, data: any) =>
      rest.post(
        `org/${org_id}/project/${project_id}/workspace/${workspace_id}/run`,
        data
      )
    ),
    getByIdQuery: query(({ org_id, project_id, workspace_id, run_id }: any) =>
      rest.get(
        `org/${org_id}/project/${project_id}/workspace/${workspace_id}/run/${run_id}`
      )
    ),
    patchQuery: query(
      ({ org_id, project_id, workspace_id, run_id }: any, data: any) =>
        rest.patch(
          `org/${org_id}/project/${project_id}/workspaces/${workspace_id}/run/${run_id}`,
          data
        )
    ),
    deleteQuery: query(({ org_id, project_id, workspace_id, run_id }: any) =>
      rest.del(
        `org/${org_id}/project/${project_id}/workspace/${workspace_id}/run/${run_id}`
      )
    ),
  };
}
