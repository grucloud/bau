import globalStyle, {
  buildEmphasis,
} from "@grucloud/bau-ui/globalStyle/globalStyle.js";

export const createStylesDark = (context) => {
  const { createGlobalStyles } = context;

  createGlobalStyles`
    html[data-theme='dark'] {
  --color-scheme: dark;
  --background-color: #1b1b1d;
  --background-surface-color: #242526;
  --hover-overlay: rgba(255, 255, 255, 0.05);
  --color-content: #e3e3e3;
  --color-content-secondary: rgba(255, 255, 255, 1);
  ${buildEmphasis(true)}
}
  `;
};
