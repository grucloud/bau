import globalStyle from "@grucloud/bau-ui/globalStyle/globalStyle.js";

export const createStyles = (context) => {
  const { createGlobalStyles } = context;

  const colorPalette = [
    ["primary", { h: "230", s: "48%", l: "47%" }],
    ["secondary", { h: "338", s: "100%", l: "48%" }],
    ["success", { h: "120", s: "100%", l: "32%" }],
    ["info", { h: "194", s: "80%", l: "62%" }],
    ["warning", { h: "43", s: "100%", l: "50%" }],
    ["danger", { h: "358", s: "95%", l: "60%" }],
  ];

  globalStyle(context, { colorPalette });

  createGlobalStyles`
    :root {
      --header-height: 3rem;
    }
    html {
      scroll-behavior: smooth;
      scroll-padding-top: calc(var(--header-height) + 1rem);
    }

  `;
};
