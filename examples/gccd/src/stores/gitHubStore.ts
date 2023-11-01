import { Context } from "@grucloud/bau-ui/context";
import alert from "@grucloud/bau-ui/alert";

import useQuery from "../utils/useQuery";
import { getAccessToken } from "../utils/authUtils";

const defaultHeaders = ({ access_token, password }: any) => ({
  ...(access_token && { Authorization: `Bearer ${access_token}` }),
  ...(password && { Authorization: `token ${password}` }),
  "X-GitHub-Api-Version": "2022-11-28",
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
  }: any) => {
    const access_token =
      password ?? getAccessToken({ window })(/github-access-token=(.[^;]*)/gi);
    if (!access_token) return;
    const searchParamDefault = { per_page: "100" };
    try {
      const response = await fetch(
        `${buildUrl()}?${new URLSearchParams({
          ...searchParamDefault,
          ...searchParam,
        }).toString()}`,
        {
          method,
          headers: defaultHeaders({ access_token }),
        }
      );
      if (response.ok) {
        const json = await response.json();
        return json;
      } else {
        document.dispatchEvent(
          new CustomEvent("alert.add", {
            detail: {
              Component: () =>
                Alert(div(response.statusText), div(response.status)),
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
          const response = await fetch(`https://api.github.com/user`, {
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
      ({ username, password }: any) =>
        doFetch({
          buildUrl: () => `https://api.github.com/users/${username}/repos`,
          password,
        }),
      { initialState: [] }
    ),
    listBranchesQuery: query(
      ({ username, repo, password }: any) =>
        doFetch({
          buildUrl: () =>
            `https://api.github.com/repos/${username}/${repo}/branches`,
          searchParam: { protected: false },
          password,
        }),
      { initialState: [] }
    ),
  };
}
