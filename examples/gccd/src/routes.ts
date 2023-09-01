import loginPage from "./pages/loginPage";

import { type Context } from "@grucloud/bau-ui/context";

export const createRoutes = ({ context }: { context: Context }) => [
  {
    path: "login",
    action: (_routerContext: any) => ({
      title: "Login",
      component: loginPage(context),
    }),
  },
];
