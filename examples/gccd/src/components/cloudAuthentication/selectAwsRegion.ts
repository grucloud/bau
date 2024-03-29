import { Context } from "@grucloud/bau-ui/context";
import select from "@grucloud/bau-ui/select";

import AwsRegions from "./awsRegion.json";

export default (context: Context) => {
  const { bau } = context;
  const { span } = bau.tags;

  const Select = select(context);

  const Option = (option: any) => span(option);

  return function SelectAwsRegion(props: any) {
    return Select({
      required: "required",
      title: "Select an AWS region",
      label: "Select region",
      oninvalid: (event: any) => {
        event.target.setCustomValidity("Please select an AWS region");
      },
      Option,
      defaultOption: props.value,
      options: AwsRegions,
      getOptionLabel: (label) => label,
      getOptionValue: (label) => label,
      ...props,
    });
  };
};
