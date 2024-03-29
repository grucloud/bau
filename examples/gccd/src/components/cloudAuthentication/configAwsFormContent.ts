import pipe from "rubico/pipe";
import map from "rubico/map";
import filter from "rubico/filter";

import { Context } from "@grucloud/bau-ui/context";
import input from "@grucloud/bau-ui/input";
import radioButtonGroup from "@grucloud/bau-ui/radioButtonGroup";

import selectAwsRegion from "./selectAwsRegion";
import awsServices from "./awsServices";

type ConfigAwsFormContentProp = {
  AWSAccessKeyId?: string;
  AWSSecretKey?: string;
  GRUCLOUD_ROLE_WEB_IDENTITY_ARN?: string;
  AWS_OAUTH_AUDIENCE?: string;
  AWS_REGION?: string;
  SERVICES?: string[];
};

const checkboxArrayService = pipe([
  Object.entries,
  filter(([key]: any) => key.startsWith("checkbox")),
  map(([k]: any) => k.replace("checkbox-", "")),
]);

export const awsFormElementToData = (event: any) => {
  const {
    AWSAccessKeyId,
    AWSSecretKey,
    AWS_REGION,
    GRUCLOUD_ROLE_WEB_IDENTITY_ARN,
    AWS_OAUTH_AUDIENCE,
  } = event.target.elements;

  const payload = Object.fromEntries(
    new FormData(event.target.closest("form"))
  );

  return {
    AWSAccessKeyId: AWSAccessKeyId?.value.trim(),
    AWSSecretKey: AWSSecretKey?.value,
    AWS_REGION: AWS_REGION.value,
    GRUCLOUD_ROLE_WEB_IDENTITY_ARN: GRUCLOUD_ROLE_WEB_IDENTITY_ARN?.value,
    AWS_OAUTH_AUDIENCE: AWS_OAUTH_AUDIENCE?.value,
    SERVICES: checkboxArrayService(payload),
  };
};

export default (context: Context) => {
  const { bau, css } = context;
  const { section, label, fieldset, legend, header, small } = bau.tags;
  const AwsServices = awsServices(context);
  const Input = input(context);
  const RadioButtonGroup = radioButtonGroup(context);

  const SelectAwsRegion = selectAwsRegion(context);

  const IamRoleSection = ({
    GRUCLOUD_ROLE_WEB_IDENTITY_ARN,
    AWS_OAUTH_AUDIENCE = "aws.workload.identity",
  }: any) =>
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
          size: 64,
          required: true,
        }),
        small(
          "The IAM Role ARN  such as arn:aws:iam::123456789:role/role-grucloud"
        )
      ),
      label(
        "Audience",
        Input({
          "data-input-oauth-audiencee": true,
          placeholder: "aws.workload.identity",
          name: "AWS_OAUTH_AUDIENCE",
          defaultValue: AWS_OAUTH_AUDIENCE,
          minLength: 8,
          maxLength: 64,
          size: 32,
          required: true,
        })
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
    AWS_OAUTH_AUDIENCE,
    SERVICES,
  }: ConfigAwsFormContentProp) {
    const radioState = bau.state(AWSAccessKeyId ? "accessKey" : "role");

    const oninput = (event: any) => {
      radioState.val = event.target.value;
    };
    return section(
      fieldset(
        legend("Region"),
        SelectAwsRegion({
          name: "AWS_REGION",
          value: AWS_REGION,
        })
      ),
      AwsServices({ SERVICES }),
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
              gap: 1rem;
              & label {
                flex-direction: row;
                border: 1px dotted var(--color-emphasis-500);
                border-radius: var(--global-radius);
                padding: 0.4rem;
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
              { value: "role", Label: () => "OICD Provider IAM Role" },
              { value: "accessKey", Label: () => "Access and Secret Key" },
            ],
          })
        ),
        () =>
          radioState.val == "role"
            ? IamRoleSection({
                GRUCLOUD_ROLE_WEB_IDENTITY_ARN,
                AWS_OAUTH_AUDIENCE,
              })
            : AccessSecretKeySection({ AWSAccessKeyId, AWSSecretKey })
      )
    );
  };
};
