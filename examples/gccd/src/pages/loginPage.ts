import form from "@grucloud/bau-ui/form";
import input from "@grucloud/bau-ui/input";
import paper from "@grucloud/bau-ui/paper";
import loadingButton from "@grucloud/bau-ui/loadingButton";
import alert from "@grucloud/bau-ui/alert";

import { Context } from "@grucloud/bau-ui/context";

export default (context: Context) => {
  const { bau, css, config, stores } = context;
  const { section, h1, footer, header, label, img } = bau.tags;

  const LoadingButton = loadingButton(context);
  const Alert = alert(context, { variant: "outline", color: "danger" });
  const Input = input(context);
  const Form = form(context, {
    class: css`
      min-width: 350px;
      & > header {
        text-align: center;
        & h1 {
          line-height: 0;
          font-size: 1.3rem;
        }
      }
      & > footer {
        & button {
          flex-grow: 1;
        }
      }
    `,
  });
  const Paper = paper(context);

  return function LoginPage() {
    const loadingState = bau.state(false);
    const errorMessageState = bau.state("");

    const onsubmit = async (event: any) => {
      const { username, password } = event.target.elements;
      event.preventDefault();
      try {
        loadingState.val = true;
        const response = await fetch("/api/v1/auth/login", {
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
          console.log(json);
          stores.auth.setResult(json);
        } else if (response.status == 401) {
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
          h1("Login to Grucloud")
        ),
        section(
          () => errorMessageState.val && Alert(errorMessageState.val),
          label(
            "Email",
            Input({
              type: "email",
              autofocus: true,
              placeholder: "Email",
              name: "username",
              autocomplete: "username",
              required: true,
            })
          ),
          label(
            "Password",
            Input({
              type: "password",
              placeholder: "Password",
              name: "password",
              autocomplete: "current-password",
              minlength: "8",
              required: true,
            })
          )
        ),
        footer(
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
