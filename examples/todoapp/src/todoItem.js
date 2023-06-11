import { classNames } from "./utils";
import { ESCAPE_KEY, ENTER_KEY } from "./utils";

export function todoItem({ bau, todosState, editingIdState, onSave }) {
  const { button, div, li, label, input } = bau.tags;

  const inputState = bau.state("");

  const findIndexById = (id) =>
    todosState.val.findIndex((todo) => todo.id == id);

  const handleKeyDown =
    ({ title }) =>
    (event) => {
      if (event.which === ESCAPE_KEY) {
        editingIdState.val = "";
        inputState.val = title;
      } else if (event.which === ENTER_KEY) {
        handleSubmit()(event);
      }
    };

  const handleChange = () => (event) => {
    inputState.val = event.target.value;
  };

  const handleEdit =
    ({ props: { title, id }, inputDom }) =>
    (event) => {
      editingIdState.val = id;
      inputState.val = title;
      inputDom.focus();
      const length = inputDom.value.length;
      inputDom.setSelectionRange(length, length);
    };

  const destroy =
    ({ id }) =>
    (event) => {
      const todoIndex = findIndexById(id);
      todosState.val.splice(todoIndex, 1);
    };

  const handleSubmit = (props) => (event) => {
    const val = inputState.val.trim();
    const id = editingIdState.val;
    if (val) {
      const todoIndex = findIndexById(id);
      todosState.val[todoIndex].title = val;
      editingIdState.val = undefined;
    } else {
      destroy({ id });
    }
  };

  const toogle =
    ({ completed, id }) =>
    (event) => {
      const todoIndex = findIndexById(id);
      todosState.val[todoIndex].completed = !completed;
    };

  return function TodoItem(props) {
    const { id, title, completed } = props;

    const inputDom = input({
      class: "edit",
      value: inputState,
      oninput: handleChange(),
      onkeydown: handleKeyDown({ title }),
    });

    return li(
      {
        class: {
          deps: [editingIdState],
          f: (editingId) =>
            classNames(completed && "completed", id == editingId && "editing"),
        },
      },
      div(
        { class: "view" },
        input({
          class: "toggle",
          type: "checkbox",
          checked: completed,
          onchange: toogle({ id, completed }),
        }),
        label({ ondblclick: handleEdit({ props, inputDom }) }, title),
        button({ class: "destroy", onclick: destroy({ id }) })
      ),
      inputDom
    );
  };
}
