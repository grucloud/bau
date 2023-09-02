import { type Context } from "@grucloud/bau-ui/context";
import button from "@grucloud/bau-ui/button";
import list from "@grucloud/bau-ui/list";

export default function (context: Context) {
  const { bau, css } = context;
  const { nav, li } = bau.tags;

  const Button = button(context);
  const List = list(context);

  const links = [
    { name: "Dashboard", href: "dashboard" },
    { name: "Profile", href: "profile" },
    { name: "Logout", href: "logout" },
  ];

  return function NavBarMenu() {
    return nav(
      {
        class: css`
          grid-area: navbar;
          border-right: 1px solid var(--color-emphasis-100);
        `,
      },
      List(links.map(({ name, href }) => li(Button({ href }, name))))
    );
  };
}
