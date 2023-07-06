import header from "./Header.js";
import navBar from "./NavBar.js";
import mainContent from "./MainContent.js";
import toc from "./Toc.js";
import footer from "./Footer.js";

import { registerHistoryBack, onClickAnchor } from "./router.js";

import { createStyles } from "./style.js";

export default async function (context) {
  const { bau, css, window } = context;
  const { div } = bau.tags;

  createStyles(context);

  const Header = header(context);
  const NavBar = navBar(context);
  const MainContent = await mainContent(context);
  const Toc = toc(context);
  const Footer = footer(context);

  const className = css`
    display: grid;
    grid-template-columns: minmax(15%, 300px) minmax(50%, 70%) minmax(15%, 20%);
    grid-template-rows: auto 1fr auto;
    grid-template-areas:
      "header header header"
      "navbar main toc"
      "footer footer footer";
    min-height: 100vh;
  `;

  return function DocApp({ navBarTree, contentHtml, toc }) {
    const mainEl = MainContent({ contentHtml });
    const tocEl = Toc({ toc });

    registerHistoryBack({ window, mainEl, tocEl, Toc });

    return div(
      {
        class: className,
        onclick: onClickAnchor({ window, mainEl, tocEl, Toc }),
      },
      Header(),
      navBarTree && NavBar({ tree: navBarTree }),
      mainEl,
      toc && tocEl,
      Footer()
    );
  };
}
