import input from "@grucloud/bau-ui/input";

import { Context } from "@grucloud/bau-ui/context";

import selectAwsRegion from "./selectAwsRegion";

type ConfigAwsFormContentProp = {
  AWSAccessKeyId?: string;
  AWS_REGION?: string;
};
export const awsFormElementToData = (event: any) => {
  const { AWSAccessKeyId, AWSSecretKey, AWS_REGION } = event.target.elements;
  return {
    AWSAccessKeyId: AWSAccessKeyId.value.trim(),
    AWSSecretKey: AWSSecretKey.value,
    AWS_REGION: AWS_REGION.value,
  };
};

export default (context: Context) => {
  const { bau } = context;
  const { section, label } = bau.tags;

  const Input = input(context);
  const SelectAwsRegion = selectAwsRegion(context);

  return function configAwsFormContent({
    AWSAccessKeyId,
    AWS_REGION,
  }: ConfigAwsFormContentProp) {
    return section(
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
          minLength: 16,
          maxLength: 128,
          required: true,
        })
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
