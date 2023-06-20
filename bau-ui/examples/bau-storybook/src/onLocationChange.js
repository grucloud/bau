export const onLocationChange =
  ({ LayoutDefault, config: { base = "" } }) =>
  ({ router }) => {
    const {
      title,
      component,
      Layout = LayoutDefault,
    } = router.resolve({
      pathname: location.pathname.replace(base, ""),
    });
    const app = document.getElementById("app");
    app.replaceChildren(Layout({ component }));
    document.title = `${title}`;
  };
