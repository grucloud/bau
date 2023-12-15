const ColorPaletteDefault = [
  ["neutral", { h: "0", s: "0%", l: "10%" }],
  ["primary", { h: "230", s: "70%", l: "30%" }],
  ["secondary", { h: "338", s: "70%", l: "50%" }],
  ["success", { h: "120", s: "70%", l: "25%" }],
  ["info", { h: "194", s: "70%", l: "30%" }],
  ["warning", { h: "43", s: "70%", l: "25%" }],
  ["danger", { h: "358", s: "70%", l: "30%" }],
];

const SHADES_LIGHT = [
  ["light", "1.15"],
  ["lighter", "1.3"],
  ["lightest", "1.5"],
];
const SHADES_DARK = [
  ["dark", "0.9"],
  ["darker", "0.7"],
  ["darkest", "0.5"],
];

const darkVar = (color) => `var(--color-${color})`;
const lightestVar = (color) => `var(--color-${color}-lightest)`;

const variantToCss = () =>
  ColorPaletteDefault.map(
    ([color]) =>
      `
.outline.${color} {
  border: 1px solid var(--color-emphasis-600);
  color: var(--font-color-base)
}
.soft.${color} {
  background-color: ${lightestVar(color)};
}
.solid.${color} {
  background-color: ${darkVar(color)};
}
`
  ).join("\n");

const darkColors = () =>
  ColorPaletteDefault.map(([color]) => [
    `--color-${color}-s: var(--color-${color}-dark-s);`,
  ]).join("\n");

const indexToColor = (index) => {
  return 100 - index * 10;
};

const buildGrays = () =>
  new Array(10)
    .fill("")
    .map(
      (v, index) =>
        `--color-gray-${index * 100}: hsl(0, 0%, ${indexToColor(index)}%);`
    )
    .join("\n");

export const buildEmphasis = ({ dark }) =>
  new Array(10)
    .fill("")
    .map(
      (v, index) =>
        `--color-emphasis-${index * 100}: var(--color-gray-${
          dark ? 1000 - index * 100 : index * 100
        });`
    )
    .join("\n");

const buildColor = ([color, { h, s, l }]) =>
  [
    `--color-${color}-h: ${h};`,
    `--color-${color}-l: ${l};`,
    `--color-${color}-base-s: ${s};`,
    `--color-${color}-s: var(--color-${color}-base-s);`,
    `--color-${color}-dark-s: calc(${s} - 25%);`,
    `--color-${color}-hsl: var(--color-${color}-h), var(--color-${color}-s), var(--color-${color}-l);`,
    `--color-${color}: hsl(var(--color-${color}-hsl));`,
    ...SHADES_LIGHT.map(
      ([shade, value]) =>
        `--color-${color}-${shade}: hsl(var(--color-${color}-h), var(--color-${color}-s), calc(var(--color-${color}-l) * ${value}));`
    ),
    ...SHADES_DARK.map(
      ([shade, value]) =>
        `--color-${color}-${shade}: hsl(var(--color-${color}-h), var(--color-${color}-s), calc(var(--color-${color}-l) * ${value}));`
    ),
    `--color-${color}-contrast-background: hsl(var(--color-${color}-h), var(--color-${color}-s), calc(var(--color-${color}-l) / var(--contrast-background-value)));`,
    `--color-${color}-contrast-foreground: hsl(var(--color-${color}-h), var(--color-${color}-s), calc(var(--color-${color}-l) * var(--contrast-foreground-value)));`,
  ].join("\n");

export default function globalStyle(
  { createGlobalStyles },
  { colorPalette = ColorPaletteDefault } = {}
) {
  createGlobalStyles`
    * {
      margin: 0;
      padding: 0;
    }
    h1,h2,h3,p {
      margin:0.3rem 0;
    }
    ul,ol {
      padding-left:1.3rem
    }
    :root {
      --color-scheme: light;
      --contrast-background-value: 90%;
      --contrast-foreground-value: 70%;
      --contrast-background-dark-value: 70%;
      --contrast-foreground-dark-value: 90%;
      --color-white: #fff;
      --color-black: #000;
      ${colorPalette.map(([color, hsl]) => buildColor([color, hsl])).join("\n")}
      ${buildGrays()}
      ${buildEmphasis({})}
      ${variantToCss()}
      --color-content: hsl(0, 0%, 10%);
      --color-content-inverse: hsl(0, 0%, 95%);
      --color-content-secondary: hsl(0, 0%, 40%);
      --background-color: var(--color-white);
      --global-border-width: 1px;
      --global-radius: 0.2rem;
      --font-color-base: var(--color-content);
      --font-color-disabled: var(--color-emphasis-600);
      --font-color-inverse: var(--color-content-inverse);
      --font-color-secondary: var(--color-content-secondary);
      --font-color-inverse-secondary: hsl(0, 0%, 75%);
      --font-family: system-ui, -apple-system, Helvetica, Arial, sans-serif;
      --font-family-monospace: Consolas, monospace;
      --font-weight-light: 300;
      --font-weight-normal: 400;
      --font-weight-semibold: 500;
      --font-weight-bold: 700;
      --global-spacing: 1rem;
      --spacing-vertical: var(--global-spacing);
      --spacing-horizontal: var(--global-spacing);
      --transition-fast: 200ms;
      --transition-slow: 400ms;
      --shadow-s: 0 1px 2px 0 rgba(0, 0, 0, 0.4);
      --shadow-m: 0 3px 1px -2px rgba(0, 0, 0, 0.2),
        0 2px 2px 0 rgba(0, 0, 0, 0.14), 0 1px 5px 0 rgba(0, 0, 0, 0.12);
      --shadow-lg: 0 2px 4px -1px rgba(0, 0, 0, 0.2),
        0 4px 5px 0 rgba(0, 0, 0, 0.14), 0 1px 10px 0 rgba(0, 0, 0, 0.12);
      --font-size-base: 100%;
      --line-height-base: 1.65;
      --link-color: var(--color-primary);
      --brightness-hover-always: 120%;
      --brightness-active-always: 130%;
      --brightness-hover: 80%;
      --brightness-hover-reverse: 140%;
      --brightness-active: 90%;
      .plain {
        background-color: var(--background-color);
      }
      .outline {
        background-color: var(--background-color);
      }
      .solid {
        color: var(--font-color-inverse);
      }
      .sm {
        font-size: 0.8rem;
      }
      .md {
        font-size: 1rem;
      }
      .lg {
        font-size: 1.2rem;
      }
    }
    :root {
      font-family: var(--font-family);
      color-scheme: var(--color-scheme);
      color: var(--color-content);
      font: var(--font-size-base) / var(--line-height-base) var(--font-family);
      background-color: var(--background-color);
    }
    html:has(dialog[open]) {
      overflow: hidden;
    }
    html[data-theme="dark"] {
      ${darkColors()}
      --color-scheme: dark;
      --background-color: #121212;
      --hover-overlay: rgba(255, 255, 255, 0.05);
      --color-content: #e3e3e3;
      --color-content-secondary: rgba(255, 255, 255, 0.5);
      --brightness-hover-always: 130%;
      --brightness-active-always: 120%;
      --brightness-active: 180%;
      --brightness-hover: 150%;
      --brightness-hover-reverse: 70% ${buildEmphasis({ dark: true })};
    }
  `;
}
