import animate from "@grucloud/bau-ui/animate";
import button from "@grucloud/bau-ui/button";

const createStyles = ({ keyframes }) => {
  return {
    hideRight: keyframes`
   from {
    transform: translateX(0%);
    opacity: 1;
  }
  to {
    transform: translateX(100%);
    opacity: 0;
  }
  `,
    showRight: keyframes`
  from {
    transform: translateX(100%);
    opacity: 0;
  }
  to {
    transform: translateX(0%);
    opacity: 1;
  }
 `,
  };
};

export default (context) => {
  const { tr, bau, keyframes } = context;
  const { section, div, h3 } = bau.tags;
  const Animate = animate(context);
  const Button = button(context);

  const styles = createStyles({ keyframes });

  return function () {
    const showState = bau.state(true);
    const dom = section({ id: "animate" });
    dom.appendChild(
      div(
        h3("Test Animate"),
        div(
          Button(
            {
              onclick: () => {
                showState.val = !showState.val;
              },
            },
            bau.bind({
              deps: [showState],
              render: () => (show) => show ? "Hide" : "Show",
            })
          )
        ),
        div(
          bau.bind({
            deps: [showState],
            render: () => (show) =>
              show
                ? Animate({
                    parent: dom,
                    Component: () => div("Ciao"),
                    animationHide: `${styles.hideRight} 0.5s`,
                    animationShow: `${styles.showRight} 0.5s`,
                  })
                : "",
          })
        )
      )
    );
    return dom;
  };
};
