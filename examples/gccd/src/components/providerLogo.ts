import { type Context } from "@grucloud/bau-ui/context";

export default function (context: Context) {
  const { bau, css, config } = context;
  const { img } = bau.tags;

  const className = css`
    filter: grayscale(100%);
  `;
  type ProviderLogo = { providerName: string };

  return function ProviderLogo({ providerName }: ProviderLogo) {
    return img({
      class: className,
      height: 24,
      src: `${config.base}${providerName}.svg`,
      alt: providerName,
    });
  };
}
