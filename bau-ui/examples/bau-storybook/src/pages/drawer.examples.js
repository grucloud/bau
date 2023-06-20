import drawer from "@grucloud/bau-ui/drawer";

import button from "@grucloud/bau-ui/button";

export default (context) => {
  const { tr, bau } = context;
  const { section, div, h3, h2 } = bau.tags;

  const openState = bau.state(false);

  const Drawer = drawer(context);
  const Button = button(context);

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
      Drawer({ openState }, "Drawer Content")
    );
};
