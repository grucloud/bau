import { Context } from "@grucloud/bau-ui/context";
import useQuery from "../utils/useQuery";

export default function (context: Context) {
  const { rest, bau, config, window } = context;
  const query = useQuery(context);

  const logoutQuery = query(() => rest.get("auth/logout"));

  const authenticated = bau.state(false);
  const userState = bau.state({});

  const redirect = () => {
    const nextPath =
      new URLSearchParams(window.location.search.slice(1)).get("nextPath") ||
      config.routeAfterLogin;
    // console.log(`redirect to ${nextPath}`);
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

  const store = {
    authenticated,
    setResult,
    logoutQuery,
    reset,
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

  return store;
}
