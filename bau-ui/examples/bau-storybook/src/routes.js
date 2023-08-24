import landingPage from "./landingPage";

import pagesList from "./pagesList";
import gettingStarted from "./pages/gettingStarted";

import accordionExamples from "./pages/accordion/accordion.examples";
import alertExamples from "./pages/alert.examples";
import alertStackExamples from "./pages/alertStack.examples";
import animateExamples from "./pages/animate.examples";
import avatarExamples from "./pages/avatar.examples";
import autocompleteExamples from "./pages/autocomplete.examples";
import badgeExamples from "./pages/badge.examples";
import breadcrumbExamples from "./pages/breadcrumb.examples";
import buttonExamples from "./pages/button.examples";
import buttonGroupExamples from "./pages/buttonGroup.examples";
import calendarExamples from "./pages/calendar.examples";
import carouselExamples from "./pages/carousel/carousel.examples";
import chipExamples from "./pages/chip.examples";
import checkboxExamples from "./pages/checkbox.examples";
import collapsibleExamples from "./pages/collapsible/collapsible.examples";
import drawerExamples from "./pages/drawer.examples";
import drillDownMenuExamples from "./pages/drillDownMenu.examples";
import fileInputExamples from "./pages/fileInput.examples";
import inputExamples from "./pages/input.examples";
import linearProgressExamples from "./pages/linearProgress/linearProgress.examples";
import loadingButtonExamples from "./pages/loadingButton/loadingButton.examples";
import listExamples from "./pages/list.examples";
import modalExamples from "./pages/modal.examples";
import popoverExamples from "./pages/popover.examples";
import paginationNavigationExamples from "./pages/paginationNavigation/paginationNavigation.examples";
import paperExamples from "./pages/paper.examples";
import selectExamples from "./pages/select.examples";
import sliderExamples from "./pages/slider.examples";
import spinnerExamples from "./pages/spinner.examples";
import switchExamples from "./pages/switch.examples";
import tabsExamples from "./pages/tabs.examples";
import tableExamples from "./pages/table.examples";
//import tableOfContentExamples from "./pages/tableOfContent/tableOfContent.examples";
import tablePaginationExamples from "./pages/tablePagination.examples";
//import toogleExamples from "./pages/toogle.examples";
//import toogleGroupExamples from "./pages/toogleGroup.examples";
import tooltipExamples from "./pages/tooltip.examples";
import themeSwitchExamples from "./pages/themeSwitch.examples";
import treeViewExamples from "./pages/treeView.examples";
import gallery from "./pages/gallery";

export const createRoutes = ({ context }) => [
  {
    path: "",
    action: (routerContext) => ({
      title: "Bau UI",
      component: landingPage(context),
    }),
  },
  {
    path: "GettingStarted",
    action: (routerContext) => ({
      title: "Getting Started",
      component: gettingStarted(context),
    }),
  },
  {
    path: "components",
    action: () => ({
      title: "Component",
      component: gallery(context),
    }),
    children: [
      {
        path: "accordion",
        action: () => ({
          title: "Accordion",
          component: accordionExamples(context),
        }),
      },
      {
        path: "alert",
        action: () => ({
          title: "Alert",
          component: alertExamples(context),
        }),
      },
      {
        path: "alertStack",
        action: () => ({
          title: "Alert Stack",
          component: alertStackExamples(context),
        }),
      },
      {
        path: "animate",
        action: () => ({
          title: "Animate",
          component: animateExamples(context),
        }),
      },
      {
        path: "autocomplete",
        action: () => ({
          title: "Autocomplete",
          component: autocompleteExamples(context),
        }),
      },
      {
        path: "avatar",
        action: () => ({
          title: "Avatar",
          component: avatarExamples(context),
        }),
      },

      {
        path: "badge",
        action: () => ({
          title: "Badge",
          component: badgeExamples(context),
        }),
      },
      {
        path: "breadcrumb",
        action: () => ({
          title: "Breadcrumb",
          component: breadcrumbExamples(context),
        }),
      },
      {
        path: "button",
        action: () => ({
          title: "Button",
          component: buttonExamples(context),
        }),
      },
      {
        path: "buttonGroup",
        action: () => ({
          title: "Button Group",
          component: buttonGroupExamples(context),
        }),
      },
      {
        path: "calendar",
        action: () => ({
          title: "Calendar",
          component: calendarExamples(context),
        }),
      },
      {
        path: "carousel",
        action: () => ({
          title: "Carousel",
          component: carouselExamples(context),
        }),
      },
      {
        path: "chip",
        action: () => ({
          title: "Chip",
          component: chipExamples(context),
        }),
      },
      {
        path: "checkbox",
        action: () => ({
          title: "Checkbox",
          component: checkboxExamples(context),
        }),
      },
      {
        path: "collapsible",
        action: () => ({
          title: "Collapsible",
          component: collapsibleExamples(context),
        }),
      },
      {
        path: "drawer",
        action: () => ({
          title: "Drawer",
          component: drawerExamples(context),
        }),
      },
      {
        path: "drillDownMenu",
        action: () => ({
          title: "DrillDown Menu",
          component: drillDownMenuExamples(context),
        }),
      },
      {
        path: "fileInput",
        action: () => ({
          title: "File Input",
          component: fileInputExamples(context),
        }),
      },
      {
        path: "input",
        action: () => ({
          title: "Input",
          component: inputExamples(context),
        }),
      },
      {
        path: "linearProgress",
        action: () => ({
          title: "Linear Progress",
          component: linearProgressExamples(context),
        }),
      },
      {
        path: "list",
        action: () => ({
          title: "List",
          component: listExamples(context),
        }),
      },
      {
        path: "loadingButton",
        action: () => ({
          title: "Loading Button",
          component: loadingButtonExamples(context),
        }),
      },
      {
        path: "modal",
        action: () => ({
          title: "Modal",
          component: modalExamples(context),
        }),
      },
      {
        path: "paginationNavigation",
        action: () => ({
          title: "Pagination Navigation",
          component: paginationNavigationExamples(context),
        }),
      },
      {
        path: "paper",
        action: () => ({
          title: "Paper",
          component: paperExamples(context),
        }),
      }, //
      {
        path: "popover",
        action: () => ({
          title: "Popover",
          component: popoverExamples(context),
        }),
      },
      {
        path: "select",
        action: () => ({
          title: "Select",
          component: selectExamples(context),
        }),
      },
      {
        path: "slider",
        action: () => ({
          title: "Slider",
          component: sliderExamples(context),
        }),
      },
      {
        path: "spinner",
        action: () => ({
          title: "Spinner",
          component: spinnerExamples(context),
        }),
      },
      {
        path: "switch",
        action: () => ({
          title: "Switch",
          component: switchExamples(context),
        }),
      },
      {
        path: "table",
        action: () => ({
          title: "Table",
          component: tableExamples(context),
        }),
      },
      {
        path: "tablePagination",
        action: () => ({
          title: "Table Pagination",
          component: tablePaginationExamples(context),
        }),
      },
      {
        path: "tabs",
        action: () => ({
          title: "Tabs",
          component: tabsExamples(context),
        }),
      },
      {
        path: "tooltip",
        action: () => ({
          title: "Tooltip",
          component: tooltipExamples(context),
        }),
      },
      {
        path: "themeSwitch",
        action: () => ({
          title: "Theme Switch",
          component: themeSwitchExamples(context),
        }),
      },
      {
        path: "treeView",
        action: () => ({
          title: "Tree View",
          component: treeViewExamples(context),
        }),
      },
    ],
  },
  {
    path: "pages",
    action: (routerContext) => ({
      title: "Pages",
      component: pagesList(context),
    }),
  },
];
