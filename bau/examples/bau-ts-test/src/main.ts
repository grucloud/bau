import Bau from "../../../bau";

const bau = Bau();

const {
  div,
  section,
  button,
  ul,
  li,
  table,
  tbody,
  tr,
  td,
  span,
  input,
  form,
  h1,
  p,
} = bau.tags;

const myBoolState = bau.state(false);
myBoolState.val = true;

const myNumberState = bau.state(1);
myNumberState.val = 1;

const myArrayState = bau.state(["1"]);

myArrayState.val.push(...["2", "3"]);
myArrayState.val.push("4", "5");

const myArrayCountState = bau.derive(() => myArrayState.val.length);

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

const TestConditionalTernary = () => {
  const showState = bau.state(true);
  return section(
    h1("Conditional with &&"),
    button({ onclick: () => (showState.val = !showState.val) }, "Toogle"),
    () => (showState.val ? p("ON") : p("OFF"))
  );
};

const TestConditionalIfElse = () => {
  const showState = bau.state(true);
  return section(
    h1("Conditional with if else"),
    button({ onclick: () => (showState.val = !showState.val) }, "Toogle"),
    () => {
      if (showState.val) {
        return p("ON");
      } else {
        return p("OFF");
      }
    }
  );
};

const TestConditionalAndAnd = () => {
  const showState = bau.state(true);
  return section(
    h1("Conditional with &&"),
    button({ onclick: () => (showState.val = !showState.val) }, "Toogle"),
    p(() => showState.val && "ON")
  );
};

const UserView = () => div("User View");
const AdminView = () => div("Admin View");

const viewMap: any = {
  user: UserView,
  admin: AdminView,
};

const TestConditionalMap = () => {
  const showViewState = bau.state("user");

  return section(
    h1("Conditional with map"),
    button({ onclick: () => (showViewState.val = "admin") }, "Admin"),
    button({ onclick: () => (showViewState.val = "user") }, "User"),
    () => viewMap[showViewState.val]()
  );
};

const TestConditionalDisplayNone = () => {
  const hideState = bau.state(false);
  return section(
    h1('Conditional with style: "display: none"'),
    button({ onclick: () => (hideState.val = !hideState.val) }, "Toogle"),
    p({ style: () => hideState.val && "display:none" }, "ON")
  );
};

const TestElementObject = () =>
  section(() => JSON.stringify(myObjetState.val), "state as object: ");

const TestBindArrayUL = () =>
  section(
    bau.bind({
      deps: [myArrayState],
      render:
        ({ renderItem }) =>
        (arr) =>
          div("render Array with UL LI ", ul(arr.map(renderItem))),
      renderItem: () => (value: any) => li("renderItem li ", value),
    }),
    "TestBindArrayUL"
  );

const TestBindArrayTBODY = () =>
  section(
    bau.bind({
      deps: [myArrayState],
      render:
        ({ renderItem }) =>
        (arr) =>
          table(
            "render Array with table tbody tr and td ",
            tbody(arr.map(renderItem))
          ),
      renderItem: () => (value: any) => tr(td("renderItem tr td "), td(value)),
    }),
    div("Count ", () => myArrayCountState.val),
    "TestBindArrayTBODY"
  );

const TestDerived = () => {
  const inputState = bau.state("");
  const buttonDisabledState = bau.derive(() => {
    return inputState.val.length < 2;
  });

  return section(
    "Test Derived",
    input({
      placeholder: "Enter username",
      value: inputState,
      oninput: ({ target }: { target: HTMLInputElement }) =>
        (inputState.val = target.value),
    }),
    button(
      {
        disabled: buttonDisabledState,
        onclick: () => {
          /* do stuff*/
        },
      },
      "Login"
    )
  );
};

const TestDerivedSideEffect = () => {
  const inputState = bau.state("");
  bau.derive(() => {
    console.log("inputState: ", inputState.val);
  });

  return section(
    "Test Derived Side Effect",
    input({
      placeholder: "Enter username",
      value: inputState,
      oninput: ({ target }: { target: HTMLInputElement }) =>
        (inputState.val = target.value),
    })
  );
};
const App = ({}) => {
  return div(
    "Bau testing with Typescript",
    TestArrayLength(),
    TestArrayReadIndex(),
    TestPropsStyle(),
    TestAttributeReturnString(),
    TestAttributeReturnNull(),
    TestConditionalAndAnd(),
    TestConditionalTernary(),
    TestConditionalIfElse(),
    TestConditionalMap(),
    TestConditionalDisplayNone(),
    TestElementObject(),
    TestBindArrayUL(),
    TestBindArrayTBODY(),
    TestDerived(),
    TestDerivedSideEffect()
  );
};

const app = document.getElementById("app");
app?.replaceChildren(App({}));
