import { type Router } from "@grucloud/bau-router";

export const onLocationChange = ({
  context,
  LayoutDefault,
  config: { base = "" },
}: any) => {
  const { window, bau, stores } = context;
  const componentState = bau.state();
  const pathnameState = stores.router.pathname;
  let CurrentLayout: any;
  return ({ router }: { router: Router }) => {
    console.log("onLocationChange");
    const pathname = window.location.pathname.replace(base, "");
    const {
      title,
      description,
      component,
      Layout = LayoutDefault,
    } = router.resolve({
      pathname,
    });

    if (CurrentLayout != Layout) {
      CurrentLayout = Layout;
      document
        .getElementById("app")
        ?.replaceChildren(Layout({ componentState }));
    }
    componentState.val = component({});
    pathnameState.val = pathname;
    document.title = `${title}`;
    // @ts-ignore
    document.getElementsByTagName("meta")["description"].content = description;
    document.title = `${title} - GruCloud`;
  };
};
