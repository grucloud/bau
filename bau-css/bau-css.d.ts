export default function BauCss(input?: {
  document?: Document;
  target?: HTMLElement;
}): {
  css: (any) => string;
  keyframes: (any) => string;
  createGlobalStyles: (any) => any;
};

export function classNames(...cn: string[]): string;
