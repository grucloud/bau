import { Context } from "@grucloud/bau-ui/context";
import alert from "@grucloud/bau-ui/alert";
import loadingButton from "@grucloud/bau-ui/loadingButton";
import isEmpty from "rubico/x/isEmpty";

export default (context: Context) => {
  const { css, bau } = context;
  const { section } = bau.tags;
  const Alert = alert(context, { size: "sm" });

  const LoadingButton = loadingButton(context, {
    variant: "solid",
    color: "primary",
  });

  const GitPersonalAccessCodeAlert = (authenticatedUserQuery: any) => {
    if (authenticatedUserQuery.error.val) {
      return Alert({ color: "danger" }, "Unauthorized, check your credentials");
    } else if (!isEmpty(authenticatedUserQuery.data.val)) {
      return Alert(
        { color: "success", variant: "outline" },
        "Authentication Successfull"
      );
    } else {
      return Alert(
        {
          class: css`
            visibility: hidden;
          `,
          color: "success",
          variant: "outline",
        },
        "1"
      );
    }
  };
  return function GitPersonalAccessCodeTest({
    onAuthenticated,
    authenticatedUserQuery,
  }: any) {
    console.assert(onAuthenticated);
    const testCredential = async (event: any) => {
      const form = event.target.closest("form");
      const { username, password } = form.elements;
      if (username.value && password.value) {
        await authenticatedUserQuery.run({ password: password.value });
        onAuthenticated();
      }
    };

    return section(
      LoadingButton(
        {
          type: "button",
          loading: authenticatedUserQuery.loading,
          onclick: testCredential,
        },
        "Test Credentials"
      ),
      GitPersonalAccessCodeAlert(authenticatedUserQuery)
    );
  };
};
