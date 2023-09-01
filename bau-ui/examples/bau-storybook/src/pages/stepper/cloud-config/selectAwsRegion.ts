import select from "@grucloud/bau-ui/select";

import { Context } from "@grucloud/bau-ui/context";

export default (context: Context) => {
  const { bau } = context;
  const { span } = bau.tags;

  const Select = select(context);

  const options: any = [
    "eu-north-1",
    "ap-south-1",
    "eu-west-3",
    "eu-west-2",
    "eu-west-1",
    "ap-northeast-3",
    "ap-northeast-2",
    "ap-northeast-1",
    "sa-east-1",
    "ca-central-1",
    "ap-southeast-1",
    "ap-southeast-2",
    "eu-central-1",
    "us-east-1",
    "us-east-2",
    "us-west-1",
    "us-west-2",
  ];

  const Option = (option: any) => span(option);

  return function SelectAwsRegion(props: any) {
    return Select({
      required: "required",
      title: "Select an AWS region",
      oninvalid: (event: any) => {
        event.target.setCustomValidity("Please select an AWS region");
      },
      Option,
      options,
      label: "Select region",
      getOptionLabel: (label) => label,
      ...props,
    });
  };
};
