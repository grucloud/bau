import { css } from "goober";

import alertExamples from "../../components/alert/alert.examples";
import animateExamples from "../../components/animate/animate.examples";
import alertStackExamples from "../../components/alertStack/alertStack.examples";
import buttonExamples from "../../components/button/button.examples";
import checkboxExamples from "../../components/checkbox/checkbox.examples";
import fileInputExamples from "../../components/fileInput/fileInput.examples";
import inputExamples from "../../components/input/input.examples";
import modalExamples from "../../components/modal/modal.examples";

import spinnerExamples from "../../components/spinner/spinner.examples";
import tabsExamples from "../../components/tabs/tabs.examples";

export const main = (context) => {
  const { tr, bau } = context;
  const { div, main, h1 } = bau.tags;

  return function Main() {
    return main(
      {
        class: css`
          section {
            margin: 1rem;
            border: 1px dotted grey;
            padding: 1rem;
          }
        `,
      },
      h1(tr("Examples")),
      alertStackExamples(context)(),
      animateExamples(context)(),
      alertExamples(context)(),
      buttonExamples(context)(),
      checkboxExamples(context)(),
      fileInputExamples(context)(),
      inputExamples(context)(),
      modalExamples(context)(),
      spinnerExamples(context)(),
      tabsExamples(context)()
    );
  };
};
