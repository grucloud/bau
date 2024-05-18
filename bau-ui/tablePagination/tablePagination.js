import { toPropsAndChildren } from "@grucloud/bau/bau.js";
import button from "../button/button.js";
import buttonGroup from "../buttonGroup/buttonGroup.js";

import spinner from "../spinner/spinner.js";

export default function (context, options = {}) {
  const { bau, css } = context;
  const { div } = bau.tags;
  const ButtonGroup = buttonGroup(context);
  const Button = button(context);
  const Spinner = spinner(context);

  const className = css`
    display: flex;
    align-items: center;
    justify-content: flex-end;
    border-top: var(--table-border-width) solid var(--table-border-color);
    gap: 0.5rem;
    padding: 0.4rem 0.2rem;
    & .pages-numbers {
      font-size: smaller;
    }
    &.disabled {
      pointer-events: none;
    }
  `;

  const ActionButton = ({ label, icon, ...props }) =>
    Button({ "aria-label": label, title: label, ...props }, icon);

  const PagesNumbers = ({ count, totalCount, page, rowsPerPage }) =>
    div(
      { class: "pages-numbers" },
      Number(page - 1) * Number(rowsPerPage) + (count > 0 ? 1 : 0),
      "-",
      Math.min(page * rowsPerPage, totalCount),
      " of ",
      totalCount
    );

  const PagesNumbersNoTotal = ({ count, page, rowsPerPage }) =>
    div(
      { class: "pages-numbers" },
      (page - 1) * rowsPerPage + (count > 0 ? 1 : 0),
      "-",
      page * rowsPerPage
    );

  const isFirstPage = (page) => page <= 1;
  const isLastPage = (page, count, rowsPerPage) =>
    page >= Math.ceil(count / rowsPerPage);

  return function TablePagination(...args) {
    let [
      {
        size = options.size ?? "md",
        variant = options.variant ?? "outline",
        color = options.color ?? "neutral",
        count = 0,
        totalCount = 0,
        page = 1,
        rowsPerPage = 50,
        onPageChange,
        isLoading = false,
        disableFirst = () => isFirstPage(page),
        disablePrevious = () => isFirstPage(page),
        disableNext = () => isLastPage(page, totalCount, rowsPerPage),
        disableLast = () => isLastPage(page, totalCount, rowsPerPage),
        ...props
      },
      ...children
    ] = toPropsAndChildren(args);
    const maxPages = Math.max(0, Math.ceil(totalCount / rowsPerPage));

    const onclickFirst = onPageChange({ page: 1 });
    const onclickPrevious = onPageChange({ page: page - 1 });
    const onclickNext = onPageChange({ page: page + 1 });
    const onclickLast = onPageChange({
      page: maxPages,
    });
    const actions = [
      {
        label: "First",
        icon: "\u27EA",
        onclick: onclickFirst,
        disabled: disableFirst(),
      },
      {
        label: "Previous",
        icon: "\u27E8",
        onclick: onclickPrevious,
        disabled: disablePrevious(),
      },
      {
        label: "Next",
        icon: "\u27E9",
        onclick: onclickNext,
        disabled: disableNext(),
      },
      {
        label: "Last",
        icon: "\u27EB",
        onclick: onclickLast,
        disabled: disableLast(),
      },
    ];

    return div(
      {
        ...props,
        class: [
          "table-pagination",
          className,
          isLoading && "disabled",
          options?.class,
          props?.class,
        ],
      },
      Spinner({ class: "spinner", visibility: isLoading, size: "md" }),
      totalCount > 0
        ? PagesNumbers({ count, totalCount, page, maxPages, rowsPerPage })
        : PagesNumbersNoTotal({ count, page, maxPages, rowsPerPage }),

      ButtonGroup(
        { variant, color },
        actions.map((action) => ActionButton({ ...action, variant, color }))
      )
    );
  };
}
