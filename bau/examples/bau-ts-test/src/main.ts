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
  h3,
  p,
  article,
  label,
  select,
  option,
  nav,
  thead,
  th,
  pre,
  strong,
  small,
} = bau.tags;

const TestConditionalTernary = () => {
  const showState = bau.state(true);
  return article(
    h1("Conditional with the ternary operator"),
    button({ onclick: () => (showState.val = !showState.val) }, "Toogle"),
    () => (showState.val ? p("ON") : p("OFF"))
  );
};

const Transition = (props: any, child: any) => {
  return div(
    {
      bauChildMutated: ({ record, element }: any) => {
        [...record.removedNodes].forEach((childNode) => {
          if (childNode.getAttribute("cloned")) return;
          const nodeCloned = childNode.cloneNode(true);
          nodeCloned.style.top = 0;
          nodeCloned.style.left = 0;
          nodeCloned.style.width = childNode.getAttribute("width");
          nodeCloned.style.height = childNode.getAttribute("height");
          nodeCloned.style.position = "absolute";
          nodeCloned.style.animation = props.animationHide;

          nodeCloned.setAttribute("cloned", true);
          if (record.previousSibling) {
            record.previousSibling.after(nodeCloned);
          } else if (record.nextSibling) {
            record.nextSibling.before(nodeCloned);
          } else if (record.target) {
            record.target.appendChild(nodeCloned);
          } else {
          }

          nodeCloned.addEventListener("animationend", () =>
            nodeCloned.parentNode.removeChild(nodeCloned)
          );
        });
        [...record.addedNodes].forEach((childNode) => {
          if (childNode.getAttribute("cloned")) return;
          element.style.position = "relative";
          childNode.style.animation = props.animationShow;
          const rect = childNode.getBoundingClientRect();
          childNode.setAttribute("width", rect.width + "px");
          childNode.setAttribute("height", rect.height + "px");

          const animationEndHandler = () => {
            childNode.removeEventListener("animationend", animationEndHandler);
            childNode.style.animation = "";
          };
          childNode.addEventListener("animationend", animationEndHandler);
        });
      },
      ...props,
    },
    child
  );
};

const TestConditionalIfElse = () => {
  const showState = bau.state(true);
  return article(
    h1("Conditional with if else"),
    button({ onclick: () => (showState.val = !showState.val) }, "Toogle"),
    Transition(
      {
        style:
          "border:1px solid red;width:300px;overflow:hidden;text-align:center;",
        animationShow: "slide-in 1s",
        animationHide: "slide-out 1s",
      },
      () => {
        if (showState.val) {
          return p("ON");
        } else {
          return p("OFF");
        }
      }
    )
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

const TestArrayBufferInArray = () => {
  const arrayBufferState = bau.state<ArrayBuffer[]>([
    new ArrayBuffer(8),
    new ArrayBuffer(16),
  ]);
  return article(
    h1("Array Buffer in Array"),
    ul(arrayBufferState.val.map((v) => li(v.byteLength)))
  );
};

const TestArrayBufferInObject = () => {
  const objState = bau.state<any>({
    a: new ArrayBuffer(8),
    b: new ArrayBuffer(16),
  });
  return article(
    h1("Array Buffer in Object"),
    ul(li(objState.val.a.byteLength), li(objState.val.b.byteLength))
  );
};

const TestArrayTextDecoder = () => {
  const itemsState = bau.state<any[]>([]);

  const encoder = new TextEncoder();
  for (let i = 0; i < 4; i++) {
    itemsState.val.push({ name: `${i}`, body: encoder.encode(i.toString()) });
  }

  return article(
    h1("TextDecoder"),
    bau.loop(itemsState, ul(), (item) =>
      li(new TextDecoder().decode(item.body))
    )
  );
};

const TestElementObject = () => {
  const cardState = bau.state({ name: "Freddy", rank: 2 });
  const cardLengthState = bau.derive(
    () => JSON.stringify(cardState.val).length
  );

  const Card = ({ name, rank }: any) =>
    div(
      div(label("Name:"), " ", span(name)),
      div(label("Rank:"), " ", span(rank))
    );

  const CardLength = () => div(span("Json Length: "), cardLengthState);

  const onclick = () => {
    cardState.val.rank = 3;
    cardState.val.name = "frederic";
  };

  return article(
    h1("State object"),
    CardLength(),
    () => Card(cardState.val),
    button({ onclick }, "Update")
  );
};

const TestElementObjectNested = () => {
  const cardState = bau.state({
    name: "Freddy",
    rank: 2,
    nestedArray: ["a"],
    nestedObject: { a: 1, b: 1 },
  });

  const onclick = () => {
    ++cardState.val.rank;
    cardState.val.name = "frederic";
    cardState.val.nestedArray.push("new ");
    ++cardState.val.nestedObject.b;
  };

  return article(
    h1("state object nested"),
    pre(() => JSON.stringify(cardState.val, null, 4)),
    button({ onclick }, "Update")
  );
};

const TestBindArrayUL = () => {
  const arrayState = bau.state<string[]>([]);
  const inputEl = input({ focus: true, placeholder: "Enter text" });
  const renderItem = (value: string, index?: number) =>
    li(`${index} ${value} `);

  const onclick = () => {
    arrayState.val.push(inputEl.value);
    inputEl.value = "";
  };

  return article(
    h1("Loop Array with ul li"),
    inputEl,
    button({ onclick }, "Add"),
    bau.loop(arrayState, ul(), renderItem)
  );
};

const TestArrayUL = () => {
  const arrayState = bau.state<string[]>([]);
  const renderItem = (value: string, index: number) => li(`${index} ${value} `);
  const inputEl = input({ focus: true, placeholder: "Enter text" });
  const onclick = () => {
    arrayState.val.push(inputEl.value);
    inputEl.value = "";
    inputEl.focus();
  };

  return article(
    h1("Todos with ul li"),
    inputEl,
    button({ onclick }, "Add"),
    () => ul(arrayState.val.map(renderItem))
  );
};

const TestBindArrayTable = () => {
  const arrayState = bau.state<string[]>([]);

  const inputEl = input({ focus: true, placeholder: "Enter text" });
  const onclick = () => {
    arrayState.val.push(inputEl.value);
    inputEl.value = "";
  };

  const renderItem = (value: any, index?: number) => tr(td(index), td(value));

  return article(
    h1("Array with table, tbody, tr, and td"),
    inputEl,
    button({ onclick }, "Add"),
    table(bau.loop(arrayState, tbody(), renderItem))
  );
};

const TestArrayOperation = () => {
  const arrayState = bau.state<string[]>(["a", "b", "c", "d"]);

  const inputEl = input({ focus: true, placeholder: "Enter text" });
  const clearInput = () => {
    inputEl.value = "";
    inputEl.focus();
  };
  const push = () => {
    arrayState.val.push(inputEl.value);
    clearInput();
  };
  const push2 = () => {
    arrayState.val.push(inputEl.value, inputEl.value);
    clearInput();
  };
  const pop = () => {
    arrayState.val.pop();
    clearInput();
  };
  const unshift = () => {
    arrayState.val.unshift(inputEl.value);
    clearInput();
  };
  const unshift2 = () => {
    arrayState.val.unshift(inputEl.value, inputEl.value);
    clearInput();
  };
  const shift = () => {
    arrayState.val.shift();
    clearInput();
  };
  const setAt = () => {
    arrayState.val[1] = "foo";
    clearInput();
  };
  const splice12 = () => {
    arrayState.val.splice(1, 2);
    clearInput();
  };
  const splice_2_2 = () => {
    arrayState.val.splice(-2, 2);
    clearInput();
  };
  const splice_0_0_2 = () => {
    arrayState.val.splice(0, 0, "z");
    clearInput();
  };
  const reverse = () => {
    arrayState.val.reverse();
    clearInput();
  };

  const renderItem = (value: any, index?: number) => tr(td(index), td(value));

  return article(
    h1("Array Operation"),
    inputEl,
    button({ onclick: push }, "push one"),
    button({ onclick: push2 }, "push two"),
    button({ onclick: pop }, "pop"),
    button({ onclick: unshift }, "unshift one"),
    button({ onclick: unshift2 }, "unshift two"),
    button({ onclick: shift }, "shift"),
    button({ onclick: setAt }, "set at index 0"),
    button({ onclick: splice12 }, "splice 1 2"),
    button({ onclick: splice_2_2 }, "splice -2 2"),
    button({ onclick: splice_0_0_2 }, "splice 0 0 z"),
    button({ onclick: reverse }, "reverse"),
    table(bau.loop(arrayState, tbody(), renderItem))
  );
};

const TestArrayTable = () => {
  const arrayState = bau.state<string[]>([]);
  const renderRow = (value: string, index: number) => tr(td(index), td(value));
  const inputEl = input({ focus: true, placeholder: "Enter text" });
  const onclick = () => {
    arrayState.val.push(inputEl.value);
    inputEl.value = "";
  };

  return article(
    h1("Todos with table"),
    inputEl,
    button({ onclick }, "Add"),
    table(thead(th("Index"), th("Text")), () =>
      tbody(arrayState.val.map(renderRow))
    )
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

const TestStateOnUpdate = () => {
  const previousCounterState = bau.state(0);

  const counterState = bau.state(0, {
    onUpdate: (oldVal, _newVal) => {
      previousCounterState.val = oldVal;
    },
  });

  setTimeout(() => {
    counterState.val++;
  }, 1e3);

  return article(
    h1("Counter "),
    h3("Old Value"),
    previousCounterState,
    h3("New Value"),
    counterState
  );
};

const TestDeriveReturnArray = () => {
  const showState = bau.state(true);

  return article(
    h1("Derive returns an array of element"),
    button(
      {
        onclick: () => (showState.val = !showState.val),
      },
      "TOOGLE"
    ),
    p("First element object, second is an array"),
    div(() => (showState.val ? div("1") : [div("3"), div("4"), "Text node"])),
    p("First element is an array, second is a smaller array"),
    div(() =>
      showState.val ? [div("A"), div("B"), "Text node"] : ["Other Text node"]
    ),
    p("First element is an array, second is a object"),
    div(() =>
      showState.val ? [div("A"), div("B"), "Text node"] : "Other Text node"
    )
  );
};

const TestDeriveChain = () => {
  const a = bau.state(1, { name: "A" });
  const deriveds = new Array(1000).fill("").reduce((acc, _, i) => {
    const derived = bau.derive(
      () => {
        return (i == 0 ? a.val : acc[i - 1].val) + 1;
      },
      { name: `${i}` }
    );
    acc.push(derived);
    return acc;
  }, []);

  return article(
    h1("Derive Chain"),
    button(
      {
        onclick: (_event: Event) => {
          a.val++;
        },
      },
      "Increment"
    ),
    h3("A"),
    a,
    div(deriveds.map((d: any) => small(" ", d, ", ")))
  );
};
const TestDeriveMultiple = () => {
  const a = bau.state(1, { name: "A" });
  const b = bau.derive(
    () => {
      return a.val + 1;
    },
    { name: "B" }
  );

  const sum = bau.derive(() => {
    return a.val + b.val;
  });

  return article(
    h1("Derive Text"),
    button(
      {
        onclick: () => {
          a.val++;
        },
      },
      "increment"
    ),
    div(
      strong("A:"),
      a,
      strong(" B:"),
      b,
      // strong(" C:"),
      // c,
      // strong(" D:"),
      // d,
      strong(" SUM:"),
      sum
    )
  );
};

const TestDeriveCalledOnce = () => {
  const a = bau.state(1, { name: "A" });
  const b = bau.state(1, { name: "B" });
  const s = bau.derive(
    () => {
      return a.val + b.val;
    },
    { name: "S" }
  );

  return article(
    h1("Derive Once"),
    button(
      {
        onclick: () => {
          a.val++;
          b.val++;
        },
      },
      "s=a+b, increment a and b"
    ),
    h3("A"),
    a,
    h3("B"),
    b,
    h3("S"),
    s
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

const TestAttributeArray = () => {
  const cond = true;
  return section(
    h1("class property as array"),
    p(
      { class: ["myclass", cond && "active"] },
      "class as array to avoid using a classNames functions"
    )
  );
};

const TestAttributeReturnArray = () => {
  const cond = true;
  return section(
    h1("class property as array"),
    p(
      { class: () => ["myclass", cond && "active"] },
      "class as a function that return an array"
    )
  );
};

const App = ({}) => {
  //return TestArrayTextDecoder();

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
      TestReactiveFunction(),
      TestStateOnUpdate()
    ),
    section(
      h1("Derive"),
      TestDerived(),
      TestDerivedSideEffect(),
      TestDeriveText(),
      TestDeriveReturnArray(),
      TestDeriveMultiple(),
      TestDeriveCalledOnce(),
      TestDeriveChain()
    ),

    section(
      h1("Array"),
      TestArrayUL(),
      TestBindArrayUL(),
      TestArrayTable(),
      TestBindArrayTable(),
      TestArrayOperation(),
      TestArrayLength(),
      TestArrayReadIndex(),
      TestArrayBufferInArray(),
      TestArrayBufferInObject(),
      TestArrayTextDecoder()
    ),
    section(
      h1("Object"),
      //
      TestElementObject(),
      TestElementObjectNested()
    ),
    section(
      h1("Attributes"),
      TestAttributeReturnString(),
      TestAttributeReturnNull(),
      TestAttributeArray(),
      TestAttributeReturnArray()
    )
  );
};

input({
  type: "text",
  oninput: (event) => {
    console.log(event.data);
  },
  onchange: (event) => {
    console.log(event.target.value);
  }
});

const app = document.getElementById("app");
app?.replaceChildren(App({}));
