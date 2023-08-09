type ChildDom = import("@grucloud/bau").ChildDom;

export type Component<
  TProps extends Object,
  TElement = HTMLElement,
  TAction
> = (
  props?: (TProps & import("@grucloud/bau").Props<TElement>) | ChildDom,
  ...rest: readonly ChildDom[]
) => TElement & TAction;

export type ComponentWithProp<TProps, TElement = HTMLElement> = (
  props: (TProps & import("@grucloud/bau").Props<TElement>) | ChildDom,
  ...rest: readonly ChildDom[]
) => TElement | string | number | boolean | bigint | null | undefined;

export type ComponentOneChild<TProps, TElement = HTMLElement> = (
  props: TProps & import("@grucloud/bau").Props<TElement>,
  child: ChildDom
) => TElement;

export type ComponentGeneric = (
  props?: import("@grucloud/bau").Props<HTMLElementHTMLElement>,
  ...rest: readonly ChildDom[]
) => HTMLElement | string | number | boolean | bigint | null | undefined;
