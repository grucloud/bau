import { type Context } from "@grucloud/bau-ui/context";
import button from "@grucloud/bau-ui/button";

export default function (context: Context) {
  const { bau, css, config } = context;
  const { section, img } = bau.tags;

  const { socialAuth = [] } = config;

  const Button = button(context);

  const className = css`
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
  `;

  const socialAuthMap: any = {
    github: {
      label: "Log in with GitHub",
      href: "auth/github",
      src: "/login/github.svg#Capa_1",
      dataButtonLogin: "github",
    },
    facebook: {
      label: "Log in with Facebook",
      href: "auth/facebook",
      src: "/login/facebook.svg#Capa_1",
      dataButtonLogin: "facebook",
    },
    google: {
      label: "Log in with Google",
      href: "auth/google",
      src: "/login/google.svg#google",
      dataButtonLogin: "google",
    },
    gitlab: {
      label: "Log in with GitLab",
      href: "auth/gitlab",
      src: "/login/gitlab-logo.svg#Capa_1",
      dataButtonLogin: "gitlab",
    },
  };

  const SocialButton = ({ href, label, src, dataButtonLogin }: any) =>
    Button(
      {
        variant: "outline",
        color: "neutral",
        href: `${window.location.origin}${config.apiUrl}${href}`,
        "area-label": label,
        "data-button-login": dataButtonLogin,
      },
      img({
        src: `${config.base}${src}`,
        alt: dataButtonLogin,
        width: 28,
        height: 28,
      }),
      label
    );

  return function SocialLogin() {
    return section(
      {
        class: className,
      },
      socialAuth
        .filter((name: string) => socialAuthMap[name])
        .map((name: string) => SocialButton(socialAuthMap[name]))
    );
  };
}
