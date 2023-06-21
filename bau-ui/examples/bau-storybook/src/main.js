import alertExamples from "./pages/alert.examples";
import animateExamples from "./pages/animate.examples";
import avatarExamples from "./pages/avatar.examples";
import alertStackExamples from "./pages/alertStack.examples";
import buttonExamples from "./pages/button.examples";
import checkboxExamples from "./pages/checkbox.examples";
import drawerExamples from "./pages/drawer.examples";
import fileInputExamples from "./pages/fileInput.examples";
import inputExamples from "./pages/input.examples";
import modalExamples from "./pages/modal.examples";
import spinnerExamples from "./pages/spinner.examples";
import switchExamples from "./pages/switch.examples";
import tabsExamples from "./pages/tabs.examples";
import treeViewExamples from "./pages/treeView.examples";

export const main = (context) => {
  const { tr, bau, css } = context;
  const { div, main, h1 } = bau.tags;

  return function Main() {
    return main(
      {
        class: css`
          grid-area: main;
          padding: 10px;
          margin-top: 20px;
          > section {
            padding: 10px;
            margin: 10px;
            box-shadow: var(--global-shadow-lw);
          }
        `,
      },
      h1(tr("Examples")),
      alertExamples(context)(),
      alertStackExamples(context)(),
      animateExamples(context)(),
      avatarExamples(context)(),
      buttonExamples(context)(),
      checkboxExamples(context)(),
      drawerExamples(context)(),
      fileInputExamples(context)(),
      inputExamples(context)(),
      modalExamples(context)(),
      spinnerExamples(context)(),
      switchExamples(context)(),
      tabsExamples(context)(),
      treeViewExamples(context)()
    );
  };
};
