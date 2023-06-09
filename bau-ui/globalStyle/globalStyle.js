const ColorPaletteDefault = [
  ["primary", { h: "230", s: "48%", l: "47%" }],
  ["secondary", { h: "338", s: "100%", l: "48%" }],
  ["success", { h: "120", s: "100%", l: "32%" }],
  ["info", { h: "194", s: "80%", l: "62%" }],
  ["warning", { h: "43", s: "100%", l: "50%" }],
  ["danger", { h: "358", s: "95%", l: "60%" }],
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

const buildGrays = () =>
  new Array(20)
    .fill("")
    .map(
      (v, index) =>
        `--color-gray-${index * 50}: hsl(0, 0%, ${100 - 5 * index}%);`
    )
    .join("\n");

export const buildEmphasis = ({ dark }) =>
  new Array(20)
    .fill("")
    .map(
      (v, index) =>
        `--color-emphasis-${index * 50}: var(--color-gray-${
          dark ? 1000 - index * 50 : index * 50
        });`
    )
    .join("\n");

const buildColor = ([color, { h, s, l }]) =>
  [
    `--color-${color}-h: ${h};`,
    `--color-${color}-s: ${s};`,
    `--color-${color}-l: ${l};`,
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
  --color-content: hsl(0, 0%, 10%);
  --color-content-inverse: hsl(0, 0%, 90%);
  --color-content-secondary: hsl(0, 0%, 30%);
  --background-color: var(--color-white);
  --background-surface-color: var(--color-content-inverse);
  --global-border-width: 1px;
  --global-radius: 0.4rem;
  --font-color-base: var(--color-content);
  --font-color-disabled: var(--color-emphasis-700);
  --font-color-inverse: var(--color-content-inverse);
  --font-color-secondary: var(--color-content-secondary);
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
  --global-shadow-lw: 0 1px 2px 0 rgba(0, 0, 0, 0.1);
  --global-shadow-md: 0 5px 40px rgba(0, 0, 0, 0.2);
  --global-shadow-tl: 0 12px 28px 0 rgba(0, 0, 0, 0.2),
    0 2px 4px 0 rgba(0, 0, 0, 0.1);
  --font-size-base: 100%;
  --line-height-base: 1.65;
  --link-color: var(--color-primary)
}
:root {
  font-family: var(--font-family);
  color-scheme: var(--color-scheme);
  color: var(--color-content);
  font: var(--font-size-base) / var(--line-height-base) var(--font-family)
}
body {
  margin: 0;
}
`;
}
