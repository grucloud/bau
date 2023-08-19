import animate from "@grucloud/bau-ui/animate";
import button from "@grucloud/bau-ui/button";
import { Context } from "@grucloud/bau-ui/context";

export default (context: Context) => {
  const { bau, keyframes } = context;
  const { section, div } = bau.tags;
  const Animate = animate(context);
  const Button = button(context);

  const hideRight = keyframes`
    to {
      transform: translateX(100%);
      opacity: 0;
    }
  `;

  const showState = bau.state(true);

  return () =>
    section(
      Button(
        {
          onclick: () => {
            showState.val = !showState.val;
          },
        },
        () => (showState.val ? "Hide" : "Show")
      ),
      Animate(
        {
          animationHide: () => `${hideRight} 0.5s`,
          animationShow: () => `${hideRight} 0.5s reverse`,
        },
        () => div(showState.val ? "Ciao" : "Mondo")
      )
    );
};
