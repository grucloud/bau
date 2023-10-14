import { type Context } from "@grucloud/bau-ui/context";
import chip from "@grucloud/bau-ui/chip";

const statusToColor = ({ status, error }: any) => {
  switch (status) {
    case "completed":
      return error ? "danger" : "success";
    default:
      return "warning";
  }
};

export default function (context: Context) {
  const Chip = chip(context, { size: "sm", variant: "solid" });

  return function RunStatus({ status, error }: any) {
    return Chip({ color: statusToColor({ status, error }) }, status);
  };
}
