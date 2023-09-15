import { Context } from "@grucloud/bau-ui/context";
import alert from "@grucloud/bau-ui/alert";

import useQuery from "../utils/useQuery";

export default function (context: Context) {
  const { bau, window } = context;
  const { div } = bau.tags;
  const query = useQuery(context);
  const Alert = alert(context, {
    color: "danger",
  });

  const getAccessToken = () => {
    var regex = /github-access-token=(.[^;]*)/gi;
    var match = regex.exec(window.document.cookie);
    return match && match[1];
  };

  const doFetch = async ({
    buildUrl,
    method = "GET",
    searchParam = {},
  }: any) => {
    const access_token = getAccessToken();
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
          headers: {
            Authorization: `Bearer ${access_token}`,
            "X-GitHub-Api-Version": "2022-11-28",
          },
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
    getAccessToken,
    listRepoQuery: query(
      ({ username }: any) =>
        doFetch({
          buildUrl: () => `https://api.github.com/users/${username}/repos`,
        }),
      { initialState: [] }
    ),
    listBranchesQuery: query(
      ({ username, repo }: any) =>
        doFetch({
          buildUrl: () =>
            `https://api.github.com/repos/${username}/${repo}/branches`,
          searchParam: { protected: false },
        }),
      { initialState: [] }
    ),
  };
}
