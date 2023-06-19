import spinner from "./spinner";

export default (context) => {
  const { tr, bau } = context;
  const { section, h2, div } = bau.tags;

  const Spinner = spinner(context);
  return () =>
    section(
      { id: "spinner" },
      h2(tr("Spinner Examples")),
      div(
        Spinner({ size: "30" }),
        Spinner(),
        Spinner({ size: "40", color: "secondary" }),
        Spinner({ size: "50", color: "info" }),
        Spinner({ size: "60", color: "danger" })
      )
    );
};
