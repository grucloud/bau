import classNames from "@grucloud/bau-css/classNames";
import button from "@grucloud/bau-ui/button";
import { Context } from "@grucloud/bau-ui/context";

export default (context: Context) => {
  const { bau, css } = context;
  const { section, p } = bau.tags;
  const Button = button(context);

  const hideState = bau.state(false);

  const classNameTransition = css`
    transition: all 0.3s;
    &.hide {
      visibility: hidden;
      transform: translateX(3rem);
      opacity: 0;
    }
  `;

  return () => {
    return section(
      Button(
        {
          onclick: () => (hideState.val = !hideState.val),
        },
        () => (hideState.val ? "Hide" : "Show")
      ),
      p(
        {
          class: () =>
            classNames(hideState.val ? "hide" : "", classNameTransition),
        },
        "ON"
      )
    );
  };
};
