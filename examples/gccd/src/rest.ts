import { type Context } from "@grucloud/bau-ui/context";

export default function (context: Context) {
  const { config, window } = context;

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
      params ? `${url}?${new URLSearchParams(params).toString()}` : url;

    try {
      const response = await fetch(buildUrl(), {
        method,
        body: JSON.stringify(body),
        headers,
      });

      if (response.ok) {
        const json = await response.json();
        return json;
      } else {
        if (
          [401, 403].includes(response.status) &&
          !window.location.pathname.includes("login")
        ) {
          debugger;
          // @ts-ignore
          history.push(`${config.loginPath}?nextPath=${location.pathname}`);
        }
      }
    } catch (error: any) {
      throw error;
    } finally {
    }
  }

  return {
    get: (url: string, params = {}) => doFetch(url, "GET", undefined, params),
    post: (url: string, data = {}) => doFetch(url, "POST", data),
  };
}
