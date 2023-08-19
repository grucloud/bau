import animate from "@grucloud/bau-ui/animate";
import button from "@grucloud/bau-ui/button";
import { Context } from "@grucloud/bau-ui/context";

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
  const { section, div } = bau.tags;
  const Animate = animate(context);
  const Button = button(context);

  const styles = createStyles(context);
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
          animationHide: () => `${styles.hideRight} 0.5s`,
          animationShow: () => `${styles.showRight} 0.5s`,
        },
        () => div(showState.val ? "Ciao" : "Mondo")
      )
    );
};
