import "./style.css";
//import Bau from "@grucloud/bau";
import Bau from "../../bau/src/bau";

const bau = Bau();
const { section, p, button, div, h1, ul, li, label, header, input } = bau.tags;

const ENTER_KEY = 13;
const ESCAPE_KEY = 27;

const Row = ({ title, completed }) => {
  const editState = bau.state(title);
  return li(
    { class: "" },
    div(
      { class: "view" },
      input({
        class: "toggle",
        type: "checkbox",
        checked: "{this.props.todo.completed}",
        onchange: "{this.props.onToggle}",
      }),
      label({ ondoubleclick: "{this.handleEdit}" }, title),
      button({ class: "destroy", onclick: "{this.props.onDestroy}" })
    ),
    input({
      ref: "editField",
      class: "edit",
      value: editState,
      onblur: "{this.handleSubmit}",
      onchange: "{this.handleChange}",
      onkeydown: "{this.handleKeyDown}",
    })
  );
};

const App = () => {
  const inputState = bau.state("");
  const todosState = bau.state([{ title: "aaa" }]);

  const handleNewTodoKeyDown = (event) => {
    if (event.keyCode !== ENTER_KEY) {
      return;
    }

    event.preventDefault();

    var title = inputState.val.trim();
    if (title) {
      todosState.val.push({ title, completed: false });
      inputState.val = "";
    }
  };

  const el = div(
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
        className: "toggle-all",
        type: "checkbox",
        onChange: "",
        checked: false,
      }),
      label({ for: "toggle-all" }),
      bau.bind({
        deps: [todosState],
        render:
          ({ renderItem }) =>
          (arr) =>
            ul({ class: "todo-list" }, arr.map(renderItem())),
        renderItem: () => Row,
      })
    )
  );
  return el;
};

const app = document.getElementsByClassName("todoapp")[0];

app.replaceChildren(App({}));
