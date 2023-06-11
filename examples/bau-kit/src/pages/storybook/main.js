import { css } from "goober";

import alertExamples from "../../components/alert/alert.examples";
import animateExamples from "../../components/animate/animate.examples";
import alertStackExamples from "../../components/alertStack/alertStack.examples";
import buttonExamples from "../../components/button/button.examples";
import checkboxExamples from "../../components/checkbox/checkbox.examples";

import inputExamples from "../../components/input/input.examples";

export const main = (context) => {
  const { tr, bau } = context;
  const { div, main, h1 } = bau.tags;

  return function Main() {
    return main(
      {
        class: css`
          section {
            margin: 1rem;
          }
        `,
      },
      h1(tr("Examples")),
      alertStackExamples(context)(),
      animateExamples(context)(),
      alertExamples(context)(),
      buttonExamples(context)(),
      checkboxExamples(context)(),
      inputExamples(context)()
    );
  };
};
