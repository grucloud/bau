import { Context } from "@grucloud/bau-ui/context";

import form from "@grucloud/bau-ui/form";
import input from "@grucloud/bau-ui/input";
import paper from "@grucloud/bau-ui/paper";
import loadingButton from "@grucloud/bau-ui/loadingButton";
import alert from "@grucloud/bau-ui/alert";
import divider from "@grucloud/bau-ui/divider";

import socialLogin from "../components/socialLogin";

export default (context: Context) => {
  const { bau, css, config, stores } = context;
  const { section, h1, footer, header, label, img } = bau.tags;
  const Divider = divider(context);

  const LoadingButton = loadingButton(context);
  const Alert = alert(context, { variant: "outline", color: "danger" });
  const Input = input(context);
  const Form = form(context, {
    class: css`
      & > header {
        text-align: center;
      }
      & > footer {
        & button {
          flex-grow: 1;
        }
      }
    `,
  });
  const Paper = paper(context);

  const SocialLogin = socialLogin(context);

  return function LoginPage() {
    const loadingState = bau.state(false);
    const errorMessageState = bau.state("");

    const onsubmit = async (event: any) => {
      const { email, password } = event.target.elements;
      event.preventDefault();
      try {
        loadingState.val = true;
        const response = await fetch("/api/v1/auth/login", {
          method: "post",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: email.value,
            password: password.value,
          }),
        });
        if (response.ok) {
          const json = await response.json();
          console.log(json);
          stores.auth.setResult(json);
        } else if (response.status == 401) {
          errorMessageState.val = "Invalid email or password";
        } else {
          errorMessageState.val = response.statusText;
        }
      } catch (error: any) {
        errorMessageState.val = error.message;
      } finally {
        loadingState.val = false;
      }
    };

    const LocalAuth = () => [
      Divider("OR"),
      section(
        () => errorMessageState.val && Alert(errorMessageState.val),
        label(
          "Email",
          Input({
            type: "email",
            autofocus: true,
            placeholder: "Email",
            name: "email",
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
      ),
    ];

    return Paper(
      Form(
        { onsubmit },
        header(
          img({ width: "100", src: `${config.base}/gc.svg`, alt: "GruCloud" }),
          h1("Log in to Grucloud")
        ),
        SocialLogin(),
        !config.disableUsernamePasswordAuth && LocalAuth()
      )
    );
  };
};
