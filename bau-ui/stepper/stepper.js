import { toPropsAndChildren } from "@grucloud/bau/bau.js";
import classNames from "@grucloud/bau-css/classNames.js";

import { Colors } from "../constants.js";

const colorsToCss = () =>
  Colors.map(
    (color) =>
      `
`
  ).join("\n");

export default function (context, options = {}) {
  const { bau, css, window } = context;
  const { div, ul, li, span, footer } = bau.tags;

  const className = css`
    display: flex;
    flex-direction: column;
    padding: 1rem;
    & > ul {
      display: flex;
      align-items: flex-end;
      justify-content: space-around;
      align-items: flex-start;
      padding: 0;
      list-style: none;
      & > li {
        display: flex;
        flex-direction: column;
        align-items: center;
        box-sizing: border-box;
        flex-grow: 1;
        padding: 0.5rem;
        padding-bottom: 0rem;
        color: inherit;
        font-weight: var(--font-weight-semibold);
        transition: all var(--transition-slow) ease-in-out;
        background-color: var(--background-color);
        overflow: hidden;
        & .step-number {
          background-color: var(--color-primary);
          color: var(--font-color-inverse);
          height: 1.5rem;
          width: 1.5rem;
          display: flex;
          justify-content: center;
          align-items: center;
          border-radius: 100%;
        }
        & .step-label {
          text-align: center;
        }
      }
      & .not-completed {
        & .step-number {
          background-color: var(--color-neutral);
        }
        & .step-label {
          color: var(--font-color-secondary);
        }
      }
      & .completed {
        & .step-number {
          background-color: var(--color-success);
        }
      }

      & .active {
        filter: brightness(var(--brightness-active));
      }
      & .disabled {
        cursor: not-allowed;
        font-style: italic;
        transform: none;
      }
    }
    ${colorsToCss()}
    &.stepper > .content {
      visibility: hidden;
      display: none;
    }

    &.stepper > .visible {
      visibility: visible;
      display: block;
    }
    &.stepper footer {
      display: flex;
      gap: 1rem;
    }
  `;

  return function Stepper(...args) {
    let [
      {
        color,
        variant = "plain",
        size,
        stepperDefs = [],
        activeStepIndex = bau.state(0),
        ...props
      },
      ...children
    ] = toPropsAndChildren(args);

    const stepperState = bau.state(
      stepperDefs.map((stepper, index) => ({ ...stepper, index }))
    );

    const hashchange = () => {
      const stepNameInitial = window.location.hash.slice(1).split("?")[0];
      console.log("hashchange", stepNameInitial);
      const initialActiveStep = stepperDefs.findIndex(
        ({ name }) => name == stepNameInitial
      );

      if (initialActiveStep >= 0) {
        activeStepIndex.val = initialActiveStep;
      } else {
        activeStepIndex.val = 0;
      }
    };

    hashchange();

    window.history.pushState = new Proxy(window.history.pushState, {
      apply: (target, thisArg, argArray) => {
        target.apply(thisArg, argArray);
        const url = argArray[2] ?? "";
        if (["?", "#"].includes(url[0])) {
          hashchange();
        }
      },
    });
    document.addEventListener("click", (event) => {
      const { target } = event;
      const href = target.getAttribute("href");
      if (target.tagName === "A" && href && ["?", "#"].includes(href[0])) {
        //console.log("a click");
        hashchange();
      }
    });
    //TODO bauMounted
    window.addEventListener("popstate", (event) => {
      //console.log("popstate");
      hashchange();
    });

    const stepperCurrentState = bau.derive(
      () => stepperState.val[activeStepIndex.val]
    );

    const StepperHeader = (stepper) => {
      const { Header, disabled, name, index } = stepper;
      return li(
        {
          class: () =>
            classNames(
              stepperCurrentState.val.name == name && "active",
              activeStepIndex.val < index && "not-completed",
              activeStepIndex.val > index && "completed",
              disabled && "disabled"
            ),
        },
        span({ class: "step-number" }, index + 1),
        span({ class: "step-label" }, () => Header(stepper))
      );
    };

    const rootEl = div(
      {
        class: classNames(
          "stepper",
          variant,
          size,
          color,
          className,
          options?.class,
          props.class
        ),
      },
      // Header
      bau.loop(stepperState, ul(), StepperHeader),
      // Content
      stepperDefs.map((stepperDef) =>
        div(
          {
            class: () =>
              classNames(
                "content",
                stepperDef.name == stepperCurrentState.val.name && "visible"
              ),
          },
          () => (stepperDef.Content ? stepperDef.Content(props) : ""),
          footer(stepperDef.Footer ? stepperDef.Footer(props) : "")
        )
      )
    );
    return rootEl;
  };
}
