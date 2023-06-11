import { css } from "goober";
import { classNames } from "../../utils/classNames";

export default function (context, { tabDefs }) {
  const { theme, bau } = context;
  const { palette } = theme;
  const { div, ul, li } = bau.tags;
  const tabsState = bau.state(tabDefs);

  const tabCurrentState = bau.state(tabDefs[0]);

  const tabByName = (name) => tabsState.val.find((tab) => tab.name == name);

  const style = {
    base: css`
      display: flex;
      flex-direction: column;
      ul {
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 0rem;
        list-style: none;
      }
    `,
    li: {
      base: css`
        flex-grow: 1;
        text-align: center;
        margin: 4px;
        cursor: pointer;
        transition: 0.2s ease-in-out;
        overflow: hidden;
        &:hover {
          color: ${palette.primary.main.light};
          &::after {
            transform: translateX(0%);
          }
        }
        &::after {
          transition: 0.3s ease-in-out;
          transform: translateX(-101%);
          background-color: ${palette.primary.main};
          content: "";
          margin-top: 0.3rem;
          height: 0.4rem;
          width: 100%;
          display: block;
        }
      `,
      active: css`
        color: ${palette.primary.main};
        &::after {
          background-color: ${palette.primary.main};
          transform: translateX(0%);
        }
      `,
      disabled: css`
        cursor: not-allowed;
        font-style: italic;
        color: ${palette.text.disabled};
        background-color: white;
        &:hover {
          color: ${palette.text.disabled};
          background-color: white;
          border: none;
          &::after {
            transform: translateX(-100%);
            background-color: white;
          }
        }
      `,
    },
  };

  return function Tabs(props, ...children) {
    const TabHeader = (tab) => {
      const { Header, disabled, name } = tab;
      return li(
        {
          class: classNames(style.li.base, disabled && style.li.disabled),
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
      { class: classNames(style.base) },
      bau.bind({
        deps: [tabsState],
        render:
          ({ renderItem }) =>
          (arr) =>
            ul({ class: style.base.ul }, arr.map(renderItem())),
        renderItem: () => TabHeader,
      }),
      bau.bind({
        deps: [tabCurrentState],
        render:
          () =>
          ({ Content }) =>
            Content && Content({}),
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
