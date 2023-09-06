import { type Router } from "@grucloud/bau-router";

export const onLocationChange = ({
  context,
  LayoutDefault,
  config: { base = "" },
}: any) => {
  const { window, bau } = context;
  const componentState = bau.state();
  let CurrentLayout: any;
  return ({ router }: { router: Router }) => {
    console.log("onLocationChange");
    const pathname = window.location.pathname.replace(base, "");
    const {
      title,
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
    document.title = `${title}`;
  };
};
