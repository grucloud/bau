import { Context } from "@grucloud/bau-ui/context";
import useQuery from "../utils/useQuery";

export default function (context: Context) {
  const { rest, bau, config, window } = context;
  const query = useQuery(context);

  const meQuery = query(() => rest.get("me"));
  const logoutQuery = query(() => rest.post("auth/logout"));

  const accountDeleteQuery = query(() => rest.del("me"));

  const authenticated = bau.state(false);
  const userState = bau.state({});

  const redirect = () => {
    const nextPath =
      new URLSearchParams(window.location.search.slice(1)).get("nextPath") ||
      config.routeAfterLogin;
    window.history.pushState("", "", nextPath);
  };

  const setResult = ({ user, token }: any) => {
    authenticated.val = true;
    userState.val = user;
    localStorage.setItem("JWT", token);
    redirect();
  };

  const reset = () => {
    authenticated.val = false;
    localStorage.removeItem("JWT");
  };

  const logout = () => {
    logoutQuery.run();
    reset();
  };

  return {
    authenticated,
    meQuery,
    accountDeleteQuery,
    setResult,
    reset,
    logout,
    logoutQuery,
    redirectFromSocialLogin: async () => {
      try {
        await rest.get("me");
        authenticated.val = true;
        redirect();
      } catch (errors) {
        reset();
      }
    },
  };
}
