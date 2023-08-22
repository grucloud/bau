import classNames from "@grucloud/bau-css/classNames.js";
import drillDownMenu from "@grucloud/bau-ui/drillDownMenu";

const tree = {
  data: { name: "Root" },
  children: [
    {
      data: { name: "Home", href: "/" },
    },
    {
      data: { name: "Getting Started", href: "/GettingStarted" },
    },
    {
      data: { name: "Components", href: "/components" },
      children: [
        { data: { name: "Accordion", href: "/components/accordion" } },
        { data: { name: "Alert", href: "/components/alert" } },
        { data: { name: "Alert Stack", href: "/components/alertStack" } },
        { data: { name: "Animate", href: "/components/animate" } },
        { data: { name: "Autocomplete", href: "/components/autocomplete" } },
        { data: { name: "Avatar", href: "/components/avatar" } },
        { data: { name: "Badge", href: "/components/badge" } },
        { data: { name: "Breadcrumb", href: "/components/breadcrumb" } },
        { data: { name: "Button", href: "/components/button" } },
        { data: { name: "Button Group", href: "/components/buttonGroup" } },
        { data: { name: "Calendar", href: "/components/calendar" } },
        { data: { name: "Chip", href: "/components/chip" } },
        { data: { name: "Checkbox", href: "/components/checkbox" } },
        { data: { name: "Drawer", href: "/components/drawer" } },
        {
          data: { name: "DrillDown Menu", href: "/components/drillDownMenu" },
        },
        { data: { name: "File Input", href: "/components/fileInput" } },
        { data: { name: "Input", href: "/components/input" } },
        { data: { name: "List", href: "/components/list" } },
        { data: { name: "Modal", href: "/components/modal" } },
        { data: { name: "Popover", href: "/components/popover" } },
        { data: { name: "Select", href: "/components/select" } },
        { data: { name: "Slider", href: "/components/slider" } },
        { data: { name: "Spinner", href: "/components/spinner" } },
        { data: { name: "Switch", href: "/components/switch" } },
        { data: { name: "Table", href: "/components/table" } },
        {
          data: {
            name: "Table Pagination",
            href: "/components/tablePagination",
          },
        },
        { data: { name: "Tab", href: "/components/tabs" } },
        { data: { name: "Tooltip", href: "/components/tooltip" } },
        { data: { name: "Theme Switch", href: "/components/themeSwitch" } },
        { data: { name: "Tree View", href: "/components/treeView" } },
      ],
    },
    // {
    //   data: { name: "Pages", href: "/pages" },
    //   children: [{ data: { name: "Login", href: "/pages/login" } }],
    // },
  ],
};

export default function (context) {
  const { tr, bau, css, config, states, window } = context;
  const { div, ul, li, nav, a, span } = bau.tags;

  let isMobile = false;

  const DrillDownMenu = drillDownMenu(context);

  return function NavBarMenu() {
    return div(
      {
        bauMounted: ({ element }) => {
          if (window.innerWidth <= 640) {
            isMobile = true;
            states.drawerOpen.val = false;
          }
        },
        onclick: (event) => {
          if (
            isMobile &&
            !event.target.dataset.buttonback &&
            !event.target.parentElement.classList.contains("has-children")
          ) {
            states.drawerOpen.val = false;
          }
        },
        style: () =>
          states.drawerOpen.val ? "display:block;" : "display:none;",
        class: classNames(
          css`
            grid-area: sidebar;
            position: sticky;
            top: calc(var(--header-height));
            align-self: start;
            overflow-y: scroll;
            height: calc(100vh - var(--header-height) - 1rem);
            border-right: 1px solid var(--color-emphasis-200);
            min-width: 200px;

            @media (max-width: 640px) {
              position: fixed;
              width: 100vw;
              z-index: 1;
              display: none;
            }
          `
        ),
      },
      DrillDownMenu({ tree })
    );
  };
}
