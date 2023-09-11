import { type Context } from "@grucloud/bau-ui/context";
import alert from "@grucloud/bau-ui/alert";

export default function (context: Context) {
  const { bau, config, window } = context;
  const { div } = bau.tags;
  const Alert = alert(context, {
    color: "danger",
  });

  const headersDefault = {
    "Content-Type": "application/json",
  };

  async function doFetch(
    url: string,
    method: string,
    body?: object,
    params?: Record<string, string>,
    headers: any = headersDefault
  ) {
    const jwt = localStorage.getItem("JWT");
    if (jwt) {
      headers.Authorization = `Bearer ${jwt}`;
    }

    const buildUrl = () =>
      params
        ? `${config.apiUrl}${url}?${new URLSearchParams(params).toString()}`
        : `${config.apiUrl}${url}`;

    try {
      const response = await fetch(buildUrl(), {
        method,
        body: JSON.stringify(body),
        headers,
      });

      if (response.ok) {
        const json = await response.json();
        return json;
      } else if (
        [401, 403].includes(response.status) &&
        !window.location.pathname.includes("login")
      ) {
        history.pushState(
          {},
          "",
          `${config.loginPath}?nextPath=${location.pathname}`
        );
      } else if (![401, 403].includes(response.status)) {
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
  }

  return {
    get: (url: string, params = {}) => doFetch(url, "GET", undefined, params),
    post: (url: string, data = {}) => doFetch(url, "POST", data),
    patch: (url: string, data = {}) => doFetch(url, "PATCH", data),
    put: (url: string, data = {}) => doFetch(url, "PUT", data),
    del: (url: string) => doFetch(url, "DELETE"),
  };
}
