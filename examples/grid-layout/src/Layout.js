import "./style.css";
import header from "./Header";
import home from "./Home";
import footer from "./Footer";

export default function (context) {
  const { bau, css } = context;
  const { div } = bau.tags;
  const Header = header(context);
  const Home = home(context);
  const Footer = footer(context);

  const className = css`
    display: grid;
    grid-template-columns: 1fr;
    grid-auto-rows: max-content 1fr max-content;
    grid-template-areas:
      "header"
      "main"
      "footer";
    min-height: 100vh;
    min-width: 100vw;
  `;

  return function Layout() {
    return div({ class: className }, Header(), Home(), Footer());
  };
}
