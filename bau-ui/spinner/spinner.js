import { Colors } from "../constants.js";

const sizeToPixel = {
  sm: 12,
  md: 16,
  lg: 24,
};

const colorsToCss = () =>
  Colors.map(
    (color) =>
      `
&.${color} {
  background-color:transparent;
}
&.plain.${color} {
  & .path {
    stroke: var(--color-${color});
  }
}
&.outline.${color} {
  border: none;
  & .path {
    stroke: var(--color-${color});
  }
}
&.solid.${color} {
  background-color: transparent;
  & .path {
    stroke: var(--font-color-inverse);
  }
}
`
  ).join("\n");

export default function (context, options = {}) {
  const { bau, css, keyframes } = context;
  const { svg, circle } = bau.tagsNS("http://www.w3.org/2000/svg");

  const rotate = keyframes`
    100% {
      transform: rotate(360deg);
    }
  `;
  const dash = keyframes`
0% {
  stroke-dasharray: 1, 150;
  stroke-dashoffset: 0;
}
50% {
  stroke-dasharray: 90, 150;
  stroke-dashoffset: -35;
}
100% {
  stroke-dasharray: 90, 150;
  stroke-dashoffset: -124;
}
  `;

  return function Spinner({
    size = options.size ?? "md",
    color = options.color ?? "primary",
    variant = options.variant ?? "outline",
    visibility = true,
    ...otherProps
  } = {}) {
    const className = css`
      visibility: hidden;
      opacity: 0;
      transition: all var(--transition-slow) ease-in-out;
      &.visibility {
        visibility: visible;
        opacity: 1;
      }
      animation: ${rotate} 2s linear infinite;
      width: ${sizeToPixel[size]};
      height: ${sizeToPixel[size]};
      & .path {
        stroke-linecap: round;
        animation: ${dash} 1.5s ease-in-out infinite;
      }
      ${colorsToCss()}
    `;

    return svg(
      {
        class: {
          deps: [visibility],
          renderProp: () => (visibility) =>
            [
              "spinner",
              className,
              color,
              variant,
              visibility == false ? "" : "visibility",
              options?.class,
              otherProps.class,
            ],
        },
        version: "1.1",
        x: "0px",
        y: "0px",
        width: sizeToPixel[size],
        height: sizeToPixel[size],
        viewBox: `0 0 50 50`,
        enableBackground: `new 0 0 50 50`,
        ...otherProps,
      },
      circle({
        class: "path",
        cx: "25",
        cy: "25",
        r: "20",
        fill: "none",
        "stroke-width": "5",
      })
    );
  };
}
