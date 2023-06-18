import { pluralize } from "./utils";
import { classNames } from "./utils";

export function footer({ bau, todosState, nowShowingState }) {
  const { a, footer, li, span, strong, ul, button } = bau.tags;

  const ClearButton = ({ onClearCompleted }) =>
    button(
      { class: "clear-completed", onclick: onClearCompleted },
      "Clear completed"
    );

  const onClearCompleted = () => {
    todosState.val = todosState.val.filter(({ completed }) => !completed);
  };

  const linkClass = (showType) => ({
    deps: [nowShowingState],
    renderProp: () => (nowShowing) =>
      classNames(nowShowing == showType && "selected"),
  });

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
      bau.bind({
        deps: [todosState],
        render: () => (todos) =>
          span(
            { class: "todo-count" },
            strong(todos.length),
            ` ${pluralize(todos.length, "item")} left`
          ),
      }),
      ul(
        { class: "filters" },
        li(a(linkProp("app"), "All")),
        li(a(linkProp("active"), "Active")),
        li(a(linkProp("completed"), "Completed"))
      ),
      bau.bind({
        name: "clear completed",
        deps: [todosState],
        render: () => (todos) => {
          const completedCount = todos.filter(
            ({ completed }) => completed
          ).length;
          return completedCount > 0 ? ClearButton({ onClearCompleted }) : "";
        },
      })
    );
  };
}
