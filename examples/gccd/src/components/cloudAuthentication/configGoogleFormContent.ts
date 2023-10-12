import rubico from "rubico";
const { get, pipe, map, tap } = rubico;
import rubicox from "rubico/x";
const { isEmpty, callProp, last } = rubicox;
import { Context } from "@grucloud/bau-ui/context";
import fileInput from "@grucloud/bau-ui/fileInput";
import alert from "@grucloud/bau-ui/alert";
import spinner from "@grucloud/bau-ui/spinner";

import selectGoogleRegion from "./selectGoogleRegion";
import selectGoogleZone from "./selectGoogleZone";
import { googleAuthorize } from "./googleAuthorize";
import useQuery from "../../utils/useQuery";

type ConfigGoogleFormContentProp = {
  GOOGLE_CREDENTIALS?: Record<string, any>;
  GOOGLE_REGION?: string;
  GOOGLE_ZONE?: string;
  onConfig: (config: object) => void;
};

export const googleFormElementToData = (event: any) => {
  const { GOOGLE_REGION, GOOGLE_ZONE } = event.target.elements;

  return {
    GOOGLE_REGION: GOOGLE_REGION.value,
    GOOGLE_ZONE: GOOGLE_ZONE.value,
  };
};

export default (context: Context) => {
  const { bau, config, css } = context;
  const { section, div, ol, li, span, em, a, table, tbody, th, tr, td, label } =
    bau.tags;
  const { svg, use } = bau.tagsNS("http://www.w3.org/2000/svg");

  const query = useQuery(context);

  const getProjectQuery = query(
    async ({ project_id, token }: any) => {
      try {
        const response = await fetch(
          "https://corsproxy.io/?" +
            encodeURIComponent(
              `https://compute.googleapis.com/compute/v1/projects/${project_id}/regions`
            ),
          {
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );
        if (response.ok) {
          const { items } = await response.json();
          return items.filter(({ status }: any) => status === "UP");
        }
        throw response;
      } catch (error) {
        throw error;
      }
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
          & th {
            font-size: smaller;
            color: var(--font-color-secondary);
          }
        `,
      },
      tbody(
        tr(th("Credential File"), td(fileName)),
        tr(th("Project Id"), td(content.project_id)),
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

  return function configGoogleFormContent({
    onConfig,
    GOOGLE_CREDENTIALS,
    GOOGLE_REGION,
    GOOGLE_ZONE,
  }: ConfigGoogleFormContentProp) {
    const fileState = bau.state("No file selected");
    const contentState = bau.state(GOOGLE_CREDENTIALS);

    const project_id = bau.derive(() => contentState.val?.project_id);
    const regionState = bau.state(GOOGLE_REGION);
    const tokenState = bau.state("");

    const zonesState = bau.derive(
      pipe([
        () => {
          console.log("zonesState region", regionState.val);
        },
        () =>
          getProjectQuery.data.val.find(
            ({ name }: any) => name == regionState.val
          ),
        tap((zones: any) => {
          console.log("zones", zones);
        }),
        get("zones", []),
        map(pipe([callProp("split", "/"), last])),
        tap((zones: any) => {
          console.log("zones", zones);
        }),
      ])
    );

    bau.derive(async () => {
      if (contentState.val?.private_key) {
        const token = await googleAuthorize({
          credentials: contentState.val,
        });
        //console.log("token", token);
        tokenState.val = token.access_token;

        if (
          token.access_token &&
          project_id &&
          isEmpty(getProjectQuery.data.val)
        ) {
          getProjectQuery.run({
            project_id: project_id.val,
            token: token.access_token,
          });
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
              if (contentJson.project_id) {
                onConfig(contentJson);
              } else {
                errorMessage.val = "File is not a GCP crendential file.";
              }
            }
          } catch (error) {
            debugger;
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

    return section(
      { class: className },
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
        CredentialFile({ fileName: fileState.val, content: contentState.val }),
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
          project_id: project_id.val,
          zones: zonesState.val,
        })
      )
    );
  };
};
