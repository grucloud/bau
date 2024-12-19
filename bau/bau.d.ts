export type State<T> = {
  val: T;
};

export type ReadonlyState<T> = Readonly<State<T>>;

export interface StateView<T> {
  readonly val: T;
}

export type Primitive = string | number | boolean | bigint | null | undefined;

export type StatePrimitive = Primitive | object;

export type StateValue = StatePrimitive | StatePrimitive[];

export type Deps = ReadonlyState<StateValue>[];

export type PropValue = StatePrimitive | Function | null | undefined;

export interface DerivedProp {
  readonly deps: Deps;
  readonly renderProp: (input: { element: HTMLElement }) => PropValue;
}

declare function RenderItem<T = any>(
  item: T,
  index?: number
): HTMLElement | StatePrimitive;

export interface BindInput {
  readonly deps: Deps;
  readonly render: (input: {
    element: HTMLElement;
    readonly renderItem: typeof RenderItem;
    readonly oldValues: any[];
  }) => (...args: readonly any[]) => HTMLElement | StatePrimitive;
  readonly renderItem?: typeof RenderItem;
}

export type BindAttributeFunc<TElement extends HTMLElement> = (input: {
  element: TElement;
}) => Primitive | Function;

export type Props<TElement extends HTMLElement> = {
  readonly [key: string]:
    | PropValue
    | StateView<PropValue>
    | BindAttributeFunc<TElement>
    | DerivedProp;
};

// This helper will replace the Event parameter of an event handler
// with something else (technically it takes the union of the Event and ReplaceWith)
type ReplaceEventHandlerParameter<EventHandler, ReplaceWith> =
  EventHandler extends (...args: infer Params) => infer R
  ? (...args: {[K in keyof Params]: Params[K] extends Event ? Params[K] & ReplaceWith : Params[K]}) => R
  : never;

export type PropsHTMLElement<TElement extends HTMLElement> = {
  readonly [
    key in keyof TElement as key extends `on${string}`
    ? key
    : never
  ]?: key extends 'oninput'
    // we use InputEvent for 'oninput'
    // this is not 100% type correct, but it is convenient and backwards compatible
    ? ReplaceEventHandlerParameter<ReplaceEventHandlerParameter<TElement[key], { target: TElement}>, InputEvent>
    // for all other events (and also for oninput) we set the target to TElement
    : ReplaceEventHandlerParameter<TElement[key], { target: TElement}>
};

export type PropsLifecycle<TElement extends HTMLElement> = {
  bauCreated: (input: { element: TElement }) => void;
  bauMounted: (input: { element: TElement }) => void;
  bauUnmounted: (input: { element: TElement }) => void;
  bauChildMutated: (input: {
    element: TElement;
    record: MutationRecord;
  }) => void;
};

export type PropsAll<TElement extends HTMLElement> =
  PropsLifecycle<TElement>
  | (Props<TElement> & PropsHTMLElement<TElement>)
  | ChildDom;

export type BindElementFunc = (input?: {
  element: HTMLElement;
}) => HTMLElement | Primitive | (HTMLElement | Primitive)[];

export type ChildDom =
  | Primitive
  | Node
  | StateView<Primitive | null | undefined>
  | readonly ChildDom[]
  | null
  | undefined
  | BindElementFunc;

export type TagFunc<Result extends HTMLElement> = (
  props?: PropsAll<Result>,
  ...rest: readonly ChildDom[]
) => Result;

type Tags = Readonly<Record<string, TagFunc<HTMLElement>>> & {
  [K in keyof HTMLElementTagNameMap]: TagFunc<HTMLElementTagNameMap[K]>;
};

type StateOptions<T> = {
  name?: string;
  onUpdate?: (oldVal: T, newVal: T) => void;
};

declare function state<T>(initVal?: T, options?: StateOptions<T>): State<T>;
declare function tagsNS(namespaceURI: string): Tags;
declare function bind(input: BindInput): HTMLElement;
declare function derive<T>(
  computed: () => T,
  options?: StateOptions<T>
): ReadonlyState<T>;

declare function loop<T, TElement extends HTMLElement>(
  stateArray: ReadonlyState<T[]>,
  container: TElement,
  renderItem: typeof RenderItem<T>
): TElement;

export type BauInstance = {
  tags: Tags;
  tagsNS: typeof tagsNS;
  state: typeof state;
  bind: typeof bind;
  derive: typeof derive;
  loop: typeof loop;
};

export default function Bau(input?: { window?: Window }): BauInstance;

export function toPropsAndChildren(...args: any): any[];
