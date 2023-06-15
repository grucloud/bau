import animate from "./animate";
import button from "../button";

export default (context) => {
  const { tr, bau } = context;
  const { section, div, h3 } = bau.tags;
  const Animate = animate(context);
  const Button = button(context);

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
                    animationHide: "hide-right 0.5s",
                    animationShow: "show-right 0.5s",
                  })
                : "",
          })
        )
      )
    );
    return dom;
  };
};
