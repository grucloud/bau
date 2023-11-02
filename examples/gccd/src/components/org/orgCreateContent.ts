import { type Context } from "@grucloud/bau-ui/context";
import input from "@grucloud/bau-ui/input";

export const orgFormDataToPayload = (event: any) => {
  const { org_id } = event.target.elements;
  return {
    org_id: org_id.value,
  };
};

export default function (context: Context) {
  const { bau } = context;
  const { section, label } = bau.tags;
  const Input = input(context);

  return function OrgCreateContent({}) {
    return section(
      label(
        "Organisation",
        Input({
          autofocus: true,
          placeholder: "Organisation",
          name: "org_id",
          minLength: 1,
          maxLength: 24,
          required: true,
        })
      )
    );
  };
}
