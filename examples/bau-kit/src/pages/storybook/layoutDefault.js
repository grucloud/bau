import { header } from "./header";
import { footer } from "./footer";

export const layoutDefault = (context) => {
  const { bau } = context;
  const { div } = bau.tags;
  const Header = header(context);
  const Footer = footer(context);

  return function LayoutDefault({ component }) {
    return div(
      {
        style: `
          display: flex; 
          min-width: 100vw;
          min-height: 100vh;
          flex-direction: column;
        `,
      },
      Header(),
      div({ style: "flex-grow: 1" }, component()),
      Footer()
    );
  };
};
