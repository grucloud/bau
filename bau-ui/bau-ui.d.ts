type Props = import("@grucloud/bau").Props;
type ChildDom = import("@grucloud/bau").ChildDom;

export type Component<TProps, TElement = HTMLElement> = (
  props?: (TProps & Props) | ChildDom,
  ...rest: readonly ChildDom[]
) => TElement;

export type ComponentOneChild<TProps, TElement = HTMLElement> = (
  props: TProps & Props,
  child: ChildDom
) => TElement;

export type ComponentGeneric = (
  props?: Props,
  ...rest: readonly ChildDom[]
) => HTMLElement | string | number | boolean | bigint | null | undefined;
