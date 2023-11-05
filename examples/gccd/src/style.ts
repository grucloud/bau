import { type Context } from "@grucloud/bau-ui/context";

export const createStyles = (context: Context) => {
  const { createGlobalStyles } = context;

  createGlobalStyles`
    :root {
      --header-height: 3rem;
    }
    html {
      scroll-behavior: smooth;
      scroll-padding-top: calc(var(--header-height) + 1rem);
    }
    fieldset {
      border: 1px solid var(--color-emphasis-200);
    }
  `;
};
