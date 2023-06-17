# Bau Bind

This guide describes the bau `bind` function, which returns a DOM element thanks to the `render` function based on the state provided by the `deps` array.

Every time one of these states is mutated, the `render` function will create a new view with the updated data.

```js
const loadingState = bau.state(true);

const Loading = () =>
  bau.bind({
    deps: [loadingState],
    render: () => (loading) => {
      if (loading) {
        return "Loading...";
      } else return "";
    },
  });
```

Later on, when the loading state is changed via:

```js
loadingState.val = false;
```

The `render` function is automatically invoked to render the new view. The view reacts to the new data.
