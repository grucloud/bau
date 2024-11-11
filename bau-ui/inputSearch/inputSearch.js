import input from "../input/input.js";

export default function (context, options = {}) {
  const { bau, css, window } = context;

  const Input = input(context, options);

  return function InputSearch(props) {
    const {
      // Use options to set the component size,
      variant = options.variant ?? "outline",
      color = options.color ?? "neutral",
      ...otherProps
    } = props;
    const fillColor = window
      .getComputedStyle(window.document.documentElement)
      .getPropertyValue(
        variant == "solid"
          ? `--font-color-inverse-secondary`
          : `--font-color-secondary`
      );

    const svgData = `url('data:image/svg+xml,<svg fill="${fillColor}" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M416 208c0 45.9-14.9 88.3-40 122.7L502.6 457.4c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L330.7 376c-34.4 25.2-76.8 40-122.7 40C93.1 416 0 322.9 0 208S93.1 0 208 0S416 93.1 416 208zM208 352a144 144 0 1 0 0-288 144 144 0 1 0 0 288z"/></svg>')`;

    const className = css`
      &.inputSearch {
        padding-left: 1.8rem;
        background-image: ${svgData};
        background-repeat: no-repeat;
        background-size: 1rem;
        background-position: 0.3rem;
      }
    `;

    return Input({
      type: "search",
      ...otherProps,
      color,
      variant,
      class: ["inputSearch", options.class, className, otherProps.class],
    });
  };
}
