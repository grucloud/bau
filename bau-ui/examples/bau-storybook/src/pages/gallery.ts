import button from "@grucloud/bau-ui/button";
import { Context } from "@grucloud/bau-ui/context";

import accordionItem from "./accordion/accordion-grid-item";
import alertItem from "./alert/alert-grid-item";
import autocompleteItem from "./autocomplete/autocomplete-grid-item";
import avatarItem from "./avatar/avatar-grid-item";
import badgeItem from "./badge/badge-grid-item";
import breadcrumbsItem from "./breadcrumbs/breadcrumbs-grid-item";
import buttonItem from "./button/button-grid-item";
import buttonGroupItem from "./buttonGroup/buttonGroup-grid-item";
import calendarItem from "./calendar/calendar-grid-item";
import checkboxItem from "./checkbox/checkbox-grid-item";
import chipItem from "./chip/chip-grid-item";
import drilldownMenuItem from "./drilldownMenu/drilldownMenu-grid-item";
import fileInputItem from "./fileInput/fileInput-grid-item";
import inputItem from "./input/input-grid-item";
import modalItem from "./modal/modal-grid-item";
import selectItem from "./select/select-grid-item";
import sliderItem from "./slider/slider-grid-item";
import spinnerItem from "./spinner/spinner-grid-item";
import createSwitchItem from "./switch/switch-grid-item";
import tabsItem from "./tabs/tabs-grid-item";
import createThemeSSwitchItem from "./themeSwitch/themeSwitch-grid-item";
import tooltipItem from "./tooltip/tooltip-grid-item";
import treeViewItem from "./treeView/treeView-grid-item";

import componentGrid from "./componentGrid";

export default (context: Context) => {
  const { bau, css } = context;
  const { section, div, h1, p, ul, li } = bau.tags;

  const ComponentGrid = componentGrid(context);

  const Button = button(context);

  const components = [
    {
      name: "Accordion",
      Item: accordionItem(context),
    },
    {
      name: "Alert",
      Item: alertItem(context),
    },
    {
      name: "Autocomplete",
      Item: autocompleteItem(context),
    },
    {
      name: "Avatar",
      Item: avatarItem(context),
    },
    {
      name: "Badge",
      Item: badgeItem(context),
    },
    {
      name: "Breadcrumbs",
      Item: breadcrumbsItem(context),
    },
    {
      name: "Button",
      Item: buttonItem(context),
    },
    {
      name: "Button Group",
      Item: buttonGroupItem(context),
    },
    {
      name: "Calendar",
      Item: calendarItem(context),
    },
    {
      name: "Checkbox",
      Item: checkboxItem(context),
    },
    {
      name: "Chip",
      Item: chipItem(context),
    },
    {
      name: "DrillDown Menu",
      Item: drilldownMenuItem(context),
    },
    {
      name: "File Input",
      Item: fileInputItem(context),
    },
    {
      name: "Input",
      Item: inputItem(context),
    },
    {
      name: "Modal",
      Item: modalItem(context),
    },
    {
      name: "Select",
      Item: selectItem(context),
    },
    {
      name: "Slider",
      Item: sliderItem(context),
    },
    {
      name: "Spinner",
      Item: spinnerItem(context),
    },
    {
      name: "Switch",
      Item: createSwitchItem(context),
    },
    {
      name: "Tabs",
      Item: tabsItem(context),
    },
    {
      name: "Theme Switch",
      Item: createThemeSSwitchItem(context),
    },
    {
      name: "Tooltip",
      Item: tooltipItem(context),
    },
    {
      name: "Tree View",
      Item: treeViewItem(context),
    },
  ];

  return () =>
    section(
      h1("Bau Component Gallery"),
      p("This page displays the components with various colors and variants."),
      ul(
        {
          class: css`
            display: inline-flex;
            flex-wrap: wrap;
            gap: 1rem;
            list-style: none;
            padding: 0;
          `,
        },
        components.map(({ name }) =>
          li(
            Button(
              {
                color: "primary",
                variant: "solid",
                href: `#${name}`,
                size: "sm",
              },
              name
            )
          )
        )
      ),
      components.map((comp) =>
        div(
          {
            id: comp.name,
            class: css`
              border: 1px dotted var(--color-emphasis-400);
              padding: 1rem;
              margin: 1rem;
            `,
          },
          ComponentGrid(comp)
        )
      )
    );
};
