import globalStyle, {
  buildEmphasis,
} from "@grucloud/bau-ui/globalStyle/globalStyle.js";

export const createStylesDark = (context) => {
  const { createGlobalStyles } = context;

  createGlobalStyles`
    html[data-theme='dark'] {
  --color-scheme: dark;
  --background-color: #121212;
  --hover-overlay: rgba(255, 255, 255, 0.05);
  --color-content: #e3e3e3;
  --color-content-secondary: rgba(255, 255, 255, 1);
  --brightness-hover: 180%;
  --brightness-hover-reverse: 60%
  --brightness-active: 75%;
  ${buildEmphasis({ dark: true })}
}
  `;
};
