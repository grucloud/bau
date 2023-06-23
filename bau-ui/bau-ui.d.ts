type Props = import("@grucloud/bau").Props;
type ChildDom = import("@grucloud/bau").ChildDom;

export type Component<TProps, TElement = HTMLElement> = (
  props?: (TProps & Props) | ChildDom,
  ...rest: readonly ChildDom[]
) => TElement;

export type ComponentWithProp<TProps, TElement = HTMLElement> = (
  props: (TProps & Props) | ChildDom,
  ...rest: readonly ChildDom[]
) => TElement | string | number | boolean | bigint | null | undefined;

export type ComponentOneChild<TProps, TElement = HTMLElement> = (
  props: TProps & Props,
  child: ChildDom
) => TElement;

export type ComponentGeneric = (
  props?: Props,
  ...rest: readonly ChildDom[]
) => HTMLElement | string | number | boolean | bigint | null | undefined;
