export default function BauCss(input?: {
  window?: Window;
  target?: HTMLElement;
}): {
  css: (
    tag: TemplateStringsArray,
    ...tagArgs: TagArgs
  ) => string;
  keyframes: (
    tag: TemplateStringsArray,
    ...tagArgs: TagArgs
  ) => string;
  createGlobalStyles: (
    tag: TemplateStringsArray,
    ...tagArgs: TagArgs
  ) => any;
};

type TagArgs = (string | number)[]
