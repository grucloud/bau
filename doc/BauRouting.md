# Hash based routing

This guide demonstrates a very simple router based on the **hashchange** event.

> For a sophisticated router supporting nested views and asynchrounous loading, refer to [bau-router](https://github.com/grucloud/bau/tree/main/bau-router)

First of all, an event handler is defined, it intercepts the **hashchange** event. When a user clicks on an anchor link, the handler is triggered and set the _window.location.hash_ to the _pathnameState_ state.
The correct view is then created and displayed:

```js
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
```
