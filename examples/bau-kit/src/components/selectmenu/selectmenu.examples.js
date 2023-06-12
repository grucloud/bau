import selectmenu from "./selectmenu";

export default (context) => {
  const { tr, bau } = context;
  const { section, div, h3, h2 } = bau.tags;

  const Selectmenu = selectmenu(context);

  return () =>
    section(
      { id: "selectmenu-examples" },
      h2(tr("Select Menu Examples")),
      h3("Info"),
      Selectmenu()
    );
};
