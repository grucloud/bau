import drillDownMenu from "@grucloud/bau-ui/drillDownMenu/drillDownMenu.js";

export default function (context) {
  const { bau, css, config } = context;
  const { div } = bau.tags;

  const DrillDownMenu = drillDownMenu(context, {
    // base: config.base,
  });

  return function NavBar({ tree, pathnameState }) {
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
        pathnameState,
      })
    );
  };
}
