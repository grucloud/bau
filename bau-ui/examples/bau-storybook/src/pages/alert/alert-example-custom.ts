import alert from "@grucloud/bau-ui/alert";
import { Context } from "@grucloud/bau-ui/context";

export default (context: Context) => {
  const { css } = context;

  const Alert = alert(context, {
    class: css`
      &.alert {
        border: 3px dotted !important;
        height: 80px;
      }
    `,
  });

  return () =>
    Alert({ color: "warning" }, "Your coffee supply is getting low.");
};
