import { classNames } from "../utils/classNames";

export default function (context, { tabDefs }) {
  const { bau, css } = context;
  const { div, ul, li } = bau.tags;
  const tabsState = bau.state(tabDefs);

  const tabCurrentState = bau.state(tabDefs[0]);

  const tabByName = (name) => tabsState.val.find((tab) => tab.name == name);

  const style = {
    base: css`
      display: flex;
      flex-direction: column;
      & ul {
        display: flex;
        align-items: flex-end;
        justify-content: flex-start;
        padding: 0;
        list-style: none;
        border-bottom: 2px solid var(--color-emphasis-100);
        & li {
          text-align: center;
          padding: 0.5rem;
          padding-bottom: 0rem;
          cursor: pointer;
          font-weight: var(--font-weight-semibold);
          transition: var(--transition-fast) ease-in-out;
          overflow: hidden;

          &:hover {
            color: var(--color-primary-light);
            background-color: var(--color-emphasis-100);
            &::after {
              transform: translateY(0%);
            }
          }
          &::after {
            transition: var(--transition-fast) ease-in-out;
            transform: translateY(400%);
            background-color: var(--color-primary);
            opacity: 1;
            content: "";
            margin-top: 0.3rem;
            height: 2px;
            width: 100%;
            display: block;
          }
        }
        & .active {
          color: var(--color-primary);
          font-weight: bolder;
          &::after {
            background-color: var(--color-primary);
            transform: translateY(0%);
          }
        }
        & .disabled {
          cursor: not-allowed;
          font-style: italic;
          color: var(--font-color-disabled);
          background-color: white;
          transform: none;
          &:hover {
            color: var(--font-color-disabled);
            border: none;
            &::after {
              transform: none;
            }
          }
        }
      }
    `,
  };

  return function Tabs(props, ...children) {
    const TabHeader = (tab) => {
      const { Header, disabled, name } = tab;
      return li(
        {
          class: {
            deps: [tabCurrentState],
            renderProp: () => (tabCurrent) => {
              return classNames(
                tabCurrent.name == name && "active",
                disabled && "disabled"
              );
            },
          },
          onclick: (event) =>
            event.srcElement.dispatchEvent(
              new CustomEvent("tab.select", {
                detail: { tabName: name },
                bubbles: true,
              })
            ),
        },
        Header(tab)
      );
    };

    const rootEl = div(
      { class: classNames(style.base, props.class) },
      // Header
      bau.bind({
        deps: [tabsState],
        render:
          ({ renderItem }) =>
          (arr) =>
            ul(arr.map(renderItem())),
        renderItem: () => TabHeader,
      }),
      // Content
      bau.bind({
        deps: [tabCurrentState],
        render:
          () =>
          ({ Content }) =>
            Content ? Content({}) : "",
      })
    );

    rootEl.addEventListener(
      "tab.select",
      (event) => {
        const { tabName } = event.detail;
        const nextTab = tabByName(tabName);
        if (!nextTab) {
          return;
        }
        tabCurrentState.val.exit?.call();
        tabCurrentState.val = nextTab;
        nextTab.enter?.call();
      },
      false
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
