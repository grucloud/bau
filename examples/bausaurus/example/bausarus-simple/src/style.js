import globalStyle from "@grucloud/bau-ui/globalStyle/globalStyle.js";

export const createStyles = (context) => {
  const { createGlobalStyles } = context;
  globalStyle(context);

  createGlobalStyles`
    :root {
      --header-height: 3rem;
    }
    html {
      scroll-behavior: smooth;
      scroll-padding-top: calc(var(--header-height) + 1rem);
    }
    blockquote {
      margin: 1rem 0;
      border-left: 0.2rem solid var(--color-primary-lighter);
      padding: 0.25rem 0 0.25rem 1rem;
      font-size: 1rem;
      color: var(--color-emphasis-900);
      & > p {
        margin: 0;
      }
    }
    img {
      max-width: 100%;
    }
    code:hover > button {
      background: var(--background-color);
      visibility: visible;
    }
  `;
};
