declare module "@grucloud/bau-ui/globalStyle" {
  type HSL = {
    h: string;
    s: string;
    l: string;
  };
  export type ColorDefs = [name: any, hsl: HSL];

  type StyleOption = {
    colorPalette: ColorDefs[];
  };

  export default function (context: any, option?: StyleOption): void;
}
