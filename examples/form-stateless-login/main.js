import Bau from "@grucloud/bau";
const bau = Bau();
const { div, h1, form, label, input, button } = bau.tags;

const onsubmit = (event) => {
  const { username, password } = event.target;
  alert(`Username: ${username.value}  password ${password.value}`);
  username.password = "";
  event.preventDefault();
};

const App = () =>
  form(
    { name: "loginform", onsubmit },
    h1("Form example"),
    div(
      label({ for: "username" }, "Username"),
      input({
        id: "username",
        name: "username",
      })
    ),
    div(
      label({ for: "password" }, "Password"),
      input({
        id: "password",
        name: "password",
        type: "password",
      })
    ),
    div(button({ type: "submit" }, "Login"))
  );

document.getElementById("app").replaceChildren(App({}));
