import button from "./button";

export default (context) => {
  const { tr, bau } = context;
  const { section, p, h2, h3 } = bau.tags;
  const Button = button(context);
  return () =>
    section(
      h2(tr("Button Examples")),
      h3("Flat"),
      p(
        Button({}, "Do stuff"),
        Button({
          primary: true,
          label: tr("FLAT PRIMARY"),
        }),
        Button({
          accent: true,
          label: tr("FLAT ACCENT"),
        }),
        Button({
          ripple: true,
          label: tr("RIPPLE FLAT"),
        }),
        Button({
          disabled: true,
          label: tr("DISABLED"),
        })
      ),
      h3("Primary"),
      p(
        Button({
          label: tr("primary"),
          primary: true,
        }),
        Button({
          primary: true,
          raised: true,
          label: tr("primary Raised"),
        }),
        Button({
          ripple: true,
          raised: true,
          label: tr("primary ripple"),
        }),
        Button({
          disabled: true,
          raised: true,
          label: tr("primary DISABLED"),
        })
      ),
      h3("Raised"),
      p(
        Button({
          label: tr("FLAT"),
          raised: true,
        }),
        Button({
          primary: true,
          raised: true,
          label: tr("Raised PRIMARY"),
        }),
        Button({
          accent: true,
          raised: true,
          label: tr("Raised ACCENT"),
        }),
        Button({
          ripple: true,
          raised: true,
          label: tr("Raised FLAT"),
        }),
        Button({
          disabled: true,
          raised: true,
          label: tr("Raised DISABLED"),
        })
      ),
      h3("Full With"),
      p(
        Button({
          fullWidth: true,
          label: tr("FLAT"),
          raised: true,
        }),
        Button({
          fullWidth: true,
          primary: true,
          label: tr("Raised PRIMARY"),
        })
      )
    );
};
