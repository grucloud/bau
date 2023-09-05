import { type Context } from "@grucloud/bau-ui/context";

type ProviderLogoProps = { providerName: string };

export default function (context: Context) {
  const { bau, css, config } = context;
  const { img } = bau.tags;

  const className = css`
    filter: grayscale(100%);
    vertical-align: middle;
  `;

  return function ProviderLogo({ providerName }: ProviderLogoProps) {
    return img({
      class: className,
      height: 24,
      src: `${config.base}/${providerName}.svg`,
      alt: providerName,
    });
  };
}
