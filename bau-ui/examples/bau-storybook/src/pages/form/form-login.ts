import form from "@grucloud/bau-ui/form";
import input from "@grucloud/bau-ui/input";
import paper from "@grucloud/bau-ui/paper";
import loadingButton from "@grucloud/bau-ui/loadingButton";
import alert from "@grucloud/bau-ui/alert";

import { Context } from "@grucloud/bau-ui/context";

export default (context: Context) => {
  const { bau, css, config } = context;
  const { section, h1, header, label, img } = bau.tags;

  const LoadingButton = loadingButton(context);
  const Alert = alert(context, { variant: "outline", color: "danger" });
  const Input = input(context);
  const Form = form(context, {
    class: css`
      align-items: center;
      & > header {
        text-align: center;
      }
    `,
  });
  const Paper = paper(context, {
    class: css`
      max-width: 400px;
    `,
  });

  return function LoginForm() {
    const dataState = bau.state("");
    const loadingState = bau.state(false);
    const errorMessageState = bau.state("");

    const onsubmit = async (event: any) => {
      const { username, password } = event.target.elements;
      event.preventDefault();
      try {
        loadingState.val = true;
        const response = await fetch("/auth/login", {
          method: "post",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            username: username.value,
            password: password.value,
          }),
        });
        if (response.ok) {
          const json = await response.json();
          dataState.val = json;
        } else if (response.status == 422) {
          errorMessageState.val = "Invalid username or password";
        } else {
          errorMessageState.val = response.statusText;
        }
      } catch (error: any) {
        errorMessageState.val = error.message;
      } finally {
        loadingState.val = false;
      }
    };

    return Paper(
      Form(
        { onsubmit },
        header(
          img({ width: "100", src: `${config.base}/gc.svg` }),
          h1("Login")
        ),
        section(
          () => errorMessageState.val && Alert(errorMessageState.val),
          label(
            "Username",
            Input({
              autofocus: true,
              placeholder: "Username",
              name: "username",
              pattern: String.raw`\w{3,64}`,
              title: "Length should be greater than 3 and below 64 characters",
              required: true,
            })
          ),
          label(
            "Password",
            Input({
              type: "password",
              placeholder: "Password",
              name: "password",
              pattern: String.raw`\w{8,128}`,
              title: "Length should be greater than 8 and below 128 characters",
              required: true,
            })
          ),
          LoadingButton(
            {
              type: "submit",
              variant: "solid",
              color: "primary",
              loading: loadingState,
            },
            "Login"
          )
        )
      )
    );
  };
};
