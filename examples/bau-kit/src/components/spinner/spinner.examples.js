import spinner from "./spinner";

export default (context) => {
  const { tr, bau, theme } = context;
  const { section, h2, div } = bau.tags;
  const { palette } = theme;

  const Spinner = spinner(context);
  return () =>
    section(
      h2(tr("Spinner Examples")),
      div(
        Spinner(),
        Spinner({ size: "30" }),
        Spinner({ size: "40", color: palette.primary.main }),
        Spinner({ size: "40", color: palette.secondary.main })
      )
    );
};
