import { Context } from "@grucloud/bau-ui/context";
import useQuery from "../utils/useQuery";

export default function (context: Context) {
  const { rest } = context;
  const query = useQuery(context);

  return {
    createQuery: query(({ org_id, project_id, workspace_id }: any, data: any) =>
      rest.post(
        `org/${org_id}/project/${project_id}/workspace/${workspace_id}/git_repository`,
        data
      )
    ),
    getByIdQuery: query(({ org_id, project_id, workspace_id }: any) =>
      rest.get(
        `org/${org_id}/project/${project_id}/workspace/${workspace_id}/git_repository`
      )
    ),
    patchQuery: query(({ org_id, project_id, workspace_id }: any, data: any) =>
      rest.patch(
        `org/${org_id}/project/${project_id}/workspaces/${workspace_id}/git_repository`,
        data
      )
    ),
  };
}
