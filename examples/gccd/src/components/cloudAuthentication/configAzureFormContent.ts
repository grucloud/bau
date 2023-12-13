import { Context } from "@grucloud/bau-ui/context";

import input from "@grucloud/bau-ui/input";
import radioButtonGroup from "@grucloud/bau-ui/radioButtonGroup";

import selectAzureRegion from "./selectAzureRegion";

type ConfigAzureFormContentProp = {
  AZURE_SUBSCRIPTION_ID?: string;
  AZURE_TENANT_ID?: string;
  AZURE_CLIENT_ID?: string;
  AZURE_CLIENT_SECRET?: string;
  AZURE_LOCATION?: string;
  AZURE_USE_OAUTH?: string;
  AZURE_OAUTH_AUDIENCE?: string;
};

export const azureFormElementToData = (event: any) => {
  const {
    AZURE_SUBSCRIPTION_ID,
    AZURE_TENANT_ID,
    AZURE_CLIENT_ID,
    AZURE_CLIENT_SECRET,
    AZURE_LOCATION,
    federated,
  } = event.target.elements;
  return {
    AZURE_SUBSCRIPTION_ID: AZURE_SUBSCRIPTION_ID.value,
    AZURE_TENANT_ID: AZURE_TENANT_ID.value,
    AZURE_CLIENT_ID: AZURE_CLIENT_ID.value,
    AZURE_CLIENT_SECRET: AZURE_CLIENT_SECRET?.value,
    AZURE_LOCATION: AZURE_LOCATION.value,
    AZURE_USE_OAUTH: federated.value === "federated" ? "TRUE" : undefined,
  };
};

export default (context: Context) => {
  const { bau, css } = context;
  const {
    section,
    p,
    label,
    ol,
    li,
    h3,
    pre,
    em,
    div,
    fieldset,
    legend,
    header,
  } = bau.tags;

  const Input = input(context);
  const RadioButtonGroup = radioButtonGroup(context);

  const SelectAzureRegion = selectAzureRegion(context);

  const className = css`
    & ol {
      list-style: none;
      counter-reset: counter;
      padding-left: 40px;
      > li {
        counter-increment: counter;
        margin: 0 0 0.5rem 0;
        position: relative;
        ::before {
          background-color: var(--color-primary);
          color: var(--font-color-inverse);
          content: counter(counter) ".";
          font-weight: bold;
          position: absolute;
          --size: 32px;
          left: calc(-1 * var(--size) - 10px);
          line-height: var(--size);
          width: var(--size);
          height: var(--size);
          top: 0;
          border-radius: 50%;
          text-align: center;
        }
      }
    }
  `;

  return function configAzureFormContent({
    AZURE_SUBSCRIPTION_ID,
    AZURE_TENANT_ID,
    AZURE_CLIENT_ID,
    AZURE_CLIENT_SECRET,
    AZURE_LOCATION,
    AZURE_OAUTH_AUDIENCE = "api://AzureADTokenExchange",
  }: ConfigAzureFormContentProp) {
    const radioState = bau.state(AZURE_CLIENT_SECRET ? "sp" : "federated");

    const oninput = (event: any) => {
      radioState.val = event.target.id;
    };

    const FederatedCredential = ({}) =>
      section(
        label(
          "Audience",
          Input({
            "data-input-oauth-audiencee": true,
            placeholder: "api://AzureADTokenExchange",
            name: "AZURE_OAUTH_AUDIENCE",
            defaultValue: AZURE_OAUTH_AUDIENCE,
            minLength: 8,
            maxLength: 64,
            size: 32,
            required: true,
          })
        )
      );
    const Password = ({ AZURE_CLIENT_SECRET }: any) =>
      section(
        label(
          "Password",
          Input({
            "data-input-azure-password": true,
            type: "password",
            placeholder: "Password",
            name: "AZURE_CLIENT_SECRET",
            defaultValue: AZURE_CLIENT_SECRET,
            minLength: 8,
            maxLength: 64,
            size: 32,
            required: true,
          })
        )
      );

    const Credentials = () =>
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
            name: "kind",
            oninput,
            value: radioState.val,
            radios: [
              { id: "federated", Label: () => "Federated Credential" },
              { id: "password", Label: () => "Password" },
            ],
          })
        ),
        () =>
          radioState.val == "federated"
            ? FederatedCredential({})
            : Password({ AZURE_CLIENT_SECRET })
      );

    return section(
      { class: className },
      ol(
        li(
          h3("Subscription Id"),
          p(
            "Retrieve the ",
            em("Subscription Id"),
            " with the following command:"
          ),
          pre("az account show --query id -otsv"),
          label(
            "Subscription Id",
            Input({
              "data-input-azure-subscription-id": true,
              autofocus: true,
              placeholder: "Subscription Id",
              name: "AZURE_SUBSCRIPTION_ID",
              defaultValue: AZURE_SUBSCRIPTION_ID,
              minLength: 36,
              maxLength: 36,
              size: 36,
              required: true,
            })
          )
        ),
        li(
          h3("Tenant Id"),
          p("Retrieve the ", em("Tenant Id"), " with the following command:"),
          pre("az account show"),
          label(
            "Tenant Id",
            Input({
              "data-input-azure-tenant-id": true,
              placeholder: "Tenant Id",
              name: "AZURE_TENANT_ID",
              defaultValue: AZURE_TENANT_ID,
              minLength: 36,
              maxLength: 36,
              size: 36,
              required: true,
            })
          )
        ),
        li(
          h3("App ID and PASSWORD"),
          p(
            "Retrieve the ",
            em("APP_ID"),
            " and ",
            em("PASSWORD"),
            " by creating a service principal called grucloud:"
          ),
          pre(`az ad sp create-for-rbac -n "grucloud"`),
          div(
            {
              class: css`
                display: inline-flex;
                flex-direction: column;
                gap: 1rem;
              `,
            },
            label(
              "App Id",
              Input({
                "data-input-azure-app-id": true,
                placeholder: "App Id",
                name: "AZURE_CLIENT_ID",
                defaultValue: AZURE_CLIENT_ID,
                minLength: 36,
                maxLength: 36,
                size: 36,
                required: true,
              })
            )
          )
        ),
        li(h3("Authentication"), Credentials()),
        li(
          h3("Region"),
          label(
            "Select the region:",
            SelectAzureRegion({ value: AZURE_LOCATION })
          )
        )
      )
    );
  };
};
