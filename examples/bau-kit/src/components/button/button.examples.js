import button from "./button";

export default (context) => {
  const { tr, bau, css } = context;
  const { section, p, h2, h3 } = bau.tags;
  const Button = button(context);
  return () =>
    section(
      {
        id: "button",
        class: css`
          & button {
            margin: 0.5rem;
          }
        `,
      },
      h2(tr("Button Examples")),
      h3("Flat"),
      p(
        Button({}, "Do stuff"),
        Button(
          {
            primary: true,
          },
          tr("FLAT PRIMARY")
        ),
        Button(
          {
            accent: true,
          },
          tr("FLAT ACCENT")
        ),
        Button(
          {
            ripple: true,
          },
          tr("FLAT ACCENT")
        ),
        Button(
          {
            disabled: true,
          },
          tr("DISABLED")
        )
      ),
      h3("Primary"),
      p(
        Button(
          {
            primary: true,
          },
          tr("primary")
        ),
        Button(
          {
            primary: true,
            raised: true,
          },
          tr("primary Raised")
        ),
        Button(
          {
            ripple: true,
            raised: true,
          },
          tr("primary ripple")
        ),
        Button(
          {
            disabled: true,
            raised: true,
          },
          tr("primary DISABLED")
        )
      ),
      h3("Raised"),
      p(
        Button(
          {
            raised: true,
          },
          tr("Raised FLAT")
        ),
        Button(
          {
            primary: true,
            raised: true,
          },
          tr("Raised PRIMARY")
        ),
        Button(
          {
            accent: true,
            raised: true,
          },
          tr("Raised ACCENT")
        ),
        Button(
          {
            ripple: true,
            raised: true,
          },
          tr("Raised RIPPLE")
        ),
        Button(
          {
            disabled: true,
            raised: true,
            label: tr("Raised DISABLED"),
          },
          tr("Raised DISABLED")
        )
      ),
      h3("Full With"),
      p(
        Button(
          {
            fullWidth: true,
            label: tr("FLAT"),
            raised: true,
          },
          tr("raised FLAT")
        ),
        Button(
          {
            fullWidth: true,
            primary: true,
          },
          tr("Raised PRIMARY")
        )
      ),
      h3("Icon"),
      p(
        Button({ "aria-label": "Close" }, "\u2716"),
        Button({ primary: true }, "\u2716"),
        Button({ raised: true }, "\u2716")
      )
    );
};
