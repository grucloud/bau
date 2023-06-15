import alertExamples from "../../components/alert/alert.examples";
import animateExamples from "../../components/animate/animate.examples";
import avatarExamples from "../../components/avatar/avatar.examples";
import alertStackExamples from "../../components/alertStack/alertStack.examples";
import buttonExamples from "../../components/button/button.examples";
import checkboxExamples from "../../components/checkbox/checkbox.examples";
import drawerExamples from "../../components/drawer/drawer.examples";
import fileInputExamples from "../../components/fileInput/fileInput.examples";
import inputExamples from "../../components/input/input.examples";
import modalExamples from "../../components/modal/modal.examples";
//import selectMenuExamples from "../../components/selectmenu/selectmenu.examples";
import spinnerExamples from "../../components/spinner/spinner.examples";
import switchExamples from "../../components/switch/switch.examples";

import tabsExamples from "../../components/tabs/tabs.examples";

export const main = (context) => {
  const { tr, bau, css } = context;
  const { div, main, h1 } = bau.tags;

  return function Main() {
    return main(
      {
        class: css`
          grid-row: 2;
          padding: 10px;
          margin-top: 20px;
          grid-column: 2 / 3;
          > section {
            padding: 10px;
            margin: 10px;
            box-shadow: ${context.theme.shadows[1]};
          }
        `,
      },
      h1(tr("Examples")),
      alertStackExamples(context)(),
      animateExamples(context)(),
      alertExamples(context)(),
      avatarExamples(context)(),
      buttonExamples(context)(),
      checkboxExamples(context)(),
      drawerExamples(context)(),
      fileInputExamples(context)(),
      inputExamples(context)(),
      modalExamples(context)(),
      // selectMenuExamples(context)(),
      spinnerExamples(context)(),
      switchExamples(context)(),
      tabsExamples(context)()
    );
  };
};
