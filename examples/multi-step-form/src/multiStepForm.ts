import { type Context } from "@grucloud/bau-ui/context";
import stepYourInfo from "./stepYourInfo";
import stepSelectPlan from "./stepSelectPlan";

export default function (context: Context) {
  const { bau, css } = context;
  const { article, div, header, ul, li, span } = bau.tags;
  const StepYourInfo = stepYourInfo(context);
  const StepSelectPlan = stepSelectPlan(context);

  const currentStepState = bau.state(1);

  const className = css`
    border: 1px solid red;
    max-width: 1000px;
    margin: auto;
    display: flex;
    justify-content: center;
    align-items: stretch;
    gap: 0.6rem;
    border-radius: 0.6rem;
    padding: 1rem;

    & header {
      border: 1px solid blue;
      background-image: url("./assets/images/bg-sidebar-desktop.svg");
      background-size: cover;
      > ul {
        display: flex;
        flex-direction: column;
        gap: 1rem;
        padding: 1rem;
        > li {
          &.active {
            color: red;
          }
          display: flex;
          align-items: center;
          gap: 1rem;
          color: var(--font-color-inverse);

          .step-number {
            font-weight: bold;
            padding: 1rem;
            border: 1px solid white;
            border-radius: 100%;
            width: 2rem;
            height: 2rem;
            display: grid;
            place-content: center;
          }
          .step-label {
            text-transform: uppercase;
            font-size: smaller;
            color: var(--font-color-inverse-secondary);
          }
          .label {
            text-transform: uppercase;
            font-weight: bold;
          }
        }
      }
    }
    .content {
      border: 1px solid blue;
      min-width: 375px;
      min-height: 400px;
      > ul {
        > li {
          display: none;
          &.active {
            display: block;
          }
          form {
            display: flex;
            flex-direction: column;
            gap: 1rem;
          }
        }
      }
    }
  `;
  const isCurrentIndex = (index: number) => currentStepState.val == index;

  const Header = ({ index, label }: any) =>
    li(
      { class: () => isCurrentIndex(index) && "active" },
      div({ class: "step-number" }, index),
      div(
        div({ class: "step-label" }, "Step", index),
        div({ class: "label" }, label)
      )
    );

  const next = () => {
    currentStepState.val++;
  };
  const previous = () => {
    currentStepState.val--;
  };

  const onsubmitYourInfo = (event: HTMLFormElement) => {
    event.preventDefault();
    const payload = Object.fromEntries(new FormData(event.currentTarget));
    next();
  };

  const onsubmitAddon = (event) => {
    event.preventDefault();
    const payload = Object.fromEntries(new FormData(event.currentTarget));
    alert(JSON.stringify(payload));
    // next();
  };

  const steps = [
    {
      label: "Your Info",
      Content: () => StepYourInfo({ onsubmit: onsubmitYourInfo }),
    },
    {
      label: "Select Plan",
      Content: ({}) => StepSelectPlan({ onsubmit: onsubmitAddon }),
    },
  ];

  return () => {
    return article(
      { class: className },
      header(ul(steps.map(({ label }, index) => Header({ index, label })))),
      div(
        { class: "content" },
        ul(
          steps.map(({ Content, label }, index) =>
            li({ class: () => isCurrentIndex(index) && "active" }, Content({}))
          )
        )
      )
    );
  };
}
