import input from "@grucloud/bau-ui/input";

import { Context } from "@grucloud/bau-ui/context";
import radioButton from "@grucloud/bau-ui/radioButton";

import selectAwsRegion from "./selectAwsRegion";

type ConfigAwsFormContentProp = {
  AWSAccessKeyId?: string;
  AWSSecretKey?: string;
  GRUCLOUD_ROLE_WEB_IDENTITY_ARN?: string;
  AWS_REGION?: string;
};
export const awsFormElementToData = (event: any) => {
  const {
    AWSAccessKeyId,
    AWSSecretKey,
    AWS_REGION,
    GRUCLOUD_ROLE_WEB_IDENTITY_ARN,
  } = event.target.elements;
  return {
    AWSAccessKeyId: AWSAccessKeyId?.value.trim(),
    AWSSecretKey: AWSSecretKey?.value,
    AWS_REGION: AWS_REGION.value,
    GRUCLOUD_ROLE_WEB_IDENTITY_ARN: GRUCLOUD_ROLE_WEB_IDENTITY_ARN?.value,
  };
};

export default (context: Context) => {
  const { bau, css } = context;
  const { section, label, fieldset, legend, header, small } = bau.tags;

  const Input = input(context);
  const RadioButton = radioButton(context);

  const SelectAwsRegion = selectAwsRegion(context);

  const IamRoleSection = ({ GRUCLOUD_ROLE_WEB_IDENTITY_ARN }: any) =>
    section(
      label(
        "IAM Role ARN",
        Input({
          autofocus: true,
          placeholder: "The IAM Role ARN",
          name: "GRUCLOUD_ROLE_WEB_IDENTITY_ARN",
          defaultValue: GRUCLOUD_ROLE_WEB_IDENTITY_ARN,
          autocomplete: "auto",
          minLength: 16,
          maxLength: 128,
          required: true,
        }),
        small(
          "The IAM Role ARN  such as arn:aws:iam::123456789:role/role-grucloud"
        )
      )
    );

  const AccessSecretKeySection = ({ AWSAccessKeyId, AWSSecretKey }: any) =>
    section(
      label(
        "Access Key Id",
        Input({
          autofocus: true,
          placeholder: "Access Key Id",
          name: "AWSAccessKeyId",
          defaultValue: AWSAccessKeyId,
          autocomplete: "auto",
          minLength: 16,
          maxLength: 128,
          required: true,
        })
      ),
      label(
        "Secret Key",
        Input({
          type: "password",
          placeholder: "Secret Key",
          name: "AWSSecretKey",
          defaultValue: AWSSecretKey,
          minLength: 16,
          maxLength: 128,
          required: true,
        })
      )
    );

  return function configAwsFormContent({
    AWSAccessKeyId,
    AWSSecretKey,
    AWS_REGION,
    GRUCLOUD_ROLE_WEB_IDENTITY_ARN,
  }: ConfigAwsFormContentProp) {
    const radioState = bau.state(AWSAccessKeyId ? "accessKey" : "role");

    const oninput = (event: any) => {
      radioState.val = event.target.id;
    };

    return section(
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
          label(
            "IAM Role",
            RadioButton({
              id: "role",
              name: "kind",
              checked: radioState.val == "role",
              value: radioState,
              oninput,
            })
          ),
          label(
            "Access and Secret Key",
            RadioButton({
              id: "accessKey",
              name: "kind",
              checked: radioState.val == "accessKey",
              value: radioState,
              oninput,
            })
          )
        ),
        () =>
          radioState.val == "role"
            ? IamRoleSection({ GRUCLOUD_ROLE_WEB_IDENTITY_ARN })
            : AccessSecretKeySection({ AWSAccessKeyId, AWSSecretKey })
      ),

      label(
        "Region",
        SelectAwsRegion({
          name: "AWS_REGION",
          value: AWS_REGION,
        })
      )
    );
  };
};
