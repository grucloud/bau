import button from "@grucloud/bau-ui/button";
import form from "@grucloud/bau-ui/form";
import list from "@grucloud/bau-ui/list";
import modal from "@grucloud/bau-ui/modal";

import { Context } from "@grucloud/bau-ui/context";
import buttonsFooter from "./buttonsFooter";
import buttonPrevious from "./buttonPrevious";
import { PROJECTS } from "./projectList";

//const projectId = (project: any) => `${project.url}${project.directory}`;

const projectItem = (context: Context) => {
  const { bau, css } = context;
  const { li, strong, span } = bau.tags;
  return function ImportTypeItem({ project, onclickItem }: any) {
    return li(
      {
        onclick: onclickItem(project),
        class: css`
          flex-direction: column;
          align-items: flex-start;
        `,
      },
      strong(project.title),
      span(project.description)
    );
  };
};

const importTypeItem = (context: Context) => {
  const { bau, css } = context;
  const { li, strong, small } = bau.tags;
  return function ImportTypeItem({ item, onclickItem }: any) {
    return li(
      {
        onclick: onclickItem(item),
        class: css`
          flex-direction: column;
          align-items: flex-start;
        `,
      },
      strong(item.title),
      small(item.description)
    );
  };
};

export default (context: Context) => {
  const { bau } = context;
  const { section, h1, header, p, i, footer } = bau.tags;

  const Button = button(context);
  const Form = form(context);
  const ButtonPrevious = buttonPrevious(context);
  const ButtonsFooter = buttonsFooter(context);
  const ImportTypeItem = importTypeItem(context);
  const ProjectItem = projectItem(context);

  const List = list(context);
  const Modal = modal(context);

  return function ImportProject({
    providerName,
    onclickPrevious,
    onclickImportExistingInfra,
    onclickImportFromTemplate,
  }: any) {
    const modalEl = Modal(
      { id: "my-dialog" },
      header("Infrastructure from template"),
      p("Select an infrastructure template from the list below."),
      section(
        List(
          // @ts-ignore
          PROJECTS[providerName].map((project: any) =>
            ProjectItem({
              project,
              onclickItem: (project: any) => () => {
                modalEl.close();
                onclickImportFromTemplate(project);
              },
            })
          )
        )
      ),
      footer(
        Button(
          {
            variant: "outline",
            //color,
            onclick: () => {
              modalEl.close();
            },
          },
          "Cancel"
        )
      )
    );

    return Form(
      {
        name: "form-import-project",
        "data-form-import-project": true,
      },
      header(h1("Import Project"), p("")),
      section(
        List(
          ImportTypeItem({
            "data-selection-project-import-existing": true,
            item: {
              title: "Import an existing infrastructure",
              description:
                "Choose this option to visualize an existing infrastructure.",
            },
            onclickItem: () => () => {
              onclickImportExistingInfra();
            },
          }),
          ImportTypeItem({
            "data-selection-project-new-from-template": true,
            item: {
              title: "Create new infrastructure from a template",
              description:
                "This option lets you create an infrastructure from a selection of ready made template.",
            },
            onclickItem: () => () => {
              modalEl.showModal();
            },
          })
        )
      ),
      modalEl,
      ButtonsFooter(ButtonPrevious({ onclick: onclickPrevious }))
    );
  };
};
