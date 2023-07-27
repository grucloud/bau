import drillDownMenu from "@grucloud/bau-ui/drillDownMenu/drillDownMenu.js";

export default function (context) {
  const { bau, css, window } = context;
  const { a, span, div } = bau.tags;

  const renderMenuItem = ({ name, label, href }) =>
    (href ? a : span)(
      {
        href,
      },
      label ?? name
    );

  const DrillDownMenu = drillDownMenu(context, { renderMenuItem });

  return function NavBar({ tree }) {
    return div(
      {
        class: css`
          grid-area: navbar;
          padding-right: 0.5rem;
          position: sticky;
          top: calc(var(--header-height));
          align-self: start;
          background-color: var(--background-color);
          max-height: calc(100vh - var(--header-height));
          overflow-y: scroll;
        `,
      },
      DrillDownMenu({
        tree,
        initialPathname: window.location.pathname,
      })
    );
  };
}
