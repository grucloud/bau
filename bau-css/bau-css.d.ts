export default function BauCss(input?: {
  window?: Window;
  target?: HTMLElement;
}): {
  css: (any) => string;
  keyframes: (any) => string;
  createGlobalStyles: (any) => any;
};

export function classNames(...cn: string[]): string;
