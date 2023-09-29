import { type Context } from "@grucloud/bau-ui/context";
import button from "@grucloud/bau-ui/button";
import list from "@grucloud/bau-ui/list";

export default function (context: Context) {
  const { bau, css, config } = context;
  const { nav, li } = bau.tags;

  const Button = button(context);
  const List = list(context);

  const links = [
    { name: "Runs", href: "runs" },
    { name: "Workspaces", href: "workspaces" },
    { name: "Projects", href: "projects" },
    { name: "Organisations", href: "org" },
    { name: "Profile", href: "profile" },
    { name: "Logout", href: "logout" },
  ];

  const className = css`
    grid-area: navbar;
    border-right: 1px solid var(--color-emphasis-100);
  `;

  return function NavBarMenu() {
    return nav(
      { class: className },
      List(
        links.map(({ name, href }) =>
          li(Button({ href: `${config.base}/${href}` }, name))
        )
      )
    );
  };
}
