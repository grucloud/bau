import { Context } from "@grucloud/bau-ui/context";
import input from "@grucloud/bau-ui/input";
import form from "@grucloud/bau-ui/form";
import buttonPrevious from "./buttonPrevious";
import buttonsFooter from "./buttonsFooter";
import buttonNext from "./buttonNext";

import selectAzureRegion from "./selectAzureRegion";

export default (context: Context) => {
  const { bau, css } = context;
  const { section, h1, header, p, label, ol, li, h3, pre, em, div } = bau.tags;

  const ButtonPrevious = buttonPrevious(context);
  const ButtonNext = buttonNext(context);
  const ButtonsFooter = buttonsFooter(context);
  const SelectAzureRegion = selectAzureRegion(context);
  const Input = input(context);
  const Form = form(context);

  return function ConfigAzure({ onclickPrevious, onclickCloudConfig }: any) {
    const onsubmit = (event: any) => {
      const { subscriptionId, tenantId, appId, password, region } =
        event.target.elements;
      event.preventDefault();
      onclickCloudConfig({
        providerType: "azure",
        providerName: "azure",
        providerAuth: {
          AZURE_SUBSCRIPTION_ID: subscriptionId.value,
          AZURE_TENANT_ID: tenantId.value,
          AZURE_CLIENT_ID: appId.value,
          AZURE_CLIENT_SECRET: password.value,
        },
        options: { region: region.value },
      });
    };
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
    return Form(
      {
        name: "form-config-azure",
        onsubmit,
        "data-infra-create": true,
        class: className,
      },
      header(
        h1("Azure Configuration"),
        p(
          "Please follow the instructions to setup a service principal used by Grucloud to scan an Azure infrastructure."
        )
      ),
      section(
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
                name: "subscriptionId",
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
                autofocus: true,
                placeholder: "Tenant Id",
                name: "tenantId",
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
                  name: "appId",
                  minLength: 36,
                  maxLength: 36,
                  size: 36,
                  required: true,
                })
              ),
              label(
                "Password",
                Input({
                  "data-input-azure-password": true,
                  type: "password",
                  placeholder: "Password",
                  name: "password",
                  minLength: 8,
                  maxLength: 64,
                  size: 32,
                  required: true,
                })
              )
            )
          ),
          li(h3("Region"), p("Select the region:"), SelectAzureRegion({}))
        )
      ),
      ButtonsFooter(ButtonPrevious({ onclick: onclickPrevious }), ButtonNext())
    );
  };
};
