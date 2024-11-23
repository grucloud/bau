import drillDownMenu from "@grucloud/bau-ui/drillDownMenu";
import inputSearch from "@grucloud/bau-ui/inputSearch";

export default function (context) {
  const { tr, bau, css, config, states, window } = context;
  const { div, ul, li, nav, a, span, form } = bau.tags;

  const InputSearch = inputSearch(context, {
    variant: "plain",
    color: "neutral",
    size: "sm",
    class: css`
      margin: 0.5rem;
    `,
  });

  const componentSearch = ({
    renderListDefault,
    children,
    pathnameState,
    variant,
    color,
    size,
  }) => {
    const searchTerm = bau.state("");
    const result = bau.derive(() => {
      if (searchTerm.val == "") {
        return children;
      } else {
        return children.filter((child) =>
          child.data.name.match(new RegExp(`${searchTerm.val}`, "i"))
        );
      }
    });

    const oninput = (event) => {
      searchTerm.val = event.target.value;
    };

    return form(
      {
        class: css`
          display: flex;
          flex-direction: column;
          gap: 0;
        `,
      },
      InputSearch({
        autocomplete: "off",
        name: "component-search",
        autofocus: true,
        value: searchTerm,
        placeholder: `Search ${result.val.length} components`,
        size: 32,
        oninput,
      }),
      () =>
        renderListDefault({
          children: result.val,
          pathnameState,
          variant,
          color,
          size,
        })
    );
  };
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
        renderList: componentSearch,
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
          { data: { name: "Carousel", href: "/components/carousel" } },

          { data: { name: "Chip", href: "/components/chip" } },
          { data: { name: "Checkbox", href: "/components/checkbox" } },
          { data: { name: "Collapsible", href: "/components/collapsible" } },
          { data: { name: "Divider", href: "/components/divider" } },
          { data: { name: "Drawer", href: "/components/drawer" } },
          { data: { name: "Dropdown Menu", href: "/components/dropdownMenu" } },
          {
            data: { name: "DrillDown Menu", href: "/components/drillDownMenu" },
          },
          { data: { name: "File Input", href: "/components/fileInput" } },
          { data: { name: "Form", href: "/components/form" } },
          { data: { name: "Input", href: "/components/input" } },
          { data: { name: "Input Search", href: "/components/inputSearch" } },
          {
            data: { name: "Key Value List", href: "/components/keyValueList" },
          },
          {
            data: {
              name: "Lazy",
              href: "/components/lazy",
            },
          },
          {
            data: {
              name: "Linear Progress",
              href: "/components/linearProgress",
            },
          },
          { data: { name: "List", href: "/components/list" } },
          {
            data: { name: "Loading Button", href: "/components/loadingButton" },
          },
          { data: { name: "Modal", href: "/components/modal" } },
          { data: { name: "Multi Select", href: "/components/multiSelect" } },

          { data: { name: "Paper", href: "/components/paper" } },
          {
            data: {
              name: "Pagination Navigation",
              href: "/components/paginationNavigation",
            },
          },
          { data: { name: "Popover", href: "/components/popover" } },
          { data: { name: "Radio Button", href: "/components/radioButton" } },
          {
            data: {
              name: "Radio Button Group",
              href: "/components/radioButtonGroup",
            },
          },
          { data: { name: "Resizable", href: "/components/resizable" } },

          { data: { name: "Select", href: "/components/select" } },
          { data: { name: "Select Native", href: "/components/selectNative" } },
          { data: { name: "Skeleton", href: "/components/skeleton" } },
          { data: { name: "Slider", href: "/components/slider" } },
          { data: { name: "Spinner", href: "/components/spinner" } },
          { data: { name: "Stepper", href: "/components/stepper" } },
          { data: { name: "Switch", href: "/components/switch" } },
          { data: { name: "Table", href: "/components/table" } },
          {
            data: {
              name: "Table Pagination",
              href: "/components/tablePagination",
            },
          },
          { data: { name: "Tabs", href: "/components/tabs" } },
          {
            data: {
              name: "Table of content",
              href: "/components/tableOfContent",
            },
          },
          {
            data: {
              name: "TextareaAutosize",
              href: "/components/textareaAutosize",
            },
          },

          { data: { name: "Toggle", href: "/components/toggle" } },
          { data: { name: "Toggle Group", href: "/components/toggleGroup" } },
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
        class: css`
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
        `,
      },
      DrillDownMenu({ tree })
    );
  };
}
