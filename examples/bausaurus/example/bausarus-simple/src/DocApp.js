import globalStyle from "@grucloud/bau-ui/globalStyle/globalStyle.js";

import header from "./Header.js";
import navBar from "./NavBar.js";
import mainContent from "./MainContent.js";
import toc from "./Toc.js";
import footer from "./Footer.js";

import { registerHistoryBack, onClickAnchor } from "./router.js";

export default async function (context) {
  const { bau, css, createGlobalStyles, window } = context;
  const { div } = bau.tags;

  globalStyle(context);

  createGlobalStyles`
blockquote {
  margin: 1rem 0;
  border-left: .2rem solid var(--color-primary-lighter);
  padding: .25rem 0 .25rem 1rem;
  font-size: 1rem;
  color: var(--color-emphasis-900);
}

blockquote > p {
  margin: 0;
}
img  {
  width: 100%;
}`;

  const Header = header(context);
  const NavBar = navBar(context);
  const MainContent = await mainContent(context);
  const Toc = toc(context);
  const Footer = footer(context);

  return function DocApp({ navBarTree, contentHtml, toc }) {
    const mainEl = MainContent({ contentHtml });
    const tocEl = Toc({ toc });

    registerHistoryBack({ window, mainEl, tocEl, Toc });

    return div(
      {
        class: css`
          display: grid;
          grid-template-columns: minmax(15%, 300px) minmax(50%, 70%) minmax(
              15%,
              20%
            );
          grid-template-rows: auto 1fr auto;
          grid-template-areas:
            "header header header"
            "navbar main toc"
            "footer footer footer";
          min-height: 100vh;
        `,
        onclick: onClickAnchor({ mainEl, tocEl, Toc }),
      },
      Header(),
      NavBar({ tree: navBarTree }),
      mainEl,
      tocEl,
      Footer()
    );
  };
}
