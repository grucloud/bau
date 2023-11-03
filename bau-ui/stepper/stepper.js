import { toPropsAndChildren } from "@grucloud/bau/bau.js";
import classNames from "@grucloud/bau-css/classNames.js";

import { Colors } from "../constants.js";

const colorsToCss = () => Colors.map((color) => ``).join("\n");

export const NextUrl = (context, stepperName) => (nextStep, state) => {
  const search = new URLSearchParams(context.window.location.search);
  search.delete(stepperName);
  search.append(stepperName, nextStep);
  state &&
    Object.entries(state).map(
      ([k, v]) => (search.delete(k), search.append(k, v))
    );
  return `?${search.toString()}`;
};

export default function (context, options = {}) {
  const { bau, css, window } = context;
  const { div, ul, li, span, section } = bau.tags;

  const className = css`
    display: flex;
    flex-direction: column;
    & > ul {
      display: flex;
      align-items: flex-end;
      justify-content: flex-start;
      align-items: flex-start;
      padding: 0;
      gap: 1rem;
      list-style: none;
      & > li {
        display: flex;
        flex-direction: column;
        align-items: center;
        box-sizing: border-box;
        flex-grow: 0;
        padding: 0.5rem;
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
    &.stepper > section > .content {
      visibility: hidden;
      display: none;
    }

    &.stepper > section > .visible {
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
        stepperName,
        activeStepIndex = bau.state(0),
        ...props
      },
      ...children
    ] = toPropsAndChildren(args);
    const stepperState = bau.state(
      stepperDefs.map((stepper, index) => ({ ...stepper, index }))
    );

    const stepsCreatedState = bau.state([]);

    const hashchange = () => {
      const search = new URLSearchParams(window.location.search);
      const stepNameInitial = search.get(stepperName) ?? stepperDefs[0].name;
      const nextActiveStep = Math.max(
        stepperDefs.findIndex(({ name }) => name == stepNameInitial),
        0
      );
      // console.log(
      //   "hashchange",
      //   stepNameInitial,
      //   " stepsCreatedState.val",
      //   stepsCreatedState.val,
      //   "nextActiveStep",
      //   nextActiveStep
      // );

      if (nextActiveStep < activeStepIndex.val) {
        console.log("remove last step");
        stepsCreatedState.val.pop();
      }

      if (!stepsCreatedState.val.some(({ name }) => stepNameInitial == name)) {
        console.log("add new step");
        stepsCreatedState.val.push(stepperDefs[nextActiveStep]);
      }
      activeStepIndex.val = nextActiveStep;
    };

    hashchange();

    window.history.pushState = new Proxy(window.history.pushState, {
      apply: (target, thisArg, argArray) => {
        target.apply(thisArg, argArray);
        console.log("stepper pushState");

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
        console.log("stepper click");
        //hashchange();
        event.preventDefault();
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
    const getIndex = (step) =>
      stepperDefs.findIndex(({ name }) => name == step.name);

    return div(
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
      bau.loop(stepsCreatedState, section(), (stepperDef) =>
        div(
          {
            class: () =>
              classNames(
                "content",
                stepperDef.name == stepperCurrentState.val.name && "visible"
              ),
          },
          stepperDef.Content({
            nextStep: stepperDefs[getIndex(stepperDef) + 1],
            previousStep: stepperDefs[getIndex(stepperDef) - 1],
          })
        )
      )
    );
  };
}
