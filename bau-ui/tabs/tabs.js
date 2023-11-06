import { toPropsAndChildren } from "@grucloud/bau/bau.js";
import classNames from "@grucloud/bau-css/classNames.js";

import { Colors } from "../constants.js";

const colorsToCss = () =>
  Colors.map(
    (color) =>
      `
&.tabs.solid.${color} {
}
`
  ).join("\n");

export default function (context, options = {}) {
  const { bau, css, window } = context;
  const { tabDefs } = options;
  const { div, ul, li, a } = bau.tags;

  const className = css`
    display: flex;
    flex-direction: column;
    & > ul {
      display: flex;
      align-items: flex-end;
      justify-content: flex-start;
      align-items: flex-start;
      padding: 0;
      margin: 0;
      list-style: none;
      & li {
        & > a {
          color: inherit;
          text-decoration: none;
        }
        text-align: center;
        padding: 0.5rem 1rem 0 1rem;
        color: inherit;
        cursor: pointer;
        font-weight: var(--font-weight-semibold);
        transition: var(--transition-fast) ease-in-out;
        overflow: hidden;
        &:hover {
          color: var(--color-primary-light);
          background-color: var(--color-emphasis-200);
          &::after {
            transform: translateY(0%);
          }
        }
        &::after {
          transition: var(--transition-fast) ease-in-out;
          transform: translateY(100%);
          background: var(--color-primary-light);
          opacity: 1;
          content: "";
          margin-top: 0.3rem;
          height: 2px;
          width: 100%;
          display: block;
        }
      }
      & .active {
        font-weight: bolder;
        &::after {
          transform: translateY(0%);
        }
      }
      & .disabled {
        cursor: not-allowed;
        font-style: italic;
        pointer-events: none;
        transform: none;
        &:hover {
          border: none;
        }
      }
    }
    ${colorsToCss()}
  `;

  return function Tabs(...args) {
    let [
      {
        size = options.size ?? "md",
        variant = options.variant ?? "outline",
        color = options.color ?? "neutral",
        tabsName = "tabs",
        ...props
      },
      ...children
    ] = toPropsAndChildren(args);

    const tabsState = bau.state(tabDefs);
    const tabByName = (name) => tabsState.val.find((tab) => tab.name == name);
    const tabCurrentState = bau.state(tabDefs[0]);

    const hashchange = () => {
      //console.log("tabs hashchange");
      const search = new URLSearchParams(window.location.search);
      const tabName = search.get(tabsName) ?? tabDefs[0].name;

      const nextTab = tabByName(tabName);
      tabCurrentState.val.exit?.call();
      tabCurrentState.val = nextTab;
      nextTab.enter?.call();
    };

    hashchange();

    window.history.pushState = new Proxy(window.history.pushState, {
      apply: (target, thisArg, argArray) => {
        target.apply(thisArg, argArray);
        const url = argArray[2] ?? "";
        //console.log("tabs pushState ", url);
        if (["?", "#"].includes(url[0])) {
          hashchange();
        }
      },
    });

    const buildHref = (nextTab) => {
      const search = new URLSearchParams(window.location.search);
      search.delete(tabsName);
      search.append(tabsName, nextTab);
      return `?${search.toString()}`;
    };

    const TabHeader = (tab) => {
      const { Header, disabled, name } = tab;
      return li(
        {
          class: () =>
            classNames(
              tabCurrentState.val.name == name && "active",
              disabled && "disabled"
            ),
        },
        a({ href: buildHref(name) }, Header(tab))
      );
    };

    const rootEl = div(
      {
        class: classNames(
          "tabs",
          variant,
          size,
          color,
          className,
          options?.class,
          props.class
        ),
        bauMounted: ({ element }) => {
          window.addEventListener("popstate", hashchange);
        },
        bauUnmounted: () => {
          window.removeEventListener("popstate", hashchange);
        },
      },
      // Header
      bau.loop(tabsState, ul(), TabHeader),
      bau.bind({
        deps: [tabCurrentState],
        render:
          () =>
          ({ Content }) =>
            Content ? Content(props) : "",
      })
    );

    rootEl.addEventListener(
      "tab.add",
      (event) => {
        const { tab } = event.detail;
        tab.enter?.call();
        tabsState.val.push(tab);
      },
      false
    );
    rootEl.addEventListener(
      "tab.remove",
      (event) => {
        const index = tabsState.val.findIndex(
          (tab) => tab.name == event.detail.tabName
        );
        if (index > 0) {
          tabsState.val[index].exit?.call();
          tabsState.val.splice(index, 1);
        }
      },
      false
    );
    return rootEl;
  };
}
