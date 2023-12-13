type DefaultDesignProps = import("./constants").DefaultDesignProps;

type ChildDom = import("@grucloud/bau").ChildDom;

export type Component<
  TProps extends Object,
  TElement = HTMLElement,
  TAction = {}
> = (
  props?: TProps & import("@grucloud/bau").PropsAll<TElement>,
  ...rest: readonly ChildDom[]
) => TElement & TAction;

type ComponentReturnedSimple =
  | TElement
  | string
  | number
  | boolean
  | bigint
  | null
  | undefined;

type ComponentReturned = ComponentReturnedSimple | ComponentReturnedSimple[];

export type ComponentWithProp<TProps, TElement = HTMLElement> = (
  props: TProps & import("@grucloud/bau").PropsAll<TElement>,
  ...rest: readonly ChildDom[]
) => ComponentReturned;

export type ComponentOneChild<TProps, TElement = HTMLElement> = (
  props: TProps & import("@grucloud/bau").PropsAll<TElement>,
  child: ChildDom
) => ComponentReturned;

export type ComponentGeneric = (
  props?: import("@grucloud/bau").Props<HTMLElement>,
  ...rest: readonly ChildDom[]
) => ComponentReturned;

export type ComponentOption = {
  class?: string;
} & DefaultDesignProps;
