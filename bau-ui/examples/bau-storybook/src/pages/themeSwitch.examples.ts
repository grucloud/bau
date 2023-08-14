import createThemeSwitch from "@grucloud/bau-ui/themeSwitch";
import componentGrid from "./componentGrid";

import { Context } from "@grucloud/bau-ui/context";

export default (context: Context) => {
  const { tr, bau, css } = context;
  const { section, form, div, h2 } = bau.tags;

  const ComponentGrid = componentGrid(context);

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
      ),
      h2(tr("Theme Switch Table")),
      ComponentGrid({
        Item: (props: any) => ThemeSwitch(props),
      })
    );
};
