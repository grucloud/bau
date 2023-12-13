import rubico from "rubico";
const { get, pipe, tap } = rubico;
import { Context } from "@grucloud/bau-ui/context";
import fileInput from "@grucloud/bau-ui/fileInput";
import alert from "@grucloud/bau-ui/alert";
import spinner from "@grucloud/bau-ui/spinner";
import radioButtonGroup from "@grucloud/bau-ui/radioButtonGroup";

import input from "@grucloud/bau-ui/input";

import selectGoogleRegion from "./selectGoogleRegion";
import selectGoogleZone from "./selectGoogleZone";
import { googleAuthorize } from "./googleAuthorize";
import useQuery from "../../utils/useQuery";

type ConfigGoogleFormContentProp = {
  GOOGLE_CREDENTIALS?: Record<string, any>;
  GOOGLE_REGION?: string;
  GOOGLE_ZONE?: string;
  GOOGLE_PROJECT_ID?: string;
  onConfig: (config: object) => void;
};

export const googleFormElementToData = (event: any) => {
  const { GOOGLE_REGION, GOOGLE_ZONE, GOOGLE_PROJECT_ID } =
    event.target.elements;

  return {
    GOOGLE_REGION: GOOGLE_REGION.value,
    GOOGLE_ZONE: GOOGLE_ZONE.value,
    GOOGLE_PROJECT_ID: GOOGLE_PROJECT_ID.value,
  };
};

export default (context: Context) => {
  const { bau, config, css } = context;
  const {
    section,
    div,
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
    label,
    legend,
    header,
    fieldset,
    strong,
    h3,
  } = bau.tags;
  const { svg, use } = bau.tagsNS("http://www.w3.org/2000/svg");

  const query = useQuery(context);

  const RadioButtonGroup = radioButtonGroup(context);

  const getProjectQuery = query(
    async () => {
      const { default: regions } = await import("./googleRegion.json");
      return regions;
    },
    { initialState: [] }
  );
  const Spinner = spinner(context);
  const SelectGoogleRegion = selectGoogleRegion(context);
  const SelectGoogleZone = selectGoogleZone(context);

  const FileInput = fileInput(context);
  const Alert = alert(context, { color: "danger" });
  const className = css`
    align-items: flex-start;
    & ol {
      & > li {
        padding: 0.3rem 0;
      }
    }
  `;
  const classNameTable = css`
    border-collapse: collapse;
    & td,
    th {
      border-top: 1px solid var(--color-emphasis-100);
      border-bottom: 1px solid var(--color-emphasis-100);
      padding: 0.5rem;
      text-align: left;
    }
    & th {
      font-size: smaller;
      color: var(--font-color-secondary);
    }
  `;

  const ServicePrincipalFile = ({ fileName, content }: any) =>
    table(
      {
        class: classNameTable,
      },
      tbody(
        tr(th("Credential File"), td(fileName)),
        tr(th("Project Id"), td(content.project_id)),
        tr(th("Service Account"), td(content.client_email))
      )
    );

  const WorkloadIdentityFile = ({ fileName, content }: any) =>
    table(
      {
        class: classNameTable,
      },
      tbody(
        tr(th("Credential File"), td(fileName)),
        tr(th("Audience"), td(content.audience))
      )
    );

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

  return function configGoogleFormContent({
    onConfig,
    GOOGLE_CREDENTIALS = {},
    GOOGLE_REGION,
    GOOGLE_ZONE,
    GOOGLE_PROJECT_ID = "",
  }: ConfigGoogleFormContentProp) {
    getProjectQuery.run();
    const fileState = bau.state("No file selected");
    const contentState = bau.state(GOOGLE_CREDENTIALS);
    const project_id = bau.state(GOOGLE_PROJECT_ID);
    bau.derive(() => {
      if (contentState.val?.project_id) {
        project_id.val = contentState.val?.project_id;
      }
    });

    const regionState = bau.state(GOOGLE_REGION);
    const tokenState = bau.state("");
    const radioState = bau.state(
      GOOGLE_CREDENTIALS.type == "service_account" ? "sp" : "federated"
    );

    const oninput = (event: any) => {
      radioState.val = event.target.id;
    };

    const zonesState = bau.derive(
      pipe([
        () =>
          regionState.val &&
          getProjectQuery.data.val.find(
            ({ name }: any) => regionState.val === name
          ),
        tap((zones: any) => {
          console.log("zones", zones);
        }),
        get("zones", []),
      ])
    );

    bau.derive(async () => {
      if (contentState.val?.private_key) {
        try {
          const token = await googleAuthorize({
            credentials: contentState.val,
          });
          //console.log("token", token);
          tokenState.val = token.access_token;
        } catch (error) {
          errorMessage.val = "Error authenticating";
        }
      }
    });

    const errorMessage = bau.state("");

    const onchange = (event: any) => {
      const file = event.target.files[0];
      errorMessage.val = "";
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
              if (contentJson.type) {
                onConfig(contentJson);
              } else {
                errorMessage.val = "File is not a GCP crendential file.";
              }
            }
          } catch (error) {
            errorMessage.val = "Error parsing file.";
          }
        };
        reader.onerror = () => {
          errorMessage.val = "Error reading file.";
        };
      } else {
        fileState.val = "";
      }
    };

    const Input = input(context);

    const WorkloadIdentity = ({}: any) =>
      section(
        h3("Create an identity pool"),
        ol(
          li(
            "Visit the ",
            a(
              {
                href: "https://console.cloud.google.com/iam-admin/workload-identity-pools",
                target: "_blank",
              },
              "Workload Identity Pools"
            ),
            " page on the google cloud console"
          ),
          li("Click on ", em("CREATE POOL")),
          li("Enter a name, for instance ", em("grucloud-my-project-dev")),
          li("Enter a Pool ID, for instance ", em("grucloud-my-project-dev")),

          li("Click on ", em("CONTINUE"))
        ),
        h3("Add a provider to pool"),
        ol(
          li("Select the ", em("OpenID Connect (OIDC)"), " provider"),
          li(
            "Enter the ",
            em("Provider Name and ID"),
            " such as ",
            em("grucloud-my-project-dev")
          ),
          li("Enter the issuer ", strong("https://app.grucloud.com"))
        ),
        h3("Configure provider attributes"),
        ol(
          li(
            "Set the ",
            strong("google.subject"),
            " to ",
            strong(`assertion.sub`)
          ),
          li("Click on ", em("Save"))
        ),
        h3("Grant Access"),
        ol(
          li("Click on the button ", strong("GRANT ACCESS")),
          li("Select an existing service account or create a new one"),
          li("Click on ", em("Save")),
          li(
            "In the ",
            em("Configure your application "),
            "dialog, select the provider previously created."
          ),
          li(
            "In the ",
            em("OIDC ID token path"),
            " field, enter ",
            strong("oauth/token")
          ),
          li("Click on ", em("DOWNLOAD CONFIG"))
        ),
        FileInput({
          "data-input-google-upload": true,
          Component: FileInputLabel,
          name: "file",
          accept: "application/JSON",
          onchange,
        }),
        () => errorMessage.val && Alert(errorMessage.val),
        () =>
          WorkloadIdentityFile({
            fileName: fileState.val,
            content: contentState.val,
          })
      );

    const ServicePrincipal = () =>
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
        () => errorMessage.val && Alert(errorMessage.val),
        () =>
          ServicePrincipalFile({
            fileName: fileState.val,
            content: contentState.val,
          })
      );

    return section(
      { class: className },
      fieldset(
        {
          class: css`
            display: flex;
            flex-direction: column;
            gap: 1rem;
            border: 1px solid var(--color-emphasis-500);
            & header {
              display: inline-flex;
              justify-content: flex-start;
              & label {
                flex-direction: row;
              }
            }
          `,
        },
        legend("Authentication Type"),
        header(
          RadioButtonGroup({
            oninput,
            name: "kind",
            value: radioState.val,
            radios: [
              { id: "federated", Label: () => "Workload identity" },
              { id: "password", Label: () => "Service Principal" },
            ],
          })
        ),
        () =>
          radioState.val == "federated"
            ? WorkloadIdentity({ GOOGLE_PROJECT_ID })
            : ServicePrincipal()
      ),
      label(
        "Project Id",
        Input({
          placeholder: "Project Id",
          name: "GOOGLE_PROJECT_ID",
          value: project_id,
          minLength: 8,
          maxLength: 64,
          size: 32,
          required: true,
        })
      ),
      label("Select the region:", () =>
        div(
          {
            class: css`
              display: flex;
              gap: 1rem;
              align-items: center;
            `,
          },
          SelectGoogleRegion({
            value: GOOGLE_REGION,
            regions: getProjectQuery.data.val.map(({ name }: any) => name),
            loading: getProjectQuery.loading.val,
            onchange: (event: any) => {
              regionState.val = event.target.value;
            },
          }),
          Spinner({
            visibility: getProjectQuery.loading.val,
          })
        )
      ),
      label("Select the zone:", () =>
        SelectGoogleZone({
          value: GOOGLE_ZONE,
          zones: zonesState.val,
        })
      )
    );
  };
};
