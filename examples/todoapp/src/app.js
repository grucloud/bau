import { uuid, ENTER_KEY } from "./utils";
import { todoItem } from "./todoItem";
import { footer } from "./footer";

const showTodos =
  (nowShowing) =>
  ({ completed }) => {
    switch (nowShowing) {
      case "active":
        return !completed;
      case "completed":
        return completed;
      default:
        return true;
    }
  };

export default function app({ bau }) {
  const { section, div, h1, ul, label, header, input } = bau.tags;

  const nowShowingState = bau.state("all");
  const inputState = bau.state("");
  const editingIdState = bau.state("");
  const todosState = bau.state([]);
  const todosShowingState = bau.derive(() =>
    todosState.val.filter(showTodos(nowShowingState.val))
  );

  const handleNewTodoKeyDown = (event) => {
    if (event.keyCode !== ENTER_KEY) {
      return;
    }
    event.preventDefault();
    const title = inputState.val.trim();
    if (title) {
      todosState.val.push({ id: uuid(), title, completed: false });
      inputState.val = "";
    }
  };

  const toggleAll = (event) =>
    todosState.val.map((todo) => (todo.completed = !todo.completed));

  const TodoItem = todoItem({
    bau,
    todosState,
    editingIdState,
  });

  const Footer = footer({
    bau,
    todosState,
    nowShowingState,
  });

  return function App() {
    return div(
      div(
        header(
          { class: "header" },
          h1("todos"),
          input({
            class: "new-todo",
            placeholder: "What needs to be done?",
            value: inputState,
            onkeydown: handleNewTodoKeyDown,
            oninput: (event) => (inputState.val = event.target.value),
            autofocus: true,
          })
        )
      ),
      section(
        { class: "main" },
        input({
          id: "toggle-all",
          class: "toggle-all",
          type: "checkbox",
          onchange: toggleAll,
          checked: true,
        }),
        label({ for: "toggle-all" }),
        bau.bind({
          deps: [todosShowingState],
          render:
            ({ renderItem }) =>
            (arr) =>
              ul({ class: "todo-list" }, arr.map(renderItem)),
          renderItem: () => TodoItem,
        })
      ),
      Footer({})
    );
  };
}
