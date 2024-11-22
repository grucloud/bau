import { type Context } from "@grucloud/bau-ui/context";
import stepYourInfo from "./stepYourInfo";
import stepSelectPlan from "./stepSelectPlan";
import stepAddOns from "./stepAddOns";
import stepSummary from "./stepSummary";

import ADDONS from "./data/addons.json";
import PLANS from "./data/plans.json";

export default function (context: Context) {
  const { bau, css } = context;
  const { article, div, header, ul, li } = bau.tags;

  const currentStepState = bau.state(1);

  const plan = bau.state<Plan>(PLANS[0]);
  const isPerYear = bau.state(false);
  const addons = bau.state<Addon[]>([]);

  const StepYourInfo = stepYourInfo(context);
  const StepSelectPlan = stepSelectPlan(context);
  const StepAddOns = stepAddOns(context);
  const StepSummary = stepSummary(context, { plan, isPerYear, addons });

  const className = css`
    max-width: 1000px;
    min-height: 500px;
    background-color: var(--background-color);
    display: flex;
    margin: 1rem;
    gap: 0.6rem;
    border-radius: 0.6rem;
    padding: 1rem;
    @media (max-width: 600px) {
      flex-direction: column;
      padding: 0rem;
      margin: 0rem;
      border-radius: 0px;
    }
    & header {
      background-image: url("./assets/images/bg-sidebar-desktop.svg");
      background-size: cover;
      flex-shrink: 0;
      min-height: 10rem;
      @media (max-width: 600px) {
        background-image: url("./assets/images/bg-sidebar-mobile.svg");
      }
      > ul {
        display: flex;
        flex-direction: column;
        @media (max-width: 600px) {
          flex-direction: row;
          justify-content: space-around;
        }
        gap: 1rem;
        padding-inline: 2rem;
        padding-block: 2.4rem;

        > li {
          &.active {
            .step-number {
              background-color: var(--pastel-blue);
              color: var(--font-color);
            }
          }
          display: flex;
          align-items: center;
          gap: 1rem;
          color: var(--font-color-inverse);

          .step-number {
            font-weight: bold;
            padding: 1rem;
            border: 1px solid var(--pastel-blue);
            border-radius: 100%;
            width: 2rem;
            height: 2rem;
            display: grid;
            place-content: center;
          }
          .step-labels {
            @media (max-width: 600px) {
              display: none;
            }
            .step-label {
              text-transform: uppercase;
              font-size: smaller;
              color: var(--font-color-inverse-secondary);
              font-size: 0.875rem;
            }
            .label {
              text-transform: uppercase;
              font-weight: 500;
              font-size: 0.875rem;
            }
          }
        }
      }
    }
    & ul.content {
      @media (max-width: 600px) {
        margin-top: -5rem;
      }
      background-color: var(--background-color);
      margin-inline: 2rem;
      border-radius: 0.6rem;

      > li {
        display: none;
        height: 100%;
        &.active {
          display: flex;
        }
        & form {
          display: flex;
          flex-direction: column;
          gap: 1rem;
          height: 100%;
          padding-inline: 1.5rem;
          padding-block: 2rem;
          max-width: 500px;

          h1 + p,
          small {
            color: var(--font-color-secondary);
          }
        }
      }
    }
    & footer {
      display: flex;
      flex-direction: row-reverse;
      justify-content: space-between;
      flex-grow: 1;
      align-items: flex-end;
    }
  `;

  const isCurrentIndex = (index: number) => currentStepState.val == index;

  const Header = ({ index, label }: any) =>
    li(
      { class: () => isCurrentIndex(index) && "active" },
      div({ class: "step-number" }, index),
      div(
        { class: "step-labels" },
        div({ class: "step-label" }, "Step ", index),
        div({ class: "label" }, label)
      )
    );

  const next = () => {
    currentStepState.val++;
  };
  const onPrevious = () => {
    currentStepState.val--;
  };

  const onsubmitYourInfo = (event: HTMLFormElement) => {
    event.preventDefault();
    const payload = Object.fromEntries(new FormData(event.currentTarget));
    console.log(payload);
    next();
  };

  const onsubmitPlan = (event: HTMLFormElement) => {
    event.preventDefault();
    const payload = Object.fromEntries(new FormData(event.currentTarget));
    const planFound = PLANS.find(({ name }) => name == String(payload.plan));
    if (planFound) {
      plan.val = planFound;
    }
    isPerYear.val = !!payload.yearly;
    next();
  };

  const onsubmitAddon = (event: HTMLFormElement) => {
    event.preventDefault();
    const checkboxes = [
      ...event.currentTarget.querySelectorAll('input[name="addons"]:checked'),
    ].map(({ value }) => value);
    addons.val = ADDONS.filter(({ name }) => checkboxes.includes(name));
    next();
  };

  const onChangePlan = () => {
    currentStepState.val = 2;
  };

  const steps = [
    {
      label: "Your Info",
      Content: () => StepYourInfo({ onsubmit: onsubmitYourInfo }),
    },
    {
      label: "Select Plan",
      Content: ({}) => StepSelectPlan({ onsubmit: onsubmitPlan, onPrevious }),
    },
    {
      label: "Add on",
      Content: ({}) => StepAddOns({ onsubmit: onsubmitAddon, onPrevious }),
    },
    {
      label: "Summary",
      Content: ({}) => StepSummary({ onPrevious, onChangePlan }),
    },
  ];

  return () => {
    return article(
      { class: className },
      header(
        ul(steps.map(({ label }, index) => Header({ index: index + 1, label })))
      ),
      ul(
        { class: "content" },
        steps.map(({ Content }, index) =>
          li(
            { class: () => isCurrentIndex(index + 1) && "active" },
            Content({})
          )
        )
      )
    );
  };
}
