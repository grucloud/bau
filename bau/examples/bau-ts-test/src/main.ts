import Bau from "../../../bau";
import "./style.css";
const bau = Bau();

const {
  div,
  section,
  button,
  ul,
  li,
  a,
  table,
  tbody,
  tr,
  td,
  span,
  input,
  h1,
  p,
  article,
  label,
  select,
  option,
  nav,
} = bau.tags;

// const classNames = (...cn: string[]) =>
//   cn.filter((className) => className).join(" ");

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

const TestButtonClickInline = () => {
  return section(
    h1("Button onclick inline"),
    button(
      {
        onclick: (_event: Event) => {
          alert("Clicked");
        },
      },
      "Click me"
    )
  );
};

const TestButtonClickMethod = () => {
  const buttonOnclick = (_event: Event) => {
    alert("Clicked");
  };
  return section(
    h1("Button onclick method"),
    button(
      {
        onclick: buttonOnclick,
      },
      "Click me"
    )
  );
};

const TestButtonClickMethodCurried = () => {
  const say = (message: string) => (_event: Event) => {
    alert(`Clicked ${message}`);
  };

  return section(
    h1("Button onclick method curried"),
    button(
      {
        onclick: say("Hello"),
      },
      "Say hello"
    ),
    button(
      {
        onclick: say("Bye"),
      },
      "Say bye"
    )
  );
};

const TestInputOninput = () => {
  const inputState = bau.state("");

  return article(
    h1("Input oninput with bau.state"),
    input({
      placeholder: "Enter username",
      value: inputState,
      oninput: ({ target }: { target: HTMLInputElement }) =>
        (inputState.val = target.value),
    }),
    button(
      {
        onclick: () => {
          alert(inputState.val);
        },
      },
      "Login"
    )
  );
};

const TestInputSearch = () => {
  const inputState = bau.state("");

  return article(
    h1("Input type search"),
    input({
      type: "search",
      placeholder: "Search...",
      value: inputState,
      oninput: ({ target }: { target: HTMLInputElement }) =>
        (inputState.val = target.value),
    }),
    button(
      {
        onclick: () => {
          alert(inputState.val);
        },
      },
      "Search"
    )
  );
};

const TestInputOninputElement = () => {
  const inputEl = input({
    placeholder: "Enter username",
    onkeyup: ({ key }: { key: string }) => {
      if (key == "Enter") {
        alert(inputEl.value);
      }
    },
  });

  return article(
    h1("Input onkeyup without bau.state"),
    inputEl,
    button(
      {
        onclick: () => {
          alert(inputEl.value);
        },
      },
      "Login"
    )
  );
};

const TestEventHandlingKeyUp = () => {
  return section(
    h1("Input onkeyup"),
    input({
      type: "search",
      size: 25,
      onkeyup: ({ target, key }: { key: string; target: HTMLInputElement }) => {
        if (key == "Enter") {
          alert(target.value);
        }
      },
      placeholder: "Enter text, press Enter",
    })
  );
};

const TestInputCheckboxOninput = () => {
  const checkedState = bau.state(false);

  return article(
    h1("Input checkbox oninput"),
    input({
      type: "checkbox",
      checked: checkedState,
      oninput: ({ target }: { target: HTMLInputElement }) =>
        (checkedState.val = target.checked),
    }),
    div("Is checked: ", () => (checkedState.val ? "Checked" : "Not Checked"))
  );
};

const TestInputRadio = () => {
  const checkedState = bau.state("one");
  const oninput = ({ target }: { target: HTMLInputElement }) =>
    (checkedState.val = target.id);

  return article(
    h1("Input radio"),
    input({
      type: "radio",
      id: "one",
      name: "radio",
      checked: true,
      value: checkedState,
      oninput,
    }),
    label({ for: "one" }, "One"),
    input({
      type: "radio",
      id: "two",
      name: "radio",
      value: checkedState,
      oninput,
    }),
    label({ for: "two" }, "Two"),
    div("Choice: ", checkedState)
  );
};

const TestSelect = () => {
  const selectState = bau.state("volvo");

  const onchange = ({ target }: { target: HTMLSelectElement }) =>
    (selectState.val = target.value);

  return article(
    h1("Select"),
    label({ for: "cars" }, "Choose a car: "),
    select(
      { name: "cars", id: "cars", onchange, value: selectState },
      option({ value: "audi" }, "Audi"),
      option({ value: "volvo", selected: true }, "Volvo"),
      option({ value: "saab" }, "Saab")
    ),
    div("Selected ", selectState)
  );
};

const HomeView = () => div("Home View");
const ContectView = () => div("Contect View");
const NotFound = () => div("Not Found ", 404);

const router: any = {
  "/": HomeView,
  "/contact": ContectView,
};

const TestRouter = () => {
  const pathnameState = bau.state("/");
  window.addEventListener("hashchange", () => {
    pathnameState.val = window.location.hash.slice(1);
  });

  return article(
    h1("Router Simple with hashchange"),
    nav(
      a({ href: "#/" }, "Home"),
      " | ",
      a({ href: "#/contact" }, "Contact"),
      " | ",
      a({ href: "#/page-not-exist" }, "Other")
    ),
    () => {
      const View = router[pathnameState.val] || NotFound;
      return View();
    }
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
      section(
        h1("Router"),
        //
        TestRouter()
      ),
      h1("Event Handling"), //
      TestButtonClickInline(),
      TestButtonClickMethod(),
      TestButtonClickMethodCurried(),
      TestInputOninput(),
      TestInputOninputElement(),
      TestInputSearch(),
      TestInputCheckboxOninput(),
      TestInputRadio(),
      TestSelect(),
      TestEventHandlingKeyUp()
    ),
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
