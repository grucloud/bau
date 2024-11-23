import landingPage from "./landingPage";

import pagesList from "./pagesList";
import gettingStarted from "./pages/gettingStarted";

import accordionExamples from "./pages/accordion/accordion.examples";
import alertExamples from "./pages/alert/alert.examples";
import alertStackExamples from "./pages/alertStack/alertStack.examples";
import animateExamples from "./pages/animate/animate.examples";
import avatarExamples from "./pages/avatar/avatar.examples";
import autocompleteExamples from "./pages/autocomplete/autocomplete.examples";
import badgeExamples from "./pages/badge/badge.examples";
import breadcrumbExamples from "./pages/breadcrumbs/breadcrumb.examples";
import buttonExamples from "./pages/button/button.examples";
import buttonGroupExamples from "./pages/buttonGroup/buttonGroup.examples";
import calendarExamples from "./pages/calendar/calendar.examples";
import carouselExamples from "./pages/carousel/carousel.examples";
import chipExamples from "./pages/chip/chip.examples";
import checkboxExamples from "./pages/checkbox/checkbox.examples";
import collapsibleExamples from "./pages/collapsible/collapsible.examples";
import dividerExamples from "./pages/divider/divider.examples";
import drawerExamples from "./pages/drawer/drawer.examples";
import dropdownMenuExamples from "./pages/dropdownMenu/dropdownMenu.examples";
import drillDownMenuExamples from "./pages/drilldownMenu/drillDownMenu.examples";
import fileInputExamples from "./pages/fileInput/fileInput.examples";
import formExamples from "./pages/form/form.examples";
import inputExamples from "./pages/input/input.examples";
import inputSearchExamples from "./pages/inputSearch/inputSearch.examples";
import keyValueListExamples from "./pages/keyValueList/keyValueList.examples";
import lazyExamples from "./pages/lazy/lazy.examples";
import linearProgressExamples from "./pages/linearProgress/linearProgress.examples";
import loadingButtonExamples from "./pages/loadingButton/loadingButton.examples";
import listExamples from "./pages/list/list.examples";
import modalExamples from "./pages/modal/modal.examples";
import multiSelectExamples from "./pages/multiSelect/multiSelect.examples";
import popoverExamples from "./pages/popover/popover.examples";
import paginationNavigationExamples from "./pages/paginationNavigation/paginationNavigation.examples";
import paperExamples from "./pages/paper/paper.examples";
import radioButtonExamples from "./pages/radioButton/radioButton.examples";
import radioButtonGroupExamples from "./pages/radioButtonGroup/radioButtonGroup.examples";
import resizableExamples from "./pages/resizable/resizable.examples";
import selectExamples from "./pages/select/select.examples";
import selectNativeExamples from "./pages/selectNative/select-native.examples";
import skeletonExamples from "./pages/skeleton/skeleton.examples";
import sliderExamples from "./pages/slider/slider.examples";
import spinnerExamples from "./pages/spinner/spinner.examples";
import stepperExamples from "./pages/stepper/stepper.examples";
import switchExamples from "./pages/switch/switch.examples";
import tabsExamples from "./pages/tabs/tabs.examples";
import tableExamples from "./pages/table/table.examples";
import tableOfContentExamples from "./pages/tableOfContent/tableOfContent.examples";
import tablePaginationExamples from "./pages/table/tablePagination.examples";
import textareaAutosizeExamples from "./pages/textareaAutosize/textareaAutosize.examples";
import toggleExamples from "./pages/toggle/toggle.examples";
import toggleGroupExamples from "./pages/toggleGroup/toggleGroup.examples";
import tooltipExamples from "./pages/tooltip/tooltip.examples";
import themeSwitchExamples from "./pages/themeSwitch/themeSwitch.examples";
import treeViewExamples from "./pages/treeView/treeView.examples";
import gallery from "./pages/gallery";

export const createRoutes = ({ context }) => {
  const Gallery = gallery(context);

  return [
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
        component: Gallery,
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
          path: "divider",
          action: () => ({
            title: "Divider",
            component: dividerExamples(context),
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
          path: "dropdownMenu",
          action: () => ({
            title: "Dropdown Menu ",
            component: dropdownMenuExamples(context),
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
          path: "form",
          action: () => ({
            title: "Form",
            component: formExamples(context),
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
          path: "inputSearch",
          action: () => ({
            title: "Input Search",
            component: inputSearchExamples(context),
          }),
        },
        {
          path: "keyValueList",
          action: () => ({
            title: "Key Value List",
            component: keyValueListExamples(context),
          }),
        },
        {
          path: "lazy",
          action: () => ({
            title: "Lazy",
            component: lazyExamples(context),
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
          path: "multiSelect",
          action: () => ({
            title: "Multi Select",
            component: multiSelectExamples(context),
          }),
        },
        //
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
          path: "radioButton",
          action: () => ({
            title: "Radio Button",
            component: radioButtonExamples(context),
          }),
        },
        {
          path: "radioButtonGroup",
          action: () => ({
            title: "Radio Button Group",
            component: radioButtonGroupExamples(context),
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
          path: "resizable",
          action: () => ({
            title: "Resizable",
            component: resizableExamples(context),
          }),
        },
        {
          path: "selectNative",
          action: () => ({
            title: "Select Native",
            component: selectNativeExamples(context),
          }),
        },
        {
          path: "skeleton",
          action: () => ({
            title: "Skeleton",
            component: skeletonExamples(context),
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
          path: "stepper",
          action: () => ({
            title: "Stepper",
            component: stepperExamples(context),
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
          path: "tableOfContent",
          action: () => ({
            title: "Table",
            component: tableOfContentExamples(context),
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
          path: "textareaAutosize",
          action: () => ({
            title: "Textarea Autosize",
            component: textareaAutosizeExamples(context),
          }),
        },
        {
          path: "toggle",
          action: () => ({
            title: "Toggle",
            component: toggleExamples(context),
          }),
        },
        {
          path: "toggleGroup",
          action: () => ({
            title: "Toggle Group",
            component: toggleGroupExamples(context),
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
};
