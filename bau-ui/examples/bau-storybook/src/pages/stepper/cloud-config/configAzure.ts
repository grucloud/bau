import button from "@grucloud/bau-ui/button";
import input from "@grucloud/bau-ui/input";
import form from "@grucloud/bau-ui/form";
import buttonPrevious from "./buttonPrevious";
import buttonsFooter from "./buttonsFooter";

import { Context } from "@grucloud/bau-ui/context";

export default (context: Context) => {
  const { bau, css } = context;
  const { section, h1, header, p, label, i, ol, li, h3, pre, em, div } =
    bau.tags;

  const Button = button(context);
  const ButtonPrevious = buttonPrevious(context);
  const ButtonsFooter = buttonsFooter(context);

  const Input = input(context);
  const Form = form(context);

  return function ConfigAzure({ onclickPrevious, onclickNext }: any) {
    const onsubmit = (event: any) => {
      // const { subscriptionId, tenantId, appId, password } =
      //   event.target.elements;
      // alert(
      //   `subscriptionId: ${subscriptionId.value}  tenantId ${tenantId.value}, appId: ${appId.value}`
      // );
      event.preventDefault();
      onclickNext();
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
                pattern: String.raw`\w{32,32}`,
                title: "Length should be 32 characters.",
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
                pattern: String.raw`\w{36,36}`,
                title: "Length should be 36 characters.",
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
                  display: flex;
                  gap: 1rem;
                `,
              },
              label(
                "App Id",
                Input({
                  "data-input-azure-app-id": true,
                  placeholder: "App Id",
                  name: "appId",
                  pattern: String.raw`\w{36,36}`,
                  title: "Length should be 36 characters.",
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
                  pattern: String.raw`\w{8,64}`,
                  title: "Length should be greater than 8 and below 64",
                  required: true,
                })
              )
            )
          )
        )
      ),
      ButtonsFooter(
        ButtonPrevious({ onclick: onclickPrevious }),
        Button(
          {
            type: "submit",
            variant: "outline",
            color: "primary",
          },
          "Next",
          i("\u25b6")
        )
      )
    );
  };
};
