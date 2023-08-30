import button from "@grucloud/bau-ui/button";
import { Context } from "@grucloud/bau-ui/context";

export default (context: Context) => {
  const { bau, css, config } = context;
  const { section, div, h1 } = bau.tags;
  const { svg, use } = bau.tagsNS("http://www.w3.org/2000/svg");
  const Button = button(context);

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
            onclick: onclickProvider("AWS"),
            variant: "outline",
            color: "primary",
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
            onclick: onclickProvider("Azure"),
            variant: "outline",
            color: "primary",
          },
          svg(
            {
              width: 261,
              height: 90,
              viewBox: "0 0 261 75",
              fill: "currentColor",
            },
            use({ href: `${config.base}/azure.svg#azure` })
          )
        )
      )
    );
  };
};
