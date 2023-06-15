import { componentlist } from "./componentList";

export default function (context) {
  const { tr, bau, theme, css } = context;
  const { palette } = theme;
  const { ul, li, nav, a } = bau.tags;

  return function DrawerMenu() {
    return nav(
      {
        class: css`
          top: 20px;
          bottom: 0px;
          left: 0;
          min-width: 150px;
          max-width: 180px;
          overflow-y: scroll;
          box-shadow: 3px 3px 7px rgba(0, 0, 0, 0.5);
          max-height: 95vh;
          & ul {
            padding: 0;
            > li {
              cursor: pointer;
              margin: 10px 10px;
              list-style: none;
              > a {
                margin: 20px 0px;
                text-transform: uppercase;
                text-decoration-line: none;
                letter-spacing: 0.1em;
                font-weight: bold;
                color: ${palette.text.primary};
                &:hover {
                  color: ${palette.primary.main};
                  &::after {
                    background-color: ${palette.primary.main};
                    transform: translate(0%);
                  }
                }
                &::after {
                  content: "";
                  display: block;
                  margin-top: 6px;
                  height: 3px;
                  transition: 0.2s ease-out;
                  transform: translate(-100%);
                  transform-origin: right;
                }
              }
            }
          }
        `,
      },
      ul(componentlist().map(({ name, id }) => li(a({ href: `#${id}` }, name))))
    );
  };
}
