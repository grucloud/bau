import { Context } from "@grucloud/bau-ui/context";
import button from "@grucloud/bau-ui/button";

export default (context: Context) => {
  const { bau, css, config } = context;
  const { section, div, h1 } = bau.tags;
  const { svg, use } = bau.tagsNS("http://www.w3.org/2000/svg");
  const Button = button(context, { variant: "outline", color: "primary" });

  return function CloudProviderSelection({ nextUrl, nextStep }: any) {
    return section(
      h1("Cloud Provider selection"),
      div(
        {
          class: css`
            display: flex;
            flex-direction: column;
            gap: 1rem;
            max-width: 300px;
          `,
        },
        Button(
          {
            "data-button-select-aws": true,
            href: nextUrl(nextStep.name, { provider_type: "AWS" }),
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
            href: nextUrl(nextStep.name, { provider_type: "Azure" }),
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
            href: nextUrl(nextStep.name, { provider_type: "Google" }),
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
