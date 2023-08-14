import accordion, { Accordion } from "@grucloud/bau-ui/accordion";
import alert from "@grucloud/bau-ui/alert";
import autocomplete from "@grucloud/bau-ui/autocomplete";
import avatar from "@grucloud/bau-ui/avatar";
import badge from "@grucloud/bau-ui/badge";
import breadcrumbs, {
  type BreadcrumbsProps,
} from "@grucloud/bau-ui/breadcrumbs";
import button from "@grucloud/bau-ui/button";
import buttonGroup from "@grucloud/bau-ui/buttonGroup";
import calendar from "@grucloud/bau-ui/calendar";
import checkbox from "@grucloud/bau-ui/checkbox";
import chip from "@grucloud/bau-ui/chip";
import drillDownMenu, {
  type Tree as DrilldownTree,
} from "@grucloud/bau-ui/drillDownMenu";
import fileInput from "@grucloud/bau-ui/fileInput";
import input from "@grucloud/bau-ui/input";
import modal from "@grucloud/bau-ui/modal";
import select from "@grucloud/bau-ui/select";
import slider from "@grucloud/bau-ui/slider";
import spinner from "@grucloud/bau-ui/spinner";
import createSwitch from "@grucloud/bau-ui/switch";
import tabs, { Tabs } from "@grucloud/bau-ui/tabs";
import createThemeSwitch from "@grucloud/bau-ui/themeSwitch";
import tooltip from "@grucloud/bau-ui/tooltip";
import treeView, { type Tree } from "@grucloud/bau-ui/treeView";

import classNames from "@grucloud/bau-css/classNames";

import { Context } from "@grucloud/bau-ui/context";
import componentGrid from "./componentGrid";

export default (context: Context) => {
  const { bau, css, config } = context;
  const { section, div, h1, span, p, ul, li, a, main, header, footer } =
    bau.tags;
  const { svg, use } = bau.tagsNS("http://www.w3.org/2000/svg");

  const ComponentGrid = componentGrid(context);

  const accordionDefs: Accordion[] = [
    {
      name: "Item1",
      Header: () => "Item 1",
      Content: () => div(p("Item 1 Content")),
    },
    {
      name: "Item2",
      Header: () => "Item 2",
      Content: () => div(p("Item 2 Content")),
    },
    {
      name: "Item3",
      Header: () => "Item 3",
      Content: () => div(p("Item 3 content")),
    },
  ];

  const Accordion = accordion(context, { accordionDefs });
  const Alert = alert(context);

  const Autocomplete = autocomplete(context);

  const options = [
    { code: "AD", label: "Andorra", phone: "376" },
    {
      code: "AE",
      label: "United Arab Emirates",
      phone: "971",
    },
    { code: "AF", label: "Afghanistan", phone: "93" },
  ];

  const Option = (option: any) =>
    div(
      {
        class: css`
          display: flex;
          justify-content: space-between;
          gap: 0.5rem;
        `,
      },
      span(option.label),
      span(option.code)
    );

  const Avatar = avatar(context, {
    class: css`
      > img {
        background: var(--color-gray-100);
        border-radius: 50%;
        margin: 0.3rem;
      }
    `,
  });

  const Badge = badge(context);

  const breadcrumbs1: BreadcrumbsProps = {
    items: [
      {
        href: "/",
        name: "\u2302",
      },
      { name: "Dir" },
      { href: "/dir/subdir", name: "SubDir" },
    ],
  };

  const Breadcrumbs = breadcrumbs(context);
  const Button = button(context);
  const ButtonGroup = buttonGroup(context);
  const Calendar = calendar(context);
  const Checkbox = checkbox(context);
  const Chip = chip(context);

  const tree: DrilldownTree = {
    data: { name: "Root Menu" },
    children: [
      {
        data: { name: "Menu 1", href: "#m1" },
        children: [
          {
            data: { name: "Sub Menu 1", href: "#menusub2" },
            children: [
              { data: { name: "Sub Sub Menu 1", href: "#menusubsub1" } },
            ],
          },
          { data: { name: "Sub Menu 2", href: "#menusub1" } },
        ],
      },
      {
        data: { name: "Menu 2", href: "#menu2" },
        children: [{ data: { name: "Sub Menu 21", href: "#menusub21" } }],
      },
      {
        data: { name: "Menu 3", href: "#menu2" },
      },
    ],
  };

  const DrillDownMenu = drillDownMenu(context, {
    base: config.base + "/components",
  });

  const FileInputLabel = ({ disabled }: any) =>
    div(
      {
        class: classNames(
          css`
            display: flex;
            align-items: center;
            flex-direction: column;
            stroke: var(--font-color-base);
            fill: var(--font-color-base);
            > * {
              margin: 1rem;
            }
          `,
          disabled &&
            css`
              color: var(--color-emphasis-500);
              fill: var(--font-color-disabled);
            `
        ),
      },
      svg(
        { width: 100, height: 100, fill: "currentColor" },
        use({ href: `uploadIcon.svg#Capa_1` })
      ),
      span("Choose a file to upload")
    );

  const FileInput = fileInput(context);

  const Input = input(context);

  const Modal = modal(context);

  const Content = () =>
    main(
      Array(10)
        .fill("")
        .map((_, k) => p(k + 1, ". Some text here" /*faker.lorem.paragraph()*/))
    );

  const MyModal = (props: any) => {
    const modalEl = Modal(
      { id: "my-dialog", ...props },
      header("Header"),
      Content(),
      footer(
        Button(
          {
            variant: "outline",
            onclick: () => {
              modalEl.close();
            },
          },
          "Cancel"
        ),
        Button(
          {
            variant: "solid",
            onclick: () => {
              modalEl.close();
            },
          },
          "OK"
        )
      )
    );
    return modalEl;
  };

  const Select = select(context);

  const selectOptions = [
    { code: "AD", label: "Andorra", phone: "376" },
    {
      code: "AE",
      label: "United Arab Emirates",
      phone: "971",
    },
    { code: "AF", label: "Afghanistan", phone: "93" },
  ];

  const SelectOption = (option: any) =>
    div(
      {
        class: css`
          display: flex;
          justify-content: space-between;
          gap: 0.5rem;
        `,
      },
      span(option.label),
      span(option.code)
    );

  const Slider = slider(context);
  const Spinner = spinner(context);

  const Switch = createSwitch(context);

  const tabDefs: Tabs = [
    {
      name: "Tab1",
      Header: () => div("TAB"),
      Content: () => div(p("My Tab 1 Content")),
    },
    {
      name: "Tab2",
      Header: () => div("TAB 2"),
      Content: () => div(p("My tab 2 Content")),
    },
    {
      name: "Tab Disabled",
      disabled: true,
      Header: () => div("Tab Disabled"),
      Content: () => div(p("My tab Disabled")),
    },
  ];

  const Tabs = tabs(context, { tabDefs });

  const ThemeSwitch = createThemeSwitch(context);

  const TooltipContent = () => span("My tooltip");

  const Tooltip = tooltip(context);

  const menu: Tree = {
    data: { name: "Root Menu" },
    children: [
      {
        data: { name: "Menu 1", href: "#menu" },
        expanded: true,
        children: [
          { data: { name: "Sub Menu 1", href: "#menusub2" } },
          { data: { name: "Sub Menu 2", href: "#menusub1" } },
        ],
      },
      {
        data: { name: "Menu 2", href: "#menu2" },
        children: [{ data: { name: "Sub Menu 21", href: "#menusub21" } }],
      },
    ],
  };

  const TreeView = treeView(context, {
    renderMenuItem: ({ name, href }: any) =>
      a(
        {
          href,
          onclick: (event: any) => {
            event.preventDefault();
          },
        },
        name
      ),
  });

  const components = [
    {
      name: "Accordion",
      Item: (props: any) => Accordion({ ...props }),
    },
    {
      name: "Alert",
      Item: (props: any) => Alert({ ...props }, `Alert ${props.color}`),
    },
    {
      name: "Autocomplete",
      Item: (props: any) =>
        Autocomplete({
          ...props,
          options,
          Option,
          getOptionLabel: ({ label }: any) => label,
          label: "Country",
          placeholder: "Search countries",
          id: "country",
        }),
    },
    {
      name: "Avatar",
      Item: (props: any) =>
        Avatar({
          ...props,
          src: "./grucloud.svg",
          alt: "GruCloud",
        }),
    },
    {
      name: "Badge",
      Item: (props: any, { index }: any) =>
        Badge({ ...props, content: `${index * 100}` }, "\u260F"),
    },
    {
      name: "Breadcrumbs",
      Item: (props: any) => Breadcrumbs({ ...props, ...breadcrumbs1 }),
    },
    {
      name: "Button",
      Item: (props: any) =>
        Button(
          {
            ...props,
          },
          `${props.variant} ${props.color}`
        ),
    },
    {
      name: "Button Group",
      Item: (props: any) =>
        ButtonGroup(
          { ...props },
          Button({}, "ONE"),
          Button({}, "TWO"),
          Button({}, "THREE")
        ),
    },
    {
      name: "Calendar",
      Item: (props: any) =>
        Calendar({
          ...props,
        }),
    },
    {
      name: "Checkbox",
      Item: (props: any, { index }: any) =>
        Checkbox({
          id: `myCheckbox-${index}`,
          name: `myCheckbox-${index}`,
          ...props,
        }),
    },
    {
      name: "Chip",
      Item: (props: any) =>
        Chip(
          {
            ...props,
          },
          `Chip ${props.color}`
        ),
    },
    {
      name: "DrillDown Menu",
      Item: (props: any) =>
        DrillDownMenu({
          tree,
          ...props,
        }),
    },
    {
      name: "File Input",
      Item: (props: any) => {
        return FileInput({
          Component: FileInputLabel,
          name: "file",
          accept: "text/*",
          onchange,
          ...props,
        });
      },
    },
    {
      name: "Input",
      Item: (props: any) => {
        return Input({
          name: "my-input",
          id: "my-input-with",
          placeholder: "Enter text",
          ...props,
        });
      },
    },
    {
      name: "Modal",
      Item: (props: any) => {
        const modalEl = MyModal(props);
        return div(
          Button(
            {
              ...props,
              onclick: () => {
                modalEl.showModal();
              },
            },
            "OPEN MODAL"
          ),
          modalEl
        );
      },
    },
    {
      name: "Select",
      Item: (props: any) =>
        div(
          Select({
            ...props,
            options: selectOptions,
            Option: SelectOption,
            getOptionLabel: ({ label }: any) => label,
            label: "Select a country...",
          })
        ),
    },
    {
      name: "Slider",
      Item: (props: any) => Slider(props),
    },
    {
      name: "Spinner",
      Item: (props: any) => Spinner(props),
    },
    {
      name: "Switch",
      Item: (props: any) =>
        div(
          Switch({ ...props, id: "my-switch" }),
          Switch({ ...props, id: "my-switch-checked", checked: true })
        ),
    },
    {
      name: "Tabs",
      Item: (props: any) => Tabs(props),
    },
    {
      name: "Theme Switch",
      Item: (props: any) => ThemeSwitch(props),
    },
    {
      name: "Tooltip",
      Item: (props: any) =>
        Tooltip(
          { titleEl: TooltipContent(), ...props },
          Button({}, `${props.color} ${props.variant}`)
        ),
    },
    {
      name: "Tree View",
      Item: (props: any) => TreeView({ ...props, tree: menu }),
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
          li(Chip({ color: "primary" }, a({ href: `#${name}` }, name)))
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
