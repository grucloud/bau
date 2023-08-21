export type Variant = "plain" | "outline" | "soft" | "solid";
export type Size = "sm" | "md" | "lg";
export type Color =
  | "primary"
  | "neutral"
  | "success"
  | "danger"
  | "warning"
  | "none";

export const Variants: Variant[];
export const Colors: Color[];
export const Sizes: Size[];

export type DefaultDesignProps = {
  variant?: Variant;
  size?: Size;
  color?: Color;
};
