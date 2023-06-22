import animate from "@grucloud/bau-ui/animate";
import button from "@grucloud/bau-ui/button";
import { Context } from "../context";

const createStyles = ({ keyframes }: Context) => {
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

export default (context: Context) => {
  const { bau } = context;
  const { section, div, h1 } = bau.tags;
  const Animate = animate(context);
  const Button = button(context);

  const styles = createStyles(context);

  return function () {
    const showState = bau.state(true);
    const dom = section({ id: "animate" });
    dom.appendChild(
      div(
        h1("Test Animate"),
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
                ? Animate(
                    {
                      parent: dom,
                      animationHide: `${styles.hideRight} 0.5s`,
                      animationShow: `${styles.showRight} 0.5s`,
                    },
                    div("Ciao")
                  )
                : "",
          })
        )
      )
    );
    return dom;
  };
};
