import createThemeSwitch from "@grucloud/bau-ui/themeSwitch";

import { Context } from "../context";

export default (context: Context) => {
  const { tr, bau, css } = context;
  const { section, form, div, h2 } = bau.tags;

  const ThemeSwitch = createThemeSwitch(context);

  return () =>
    section(
      { id: "theme-switch" },
      h2(tr("Theme Switch")),
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
          ThemeSwitch({})
        )
      )
    );
};
