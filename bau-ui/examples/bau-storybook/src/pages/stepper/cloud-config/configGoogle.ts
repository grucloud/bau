import button from "@grucloud/bau-ui/button";
import form from "@grucloud/bau-ui/form";
import fileInput from "@grucloud/bau-ui/fileInput";

import { Context } from "@grucloud/bau-ui/context";
import buttonsFooter from "./buttonsFooter";
import buttonPrevious from "./buttonPrevious";

export default (context: Context) => {
  const { bau, css, config } = context;
  const {
    section,
    h1,
    header,
    p,
    div,
    i,
    ol,
    li,
    span,
    em,
    a,
    table,
    tbody,
    th,
    tr,
    td,
  } = bau.tags;
  const { svg, use } = bau.tagsNS("http://www.w3.org/2000/svg");

  const FileInput = fileInput(context);
  const Button = button(context);
  const Form = form(context);
  const ButtonPrevious = buttonPrevious(context);
  const ButtonsFooter = buttonsFooter(context);

  return function ConfigGoogle({ onclickPrevious, onclickNext }: any) {
    const fileState = bau.state("No file selected");
    const contentState = bau.state({});
    const disabledState = bau.state(true);

    const onchange = (event: any) => {
      const file = event.target.files[0];
      if (file) {
        fileState.val = file.name;
        const reader = new FileReader();
        reader.readAsText(file);
        reader.onload = () => {
          try {
            if (reader.result) {
              // @ts-ignore
              const contentJson = JSON.parse(reader.result);
              contentState.val = contentJson;
              if (contentJson.project_id) {
                disabledState.val = false;
              }
            }
          } catch (error) {
            //TODO display error
            //store.error = "Error parsing file";
          }
        };

        reader.onerror = () => {
          //TODO display error
          console.log(reader.error);
        };
      } else {
        //TODO
        fileState.val = "";
      }
    };

    const CredentialFile = ({ fileName, content }: any) => {
      return table(
        {
          class: css`
            border-collapse: collapse;
            & td,
            th {
              border-top: 1px solid var(--color-emphasis-100);
              border-bottom: 1px solid var(--color-emphasis-100);
              padding: 0.5rem;
              text-align: left;
            }
          `,
        },
        tbody(
          tr(th("Credential File"), td(fileName)),
          tr(th("Project Name"), td(content.project_id)),
          tr(th("Service Account"), td(content.client_email))
        )
      );
    };

    const FileInputLabel = ({}: any) =>
      div(
        {
          class: css`
            display: inline-flex;
            align-items: center;
            flex-direction: column;
            stroke: var(--font-color-base);
            fill: var(--font-color-base);
            gap: 1rem;
          `,
        },
        svg(
          { width: 100, height: 100, fill: "currentColor" },
          use({ href: `${config.base}/uploadIcon.svg#Capa_1` })
        ),
        span("Choose a GCP credential file to upload")
      );

    const onsubmit = (event: any) => {
      // const {  } =
      //   event.target.elements;
      // alert(
      //   `infraName: ${infraName.value}  accessKeyId ${accessKeyId.value}, region: ${region.value}`
      // );
      event.preventDefault();
      onclickNext();
    };
    const className = css`
      & ol {
        & > li {
          padding: 0.3rem 0;
        }
      }
    `;

    return Form(
      {
        name: "form-config-google",
        class: className,
        onsubmit,
        "data-infra-create": true,
      },
      header(
        h1("Google Configuration"),
        p(
          "GruCloud requires a read-only service account to scan a project's architecture. Please select the service account credential JSON file for the project that will be scanned. Follow the following steps to create and upload this file."
        )
      ),
      section(
        ol(
          li(
            "Visit the ",
            a(
              {
                href: "https://console.cloud.google.com/iam-admin/serviceaccounts",
                target: "_blank",
              },
              "service account page"
            ),
            " on the google cloud console"
          ),
          li("Select your project"),
          li("Click on ", em("CREATE SERVICE ACCOUNT"), ""),
          li(
            "Set the ",
            em("Service account name"),
            " to 'grucloud' for instance"
          ),
          li("Click on ", em("CREATE"), ""),
          li("Select the basic role 'Viewer'"),
          li("Click on ", em("CONTINUE"), ""),
          li("Click on ", em("DONE"), ""),
          li(
            "Go to the ",
            em("Actions"),
            " column, click on the three dot icon of the newly created service account"
          ),
          li("Click on ", em("Manage keys"), ""),
          li("Click on ", em("ADD KEYS"), ", then ", em("Create new key"), ""),
          li(
            "Click on ",
            em("CREATE"),
            " to download the credential file in JSON format."
          )
        ),
        FileInput({
          "data-input-google-upload": true,
          Component: FileInputLabel,
          name: "file",
          accept: "application/JSON",
          onchange,
        }),
        () =>
          CredentialFile({ fileName: fileState.val, content: contentState.val })
      ),
      ButtonsFooter(ButtonPrevious({ onclick: onclickPrevious }), () =>
        Button(
          {
            type: "submit",
            variant: "outline",
            color: "primary",
            disabled: disabledState.val,
          },
          "Next",
          i("\u25b6")
        )
      )
    );
  };
};
