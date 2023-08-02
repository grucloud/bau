# Conditional Rendering

This guide explains how to conditionally render a component based on some condition.

## && Operator

The `&&` operator displays the right hand side component when the left condition is true, otherwise do not render anything.

```js
const TestConditionalAndAnd = () => {
  const showState = bau.state(true);
  return section(
    h1("Conditonal with &&"),
    button({ onclick: () => (showState.val = !showState.val) }, "Toogle"),
    p(() => showState.val && "ON")
  );
};
```

## Ternary operator

The ternary operator displays one component or another:

```js
const TestConditionalTernary = () => {
  const showState = bau.state(true);
  return section(
    h1("Conditonal with &&"),
    button({ onclick: () => (showState.val = !showState.val) }, "Toogle"),
    () => (showState.val ? p("ON") : p("OFF"))
  );
};
```

## if else

The _if_ and _else_ Javascript keywords can be used to conditional render components.

```js
const TestConditionalIfElse = () => {
  const showState = bau.state(true);
  return section(
    h1("Conditonal with if else"),
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
```

## Map as enum

In this conditional, we'll define an object that map a key name to a component.

```js
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
```

## style: "display: none"

This conditional hides the element by setting the CSS style property _display_ to _none_

```js
const TestConditionalDisplayNone = () => {
  const hideState = bau.state(false);
  return section(
    h1('Conditional with style: "display: none"'),
    button({ onclick: () => (hideState.val = !hideState.val) }, "Toogle"),
    p({ style: () => hideState.val && "display:none" }, "ON")
  );
};
```
