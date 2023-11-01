import { Context } from "@grucloud/bau-ui/context";
import alert from "@grucloud/bau-ui/alert";

import useQuery from "../utils/useQuery";
import { getAccessToken } from "../utils/authUtils";

const gitlabBaseUrl = "https://gitlab.com/api/v4";

const defaultHeaders = ({ access_token, password }: any) => ({
  ...(access_token && { Authorization: `Bearer ${access_token}` }),
  ...(password && { "PRIVATE-TOKEN": password }),
});

export default function (context: Context) {
  const { bau, window } = context;
  const { div } = bau.tags;
  const query = useQuery(context);
  const Alert = alert(context, {
    color: "danger",
  });

  const doFetch = async ({
    buildUrl,
    method = "GET",
    searchParam = {},
    password,
    transformPayload = (d: any) => d,
  }: any) => {
    const access_token = getAccessToken({ window })(
      /gitlab-access-token=(.[^;]*)/gi
    );

    const searchParamDefault = {
      // pagination: "keyset",
      per_page: 50,
      order_by: "name",
      //sort: "asc",
      owned: true,
    };

    try {
      const response = await fetch(
        `${buildUrl()}?${new URLSearchParams({
          ...searchParamDefault,
          ...searchParam,
        }).toString()}`,
        {
          method,
          headers: defaultHeaders({ access_token, password }),
        }
      );
      const body = await response.json();
      if (response.ok) {
        return transformPayload(body);
      } else {
        document.dispatchEvent(
          new CustomEvent("alert.add", {
            detail: {
              Component: () =>
                Alert(
                  div(response.statusText),
                  div(response.status),
                  div(body.error)
                ),
            },
          })
        );
      }
    } catch (error: any) {
      document.dispatchEvent(
        new CustomEvent("alert.add", {
          detail: {
            Component: () => Alert(error.message),
          },
        })
      );
      throw error;
    }
  };

  return {
    authenticatedUserQuery: query(
      async ({ access_token, password }: any) => {
        try {
          const response = await fetch(`${gitlabBaseUrl}/user`, {
            method: "GET",
            headers: defaultHeaders({ access_token, password }),
          });
          if (response.ok) {
            return await response.json();
          } else {
            throw Error("Cannot Authenticate");
          }
        } catch (error: any) {
          throw error;
        }
      },
      { initialState: {} }
    ),
    listRepoQuery: query(
      ({ password, access_token }: any) =>
        doFetch({
          buildUrl: () => `${gitlabBaseUrl}/projects`,
          password,
          access_token,
          transformPayload: (repos: any[]) =>
            repos.filter(
              (repo) => !repo.name_with_namespace.includes("deleted")
            ),
        }),
      { initialState: [] }
    ),
    listBranchesQuery: query(
      ({ repo, password, access_token }: any) =>
        doFetch({
          buildUrl: () =>
            `${gitlabBaseUrl}/projects/${repo}/repository/branches`,
          password,
          access_token,
        }),
      { initialState: [] }
    ),
  };
}
