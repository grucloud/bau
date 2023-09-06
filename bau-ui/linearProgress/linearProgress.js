import classNames from "@grucloud/bau-css/classNames.js";
import { toPropsAndChildren } from "@grucloud/bau/bau.js";
import { Colors } from "../constants.js";

export default function (context, options = {}) {
  const { bau, css, keyframes } = context;
  const { div } = bau.tags;

  const colorsToCss = () =>
    Colors.map(
      (color) =>
        `
&.${color}{
  background-color: var(--color-${color});
}
  `
    ).join("\n");

  const stripes = keyframes`
    0% {
      background-position: 0rem 0;
    }
    100% {
      background-position: 1rem 0;
    }
  `;

  const className = css`
    width: 100%;
    height: 5px;
    background-image: linear-gradient(
      45deg,
      rgba(255, 255, 255, 0.15) 25%,
      transparent 25%,
      transparent 50%,
      rgba(255, 255, 255, 0.15) 50%,
      rgba(255, 255, 255, 0.15) 75%,
      transparent 75%,
      transparent
    );
    background-size: 1rem 1rem;
    transition: all 0.3s linear;
    opacity: 0;
    &.running {
      opacity: 1;
      animation: ${stripes} 1s linear infinite;
    }
    &.sm {
      height: 0.2rem;
    }
    &.md {
      height: 0.5rem;
    }
    &.lg {
      height: 1rem;
    }

    ${colorsToCss()}
  `;

  return function LinearProgress(...args) {
    let [
      {
        size = options.size ?? "md",
        variant = options.variant ?? "plain",
        color = options.color ?? "neutral",
        running,
        ...props
      },
    ] = toPropsAndChildren(args);

    return div({
      ...props,
      role: "progressbar",
      class: {
        deps: [running],
        renderProp: () => (running) =>
          classNames(
            "linearProgress",
            size,
            color,
            className,
            running && "running",
            options?.class,
            props?.class
          ),
      },
    });
  };
}
