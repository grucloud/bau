import createSwitch from "@grucloud/bau-ui/switch";

export default (context) => {
  const { tr, bau, css } = context;
  const { section, form, label, div, h2 } = bau.tags;

  const Switch = createSwitch(context);

  return () =>
    section(
      { id: "switch" },
      h2(tr("Switch Examples")),
      form(
        div(
          {
            class: css`
              display: flex;
              align-items: center;
              > * {
                margin: 0.5rem;
              }
            `,
          },
          label({ for: "my-switch" }, "My shinny switch"),
          Switch({ id: "my-switch" })
        )
      )
    );
};
