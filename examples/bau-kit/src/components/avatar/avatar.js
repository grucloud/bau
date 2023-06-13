import { css } from "goober";
import { classNames } from "../../utils/classNames";

export default function (context, options = {}) {
  const { theme, bau, tr } = context;
  const { cssOverride } = options;
  const { palette, shape, shadows } = theme;
  const { span, img } = bau.tags;

  const loadingState = bau.state(true);
  const errorState = bau.state(false);

  const onload = () => (loadingState.val = false);

  const onerror = (event) => {
    loadingState.val = false;
    errorState.val = true;
  };

  return function Avatar({ width = 60, height = 60, ...props }, ...children) {
    return span(
      { class: classNames(cssOverride) },
      bau.bind({
        deps: [loadingState],
        render: () => (loading) => {
          if (loading) {
            return "Loading...";
          } else return "";
        },
      }),
      bau.bind({
        deps: [errorState],
        render: () => (error) => error ? "Error" : "",
      }),
      img({ width, height, onload, onerror, ...props })
    );
  };
}
