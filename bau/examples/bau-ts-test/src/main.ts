import Bau from "../../../bau";

const bau = Bau();

const { div, ul, li, table, tbody, tr, td } = bau.tags;

const myBoolState = bau.state(false);
myBoolState.val = true;

const myNumberState = bau.state(1);
myNumberState.val = 1;

const myArrayState = bau.state(["1"]);
myArrayState.val.push(...["2", "3"]);
myArrayState.val.push("4", "5");

const myObjetState = bau.state({ name: "Freddy", rank: 2 });

myObjetState.val.name = "toto";
myObjetState.val.rank = 2;

const App = ({}) => {
  return div(
    "Bau testing with Typescript",
    div(
      {
        class: {
          deps: [myBoolState],
          renderProp: () => (myBool) => myBool ?? "active",
        },
      },
      "renderProp conditional class"
    ),
    div(
      {
        class: {
          deps: [],
          renderProp:
            ({ dom }) =>
            () => {
              if (dom) {
                // dom.style.height = dom.scrollHeight + "px";
              }

              return "";
            },
        },
      },
      "renderProp modifying the dom element"
    ),
    div(
      {
        class: {
          deps: [],
          renderProp: () => () => "",
        },
      },
      "renderProp returns a string"
    ),
    div(
      {
        class: {
          deps: [],
          renderProp: () => () => undefined,
        },
      },
      "renderProp returns undefined"
    ),
    div(
      {
        class: {
          deps: [],
          renderProp: () => () => null,
        },
      },
      "renderProp returns null"
    ),
    bau.bind({
      deps: [myBoolState, myNumberState],
      render: () => (myBool, myNumber) =>
        myBool ? div("Conditonal with ternary: cond ? a : '' ", myNumber) : "",
    }),
    bau.bind({
      deps: [myBoolState, myNumberState],
      render:
        ({ oldValues /* dom*/ }) =>
        () =>
          div("Old values ", oldValues),
    }),
    bau.bind({
      deps: [myArrayState],
      render:
        ({ renderItem }) =>
        (arr) =>
          div("render Array with UL LI ", ul(arr.map(renderItem))),
      renderItem: () => (value) => li("renderItem li ", value),
    }),
    bau.bind({
      deps: [myArrayState],
      render:
        ({ renderItem }) =>
        (arr) =>
          table(
            "render Array with table tbody tr and td ",
            tbody(arr.map(renderItem))
          ),
      renderItem: () => (value) => tr(td("renderItem tr td "), td(value)),
    }),
    bau.bind({
      deps: [myArrayState],
      render:
        ({ renderItem /* dom*/ }) =>
        (arr) =>
          ul(arr.map(renderItem)),
      renderItem:
        ({ dom /* deps*/ }) =>
        (value) => {
          if (dom) {
            //dom.style.height = dom.scrollHeight + "px";
          }
          return li("renderItem with dom modification ", value);
        },
    }),
    bau.bind({
      deps: [myBoolState, myNumberState],
      render: () => (myBool) => myBool && "Conditional with &&",
    }),
    bau.bind({
      deps: [myObjetState],
      render: () => (myObjetState) =>
        div("state as object: ", JSON.stringify(myObjetState)),
    }),
    bau.bind({
      deps: [myObjetState],
      render: () => (myObject) =>
        div("state as object: ", JSON.stringify(myObject)),
      //renderItem: () => () => li("dd"),
    })
  );
};

const app = document.getElementById("app");
app?.replaceChildren(App({}));
