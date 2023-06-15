export default function (context, options = {}) {
  const { theme, bau, css } = context;

  const { svg, animate, animateTransform, rect } = bau.tagsNS(
    "http://www.w3.org/2000/svg"
  );
  return function Spinner({
    size = 36,
    color = "black",
    visibility = true,
  } = {}) {
    return svg(
      {
        class: css`
          visibility: ${visibility ? "visible" : "hidden"};
        `,
        version: "1.1",
        id: "L6",
        x: "0px",
        y: "0px",
        width: size,
        height: size,
        viewBox: `0 0 100 100`,
        enableBackground: `new 0 0 100 100`,
      },
      rect(
        {
          fill: "none",
          stroke: color,
          strokeWidth: "4",
          x: "25",
          y: "25",
          width: "50",
          height: "50",
        },
        animateTransform({
          attributeName: "transform",
          dur: "0.5s",
          from: "0 50 50",
          to: "180 50 50",
          type: "rotate",
          id: "strokeBox",
          attributeType: "XML",
          begin: "rectBox.end",
        })
      ),
      rect(
        { x: "27", y: "27", fill: color, width: "46", height: "50" },
        animate({
          attributeName: "height",
          dur: "1.3s",
          attributeType: "XML",
          from: "50",
          to: "0",
          id: "rectBox",
          fill: "freeze",
          begin: "0s;strokeBox.end",
        })
      )
    );
  };
}
