import navBarMenu from "./navBarMenu";
import { componentList } from "./componentListData";

import accordionExamples from "./pages/accordion.examples";
import alertExamples from "./pages/alert.examples";
import animateExamples from "./pages/animate.examples";
import avatarExamples from "./pages/avatar.examples";
import alertStackExamples from "./pages/alertStack.examples";
import breadcrumbExamples from "./pages/breadcrumb.examples";
import buttonExamples from "./pages/button.examples";
import checkboxExamples from "./pages/checkbox.examples";
import drawerExamples from "./pages/drawer.examples";
import drillDownMenuExamples from "./pages/drillDownMenu.examples";
import fileInputExamples from "./pages/fileInput.examples";
import inputExamples from "./pages/input.examples";
import modalExamples from "./pages/modal.examples";
import spinnerExamples from "./pages/spinner.examples";
import switchExamples from "./pages/switch.examples";
import tabsExamples from "./pages/tabs.examples";
import themeSwitchExamples from "./pages/themeSwitch.examples";
import treeViewExamples from "./pages/treeView.examples";

export default function (context) {
  const { tr, bau, css } = context;
  const { div, main, h1, article } = bau.tags;

  const NavBarMenu = navBarMenu(context);

  return function ComponentList() {
    return div(
      {
        class: css`
          grid-area: main;
          display: flex;
        `,
      },
      NavBarMenu({ componentList: componentList(), name: "Components" }),
      article(
        {
          class: css`
            padding: 10px;
            margin-top: 20px;
            > section {
              padding: 10px;
              margin: 10px;
              box-shadow: var(--shadow-s);
            }
          `,
        },
        h1(tr("Component Examples")),
        accordionExamples(context)(),
        alertExamples(context)(),
        alertStackExamples(context)(),
        animateExamples(context)(),
        avatarExamples(context)(),
        breadcrumbExamples(context)(),
        buttonExamples(context)(),
        checkboxExamples(context)(),
        drawerExamples(context)(),
        drillDownMenuExamples(context)(),
        fileInputExamples(context)(),
        inputExamples(context)(),
        modalExamples(context)(),
        spinnerExamples(context)(),
        switchExamples(context)(),
        tabsExamples(context)(),
        themeSwitchExamples(context)(),
        treeViewExamples(context)()
      )
    );
  };
}
