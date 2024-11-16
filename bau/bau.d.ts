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
    readonly renderItem: RenderItem;
    readonly oldValues: any[];
  }) => (...args: readonly any[]) => HTMLElement | StatePrimitive;
  readonly renderItem?: typeof RenderItem;
}

export type BindAttributeFunc<TElement extends HTMLElement> = (input: {
  element: TElement;
}) => Primitive | Function;

type EventListener = (
  event:
    | InputEvent
    | SubmitEvent
    | Event
    | AnimationEvent
    | BeforeUnloadEvent
    | BlobEvent
    | ClipboardEvent
    | CloseEvent
    | CompositionEvent
    | DeviceMotionEvent
    | DeviceOrientationEvent
    | DragEvent
    | ErrorEvent
    | FocusEvent
    | FontFaceSetLoadEvent
    | FormDataEvent
    | GamepadEvent
    | HashChangeEvent
    | IDBVersionChangeEvent
    | InputEvent
    | KeyboardEvent
    | MessageEvent
    | MouseEvent
    | OfflineAudioCompletionEvent
    | PageTransitionEvent
    | PaymentRequestUpdateEvent
    | PointerEvent
    | PopStateEvent
    | ProgressEvent
    | RTCDataChannelEvent
    | RTCPeerConnectionIceEvent
    | StorageEvent
    | SubmitEvent
    | TouchEvent
    | TrackEvent
    | TransitionEvent
    | UIEvent
    | WebGLContextEvent
    | WheelEvent
) => any;

export type Props<TElement extends HTMLElement> = {
  readonly [key: string]:
    | PropValue
    | EventListener
    | StateView<PropValue>
    | BindAttributeFunc<TElement>
    | DerivedProp;
};

export type PropsHTMLElement<TElement extends HTMLElement> = {
  readonly [key in keyof TElement]?:
    | PropValue
    | StateView<PropValue>
    | BindAttributeFunc<TElement>;
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
  | PropsHTMLElement<TElement>
  | PropsLifecycle<TElement>
  | Props<TElement>
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

type Tags = Readonly<Record<string, TagFunc<Element>>> & {
  [K in keyof HTMLElementTagNameMap]: TagFunc<HTMLElementTagNameMap[K]>;
};

declare function state<T>(initVal: T): State<T>;
declare function tagsNS(namespaceURI: string): Tags;
declare function bind(input: BindInput): HTMLElement;
declare function derive<T>(computed: () => T): ReadonlyState<T>;
declare function loop<T, TElement extends HTMLElement>(
  stateArray: ReadonlyState<T[]>,
  container: TElement,
  renderItem: typeof RenderItem<T>
): TElement;
declare function batch(batchFn: () => void): void;

export type BauInstance = {
  tags: Tags;
  tagsNS: typeof tagsNS;
  state: typeof state;
  bind: typeof bind;
  derive: typeof derive;
  loop: typeof loop;
  batch: typeof batch;
};

export default function Bau(input?: { window?: Window }): BauInstance;

export function toPropsAndChildren(...args: any): any[];
