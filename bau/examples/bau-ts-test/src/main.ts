import Bau from "../../../bau";
import "./style.css";
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
  h1,
  p,
  article,
} = bau.tags;

const classNames = (...cn: string[]) =>
  cn.filter((className) => className).join(" ");

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

// Conditional

const TestConditionalTernary = () => {
  const showState = bau.state(true);
  return article(
    h1("Conditional with the ternary operator"),
    button({ onclick: () => (showState.val = !showState.val) }, "Toogle"),
    () => (showState.val ? p("ON") : p("OFF"))
  );
};

const TestConditionalIfElse = () => {
  const showState = bau.state(true);
  return article(
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
  return article(
    h1("Logical &&"),
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

  return article(
    h1("Conditional with map"),
    button({ onclick: () => (showViewState.val = "admin") }, "Admin"),
    button({ onclick: () => (showViewState.val = "user") }, "User"),
    () => viewMap[showViewState.val]()
  );
};

const TestConditionalDisplayNone = () => {
  const hideState = bau.state(false);
  return article(
    h1('Conditional with style: "display: none"'),
    button({ onclick: () => (hideState.val = !hideState.val) }, "Toogle"),
    p({ style: () => hideState.val && "display:none" }, "ON")
  );
};

const TestConditionalVisitbilityHidden = () => {
  const hideState = bau.state(false);
  return article(
    h1('Conditional with style: "visibility:hidden"'),
    button({ onclick: () => (hideState.val = !hideState.val) }, "Toogle"),
    p({ style: () => hideState.val && "visibility:hidden" }, "ON")
  );
};

// Reactive
const TestReactiveStyle = () => {
  const colorState = bau.state(false);

  return article(
    h1("Reactive style"),
    div(
      {
        style: () => (colorState.val ? "color:red;" : ""),
      },
      button(
        { onclick: () => (colorState.val = !colorState.val) },
        "Click to change the style"
      ),
      p("My Text")
    )
  );
};

const TestReactiveClass = () => {
  const colorState = bau.state(false);

  return article(
    h1("Reactive class"),
    div(
      {
        class: () => (colorState.val ? "active" : ""),
      },
      button(
        { onclick: () => (colorState.val = !colorState.val) },
        "Click to change the class"
      ),
      p("My Text")
    )
  );
};

const TestReactiveStateNumber = () => {
  const counterState = bau.state(0);
  return article(
    h1("State Number"),
    button({ onclick: () => counterState.val++ }, "Increment"),
    div(counterState)
  );
};

const TestReactiveStateString = () => {
  const messageState = bau.state("Ciao");
  return article(
    h1("State String"),
    button(
      { onclick: () => (messageState.val = `${messageState.val} Bello`) },
      "Add Bello"
    ),
    span(messageState)
  );
};

const TestReactiveFunction = () => {
  const showState = bau.state(true);
  return article(
    h1("Reactive Function"),
    button(
      //
      { onclick: () => (showState.val = !showState.val) },
      () => (showState.val ? "HIDE" : "SHOW")
    ),
    () => showState.val && "stuff to show"
  );
};

// Arrays
const TestArrayLength = () => {
  const arrayState = bau.state<string[]>([]);

  return article(
    h1("Array Length"),
    span("length ", () => arrayState.val.length),
    div(
      button(
        { onclick: () => arrayState.val.push("yo") },
        "Click to push an element to an array"
      )
    )
  );
};

const TestArrayReadIndex = () => {
  const arrayState = bau.state<string[]>([]);

  return article(
    h1("Array Index"),
    span("value at index 0: ", () => arrayState.val[0]),
    div(
      button(
        {
          onclick: () => arrayState.val.unshift(String(arrayState.val.length)),
        },
        "Click to prepend an the length of the array"
      )
    )
  );
};

const TestElementObject = () =>
  article(
    h1("state object"),
    p(() => JSON.stringify(myObjetState.val))
  );

const TestBindArrayUL = () => {
  const arrayState = bau.state<string[]>([]);

  return article(
    h1("Array with ul li"),
    button(
      { onclick: () => arrayState.val.push("yo") },
      "Click to push an element to an array"
    ),
    bau.bind({
      deps: [arrayState],
      render:
        ({ renderItem }) =>
        (arr) =>
          div(ul(arr.map(renderItem))),
      renderItem: () => (value: any) => li("renderItem li ", value),
    })
  );
};

const TestBindArrayTBODY = () => {
  const arrayState = bau.state<string[]>([]);
  return article(
    h1("Array with table, tbody, tr, and td"),
    button(
      { onclick: () => arrayState.val.push("yo") },
      "Click to push an element to an array"
    ),
    div("Count ", () => arrayState.val.length),
    bau.bind({
      deps: [arrayState],
      render:
        ({ renderItem }) =>
        (arr) =>
          table(tbody(arr.map(renderItem))),
      renderItem: () => (value: any) => tr(td("renderItem tr td "), td(value)),
    })
  );
};

const TestDerived = () => {
  const inputState = bau.state("");
  const buttonDisabledState = () => {
    return inputState.val.length < 2;
  };

  return article(
    h1("Test Derived"),
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

  return article(
    h1("Side Effect"),
    input({
      placeholder: "Enter username",
      value: inputState,
      oninput: ({ target }: { target: HTMLInputElement }) =>
        (inputState.val = target.value),
    })
  );
};

const TestDeriveText = () => {
  const showState = bau.state(true);
  const buttonText = () => (showState.val ? "HIDE" : "SHOW");

  return article(
    h1("Derive Text"),
    button(
      //
      { onclick: () => (showState.val = !showState.val) },
      buttonText
    )
  );
};

const TestAttributeReturnString = () =>
  div(
    {
      class: () => "",
    }
    //"attributes returns a string"
  );

const TestAttributeReturnNull = () =>
  div(
    {
      class: () => null,
    }
    //"attributes returns null"
  );

const App = ({}) => {
  return div(
    h1("Bau testing with Typescript"),
    section(
      h1("Conditional"),
      TestConditionalAndAnd(),
      TestConditionalTernary(),
      TestConditionalIfElse(),
      TestConditionalMap(),
      TestConditionalDisplayNone(),
      TestConditionalVisitbilityHidden()
    ),
    section(
      h1("Reactive"), //
      TestReactiveStyle(),
      TestReactiveClass(),
      TestReactiveStateNumber(),
      TestReactiveStateString(),
      TestReactiveFunction()
    ),
    section(
      h1("Derive"),
      //
      TestDerived(),
      TestDerivedSideEffect(),
      TestDeriveText()
    ),
    section(
      h1("Array"),
      //
      TestBindArrayUL(),
      TestBindArrayTBODY(),
      TestArrayLength(),
      TestArrayReadIndex()
    ),
    TestElementObject(),
    TestAttributeReturnString(),
    TestAttributeReturnNull()
  );
};

const app = document.getElementById("app");
app?.replaceChildren(App({}));
