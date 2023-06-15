export default (context, { limit = 10, deleteAfterDuration = 5e3 } = {}) => {
  const { theme, bau, css, keyframes } = context;
  const { palette, shape, shadows } = theme;
  const { div } = bau.tags;
  const messagesState = bau.state([]);

  const animation = {
    inserting: keyframes`
    0% { transform: scale(0.5); opacity: 0 }
    100% { transform: scale(1); opacity: 1 }
  `,
    removing: keyframes`
    0% { transform: scale(1); opacity: 1 }
    100% { transform: scale(0); opacity: 0 }
  `,
  };
  const styles = {
    stack: css`
      min-width: 300px;
      max-width: 600px;
      position: fixed;
      right: 1rem;
      top: 1rem;
      z-index: 10;
    `,
    item: css`
      margin: 0.2rem;
      padding: 0.2rem;
      display: flex;
      justify-content: flex-start;
      align-items: center;
      cursor: pointer;
      animation: ${animation.inserting} 0.2s ease-out;
    `,
    // itemIn: css`
    //   animation: ${animation.inserting} 0.2s ease-out;
    // `,
    itemOut: css`
      animation: ${animation.removing} 0.2s ease-out;
    `,
  };

  const AlertItem = (message) =>
    div(
      {
        class: styles.item,
        onclick: () => AlertStack.remove(message),
      },
      message.component()
    );

  const domRoot = div(
    {
      class: styles.stack,
    },
    bau.bind({
      deps: [messagesState],
      render:
        ({ renderItem }) =>
        (arr) =>
          div(arr.map(renderItem())),
      renderItem: () => AlertItem,
    })
  );

  const AlertStack = (props, ...children) =>
    div(
      {
        class: styles.stack,
      },
      bau.bind({
        deps: [messagesState],
        render:
          ({ renderItem }) =>
          (arr) =>
            div(arr.map(renderItem())),
        renderItem: () => AlertItem,
      })
    );

  AlertStack.add = ({ component }) => {
    const message = {
      id: Math.random().toString(10).split(".")[1],
      component,
      status: "inserting",
    };

    if (messagesState.val.length >= limit) {
      AlertStack.remove({ id: messagesState.val[0].id });
    }

    messagesState.val.push(message);

    setTimeout(() => AlertStack.remove(message), deleteAfterDuration);
  };

  const setStatus = ({ id, status }) => {
    const idx = messagesState.val.findIndex((message) => message.id === id);
    if (idx != -1) {
      messagesState.val[idx].status = status;
    }
  };

  AlertStack.remove = ({ id }) => {
    setStatus({ id, status: "removing" });
    const idx = messagesState.val.findIndex((message) => message.id === id);
    if (idx != -1) {
      messagesState.val.splice(idx, 1);
    } else {
      // console.log("remove: no id", id);
    }
  };

  return AlertStack;
};
