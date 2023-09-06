import classNames from "@grucloud/bau-css/classNames.js";
import { toPropsAndChildren } from "@grucloud/bau/bau.js";

export default function (context, options = {}) {
  const { bau, css } = context;
  const { div } = bau.tags;
  const className = css`
    display: inline-block;
    position: relative;
    overflow: hidden;
    & img {
      object-fit: contain;
    }
    & .control {
      z-index: 1;
      position: absolute;
      padding: 0.5rem;
      cursor: pointer;
    }
    & .control-previous {
      top: 50%;
      transform: translateY(-50%);
    }
    & .control-next {
      top: 50%;
      transform: translateY(-50%);
      right: 0;
    }
    & .track {
      display: flex;
      flex-direction: row;
      transition: all var(--transition-slow);
    }
  `;

  const slideIndex = bau.state(0);

  return function Carousel(...args) {
    let [
      {
        size = options.size ?? "md",
        variant = options.variant ?? "plain",
        color = options.color ?? "neutral",
        slides,
        Slide,
        Previous,
        Next,
        ...props
      },
    ] = toPropsAndChildren(args);

    const onclickPrevious = () => {
      if (slideIndex.val <= 0) {
        slideIndex.val = slides.length - 1;
      } else {
        slideIndex.val--;
      }
    };

    const onclickNext = () => {
      if (slideIndex.val >= slides.length - 1) {
        slideIndex.val = 0;
      } else {
        slideIndex.val++;
      }
    };

    const trackEl = div(
      {
        class: "track",
        style: () => `transform: translateX(${-100 * slideIndex.val}%);`,
      },
      slides.map(Slide)
    );

    return div(
      {
        ...props,
        class: classNames(
          "carousel",
          size,
          className,
          options?.class,
          props?.class
        ),
      },

      div(
        {
          class: classNames("control", "control-previous"),
          onclick: onclickPrevious,
        },
        Previous()
      ),
      div(
        {
          class: classNames("control", "control-next"),
          onclick: onclickNext,
        },
        Next()
      ),
      trackEl
    );
  };
}
