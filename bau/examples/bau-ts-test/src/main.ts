import Bau from "../../../bau";

const bau = Bau();

const { div, section, button, ul, li, table, tbody, tr, td, span } = bau.tags;

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

const TestArrayLength = () =>
  section(
    "testArrayLength",
    span("length ", () => myArrayState.val.length),
    div(
      button(
        { onclick: () => myArrayState.val.push("yo") },
        "Click to push an element to an array"
      )
    )
  );

const TestArrayReadIndex = () =>
  section(
    "testArrayLength",
    span("value at index 0:", () => myArrayState.val[0]),
    div(
      button(
        {
          onclick: () =>
            myArrayState.val.unshift(String(myArrayState.val.length)),
        },
        "Click to prepend an element to an array"
      )
    )
  );

const TestPropsStyle = () =>
  section(
    {
      style: () => (myBoolState.val ? "color:red;" : ""),
    },
    "renderProp conditional class",
    div(
      button(
        { onclick: () => (myBoolState.val = !myBoolState.val) },
        "Click to change the style"
      )
    )
  );

const TestAttributeReturnString = () =>
  section(
    {
      class: () => "",
    },
    "attributes returns a string"
  );

const TestAttributeReturnNull = () =>
  section(
    {
      class: () => null,
    },
    "attributes returns null"
  );

const TestElementTernary = () =>
  section(
    () => (myBoolState.val ? "result" : ""),
    "Conditonal with ternary: cond ? a : '' "
  );

const TestElementAnd = () =>
  section(() =>
    myBoolState.val ? "Conditonal with ternary: cond ? a : '' " : ""
  );

const TestElementObject = () =>
  section(() => JSON.stringify(myObjetState.val), "state as object: ");

const TestBindArrayUL = () =>
  section(
    bau.bind({
      render: ({ renderItem }) =>
        div("render Array with UL LI ", ul(myArrayState.val.map(renderItem))),
      renderItem: (value: any) => li("renderItem li ", value),
    }),
    "TestBindArrayUL"
  );

const TestBindArrayTBODY = () =>
  section(
    bau.bind({
      render: ({ renderItem }) =>
        table(
          "render Array with table tbody tr and td ",
          tbody(myArrayState.val.map(renderItem))
        ),
      renderItem: (value: any) => tr(td("renderItem tr td "), td(value)),
    }),
    "TestBindArrayTBODY"
  );

const App = ({}) => {
  return div(
    "Bau testing with Typescript",
    TestArrayLength(),
    TestArrayReadIndex(),
    TestPropsStyle(),
    TestAttributeReturnString(),
    TestAttributeReturnNull(),
    TestElementTernary(),
    TestElementAnd(),
    TestElementObject(),
    TestBindArrayUL(),
    TestBindArrayTBODY()
  );
};

const app = document.getElementById("app");
app?.replaceChildren(App({}));
