import { Main } from "./main";
import FormLogin from "../formLogin";

export const createRoutes = ({ context }) => [
  {
    path: "",
    action: (routerContext) => ({
      routerContext,
      title: "Admin",
      component: Main(context),
    }),
  },
  {
    path: "login",
    action: (routerContext) => ({
      routerContext,
      title: "Admin Login",
      component: FormLogin(context),
    }),
  },
];
