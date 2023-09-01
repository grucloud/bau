import { type Router } from "@grucloud/bau-router";

export const onLocationChange = ({
  context,
  LayoutDefault,
  config: { base = "" },
}: any) => {
  const { window, bau } = context;
  const componentState = bau.state();
  const layoutEl = LayoutDefault({ componentState });
  const app = document.getElementById("app");
  app?.replaceChildren(layoutEl);

  return ({ router }: { router: Router }) => {
    //console.log("onLocationChange");
    const pathname = window.location.pathname.replace(base, "");
    const { title, component } = router.resolve({
      pathname,
    });
    componentState.val = component({});
    document.title = `${title}`;
  };
};
