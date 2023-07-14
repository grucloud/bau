import globalStyle from "@grucloud/bau-ui/globalStyle/globalStyle.js";

export const createStyles = (context) => {
  const { createGlobalStyles } = context;
  globalStyle(context);

  createGlobalStyles`
    :root {
      --header-height: 3rem;

      --table-cell-padding: 0.75rem;
      --table-background: transparent;
      --table-stripe-background: rgba(0, 0, 0, 0.03);
      --table-border-width: 1px;
      --table-border-color: var(--color-emphasis-300);
      --table-head-background: inherit;
      --table-head-color: inherit;
      --table-head-font-weight: var(--font-weight-bold);
      --table-cell-color: inherit;
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
    table {
      border-collapse: collapse;
      display: block;
      margin-bottom: var(--spacing-vertical);

      & thead tr {
        border-bottom: 2px solid var(--table-border-color);
      }

      & thead, tr:nth-child(2n) {
        background-color: var(--table-stripe-background);
      }

      & tr {
        background-color: var(--table-background);
        border-top: var(--table-border-width) solid var(--table-border-color);
      }

      & td, th {
        border: var(--table-border-width) solid var(--table-border-color);
        padding: var(--table-cell-padding);
      }

      & th {
        background-color: var(--table-head-background);
        color: var(--table-head-color);
        font-weight: var(--table-head-font-weight);
      }

      & td {
        color: var(--table-cell-color);
      }
    }
  `;
};
