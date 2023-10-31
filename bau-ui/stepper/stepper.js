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
  const { div, ul, li, span } = bau.tags;

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
    & .content {
      visibility: hidden;
      display: none;
    }
    & .visible {
      visibility: visible;
      display: block;
    }
  `;

  return function Stepper(...args) {
    let [
      {
        color,
        variant = "plain",
        size,
        stepperDefs = [],
        activeStepIndex,
        ...props
      },
      ...children
    ] = toPropsAndChildren(args);

    const stepperState = bau.state(
      stepperDefs.map((stepper, index) => ({ ...stepper, index }))
    );

    const hashchange = () => {
      const stepNameInitial = window.location.hash.slice(1).split("?")[0];
      // console.log("hashchange", stepNameInitial);
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

    //TODO bauMounted
    window.addEventListener("popstate", (event) => {
      console.log("popstate");
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
          stepperDef.Content({})
        )
      )
      // No automatic binding possible in this case. Content contains states that would be automatically binded.
      // bau.bind({
      //   deps: [stepperCurrentState],
      //   render: () => (stepperCurrent) =>
      //     stepperCurrent.Content ? stepperCurrent.Content({}) : "",
      // })
    );

    // rootEl.addEventListener(
    //   "stepper.select",
    //   (event) => {
    //     const { stepperName } = event.detail;
    //     const nextStepper = stepperByName(stepperName);
    //     if (!nextStepper) {
    //       return;
    //     }
    //     stepperCurrentState.val.exit?.call();
    //     stepperCurrentState.val = nextStepper;
    //     nextStepper.enter?.call();
    //   },
    //   false
    // );

    return rootEl;
  };
}
