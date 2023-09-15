import button from "@grucloud/bau-ui/button";
import { Context } from "@grucloud/bau-ui/context";

export default (context: Context) => {
  const { bau, css, config } = context;
  const { section, div, h1 } = bau.tags;
  const { svg, use } = bau.tagsNS("http://www.w3.org/2000/svg");
  const Button = button(context, { variant: "outline", color: "primary" });

  return function ProviderSelection({ onclickProvider }: any) {
    return section(
      h1("Provider selection"),
      div(
        {
          class: css`
            display: flex;
            flex-direction: column;
            gap: 1rem;
          `,
        },
        Button(
          {
            "data-button-select-aws": true,
            onclick: onclickProvider("AWS"),
          },
          svg(
            {
              width: 118,
              height: 90,
              viewBox: "0 0 118 70",
              fill: "currentColor",
            },
            use({ href: `${config.base}/aws.svg#aws` })
          )
        ),
        Button(
          {
            "data-button-select-azure": true,
            onclick: onclickProvider("Azure"),
          },
          svg(
            {
              width: 261,
              height: 90,
              fill: "currentColor",
            },
            use({ href: `${config.base}/azure.svg#azure` })
          )
        ),
        Button(
          {
            "data-button-select-google": true,
            onclick: onclickProvider("Google"),
          },
          svg(
            {
              width: 300,
              height: 90,
              viewBox: "0 0 473 75",
              fill: "currentColor",
            },
            use({ href: `${config.base}/google.svg#gcp` })
          )
        )
      )
    );
  };
};
