import drawer from "@grucloud/bau-ui/drawer";
import { Context } from "../context";
import { componentList } from "../componentListData";

import button from "@grucloud/bau-ui/button";
import navBarMenu from "../navBarMenu";

export default (context: Context) => {
  const { tr, bau } = context;
  const { section, h2 } = bau.tags;

  const openState = bau.state(false);

  const Drawer = drawer(context);
  const Button = button(context);
  const NavBarMenu = navBarMenu(context);
  return () =>
    section(
      { id: "drawer" },
      h2(tr("Drawer")),
      Button(
        {
          raised: true,
          onclick: () => {
            openState.val = !openState.val;
          },
        },
        "OPEN DRAWER"
      ),
      Drawer({ openState }, NavBarMenu({ componentList: componentList() }))
    );
};
