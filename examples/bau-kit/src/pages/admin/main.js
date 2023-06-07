export const Main = (context) => {
  const { tr, bau } = context;
  const { main, h1, button } = bau.tags;
  return () =>
    main(
      h1(
        tr("Admin Area"),
        button(
          {
            onclick: () => {
              history.pushState({}, null, "login");
            },
          },
          tr("Login")
        )
      )
    );
};
