import { pluralize } from "./utils";
import { classNames } from "./utils";

export function footer({ bau, todosState, nowShowingState }) {
  const { a, footer, li, span, strong, ul, button } = bau.tags;

  const completedCountState = bau.derive(
    () => todosState.val.filter(({ completed }) => completed).length
  );
  const ClearButton = ({ onClearCompleted }) =>
    button(
      { class: "clear-completed", onclick: onClearCompleted },
      "Clear completed"
    );

  const onClearCompleted = () => {
    todosState.val = todosState.val.filter(({ completed }) => !completed);
  };

  const linkClass = (showType) => () =>
    classNames(nowShowingState.val == showType && "selected");

  const onclick = (showType) => (event) => {
    nowShowingState.val = showType;
    event.preventDefault();
  };

  const linkProp = (showType) => ({
    href: `#/${showType}`,
    onclick: onclick(showType),
    class: linkClass(showType),
  });

  return function Footer({}) {
    return footer(
      { class: "footer" },
      () =>
        span(
          { class: "todo-count" },
          strong(String(todosState.val.length)),
          ` ${pluralize(todosState.val.length, "item")} left`
        ),
      ul(
        { class: "filters" },
        li(a(linkProp("app"), "All")),
        li(a(linkProp("active"), "Active")),
        li(a(linkProp("completed"), "Completed"))
      ),
      () =>
        completedCountState.val > 0 ? ClearButton({ onClearCompleted }) : ""
    );
  };
}
