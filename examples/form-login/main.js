import Bau from "@grucloud/bau";
const bau = Bau();
const { div, h1, form, label, input, button } = bau.tags;

const usernameState = bau.state("");
const passwordState = bau.state("");

const inputOnInput = (state) => (event) => (state.val = event.target.value);

const onSubmit = (event) => {
  alert(`Username: ${usernameState.val}, password ${passwordState.val}`);
  event.preventDefault();
};

const App = () =>
  form(
    { onsubmit: "return false" },
    h1("Form example"),
    div(
      label({ for: "username" }, "Username"),
      input({
        id: "username",
        value: usernameState,
        oninput: inputOnInput(usernameState),
      })
    ),
    div(
      label({ for: "password" }, "Password"),
      input({
        id: "password",
        type: "password",
        value: passwordState,
        oninput: inputOnInput(passwordState),
      })
    ),
    div(button({ type: "submit", onclick: onSubmit }, "Login"))
  );

document.getElementById("app").replaceChildren(App({}));
