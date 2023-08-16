export const onLocationChange = ({
  context,
  LayoutDefault,
  config: { base = "" },
}) => {
  const { window, bau, states } = context;
  const componentState = bau.state();
  const layoutEl = LayoutDefault({ componentState });
  const app = document.getElementById("app");
  app.replaceChildren(layoutEl);

  return ({ router }) => {
    //console.log("onLocationChange");
    const pathname = window.location.pathname.replace(base, "");
    const {
      title,
      component,
      Layout = LayoutDefault,
    } = router.resolve({
      pathname,
    });
    states.pathname.val = pathname;
    componentState.val = component;
    document.title = `${title}`;
  };
};
