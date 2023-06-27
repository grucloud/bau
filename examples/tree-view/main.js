import Bau from "@grucloud/bau";

const bau = Bau();
const { div, h1, b, a, span } = bau.tags;

const isObject = (value) => typeof value == "object";

const myData = {
  name: "John Doe",
  age: 30,
  email: "johndoe@example.com",
  address: {
    street: "123 Main St",
    city: "Anytown",
    state: "CA",
    zip: "12345",
  },
  phone_numbers: [
    { type: "home", number: "555-1234" },
    { type: "work", number: "555-5678" },
  ],
};

const Tree = ({ depth = 0 }) => {
  const Key = ({ key, value, hideState }) => {
    const keyEl = key !== "" ? `${key}: ` : "";
    const prefixIcon = () => (hideState.val ? "➕ " : "➖ ");
    const postIcon = () => (hideState.val ? "…" : "");

    return Array.isArray(value)
      ? a(
          {
            style: "cursor: pointer",
            onclick: () => (hideState.val = !hideState.val),
          },
          b(prefixIcon, keyEl, postIcon)
        )
      : b("🟰 ", keyEl);
  };

  const Value = ({ value, hideState }) =>
    isObject(value)
      ? div(
          {
            style: () => (hideState.val ? "display: none" : ""),
          },
          value
        )
      : value;

  const TreeItem = ({ key = "", value, depth = 0 }) => {
    const style = `padding-left: ${depth > 0 ? 1 : 0}rem;`;
    const hideState = bau.state(depth > 0);
    return div(
      { style },
      Key({
        key,
        value,
        hideState,
      }),
      Value({ value, hideState })
    );
  };

  return ([key, value]) =>
    TreeItem({
      key,
      value: isObject(value)
        ? Object.entries(value).map(Tree({ depth: depth + 1 }))
        : value,
      depth,
    });
};
const App = () => div(h1("Tree View example"), Tree({})(["", myData]));

document.getElementById("app").replaceChildren(App({}));
