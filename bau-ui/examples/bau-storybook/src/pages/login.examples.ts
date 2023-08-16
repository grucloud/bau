import login from "@grucloud/bau-ui/pages/login";

import { Context } from "@grucloud/bau-ui/context";

export default (context: Context) => {
  const { tr, bau } = context;
  const { section, div, h3, h2 } = bau.tags;
  const Login = login(context);
  return () =>
    section(
      { id: "login" },
      h2(tr("Login Examples")),
      h3("Basic"),
      div(Login())
    );
};
