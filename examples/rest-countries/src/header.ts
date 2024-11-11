import { type Context } from "@grucloud/bau-ui/context";
import createThemeSwitch from "@grucloud/bau-ui/themeSwitch";

export const header = (context: Context) => {
  const { bau, css } = context;
  const { header, h1, label } = bau.tags;

  const ThemeSwitch = createThemeSwitch(context);

  const className = css`
    display: flex;
    justify-content: space-between;
    align-items: center;
    background-color: var(--header-background-color);
    padding-inline: 3rem;
    padding-block: 1rem;
    box-shadow: 0 0 3px 3px rgb(0 0 0 / 3%);
    h1 {
      font-size: 1.5rem;
    }
    label {
      display: inline-flex;
      align-items: center;
      gap: 0.5rem;
      cursor: pointer;
      &::after {
        font-size: small;
        content: "Dark Mode";
      }
      &:has(> input:checked) {
        &::after {
          content: "Light Mode";
        }
      }
    }
  `;

  return () =>
    header(
      { class: className },
      h1("Where in the world?"),
      label(ThemeSwitch())
    );
};
