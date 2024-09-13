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
    | CustomEvent
    | DeviceMotionEvent
    | DeviceOrientationEvent
    | DragEvent
    | ErrorEvent
    | FetchEvent
    | FocusEvent
    | FontFaceSetLoadEvent
    | FormDataEvent
    | GamepadEvent
    | HashChangeEvent
    | HIDInputReportEvent
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
    | TimeEvent
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
  readonly [key in keyof TElement as key extends `on${string}` ? key : never]?: TElement[key]
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
  PropsHTMLElement<TElement> &
  (PropsLifecycle<TElement>
  | Props<TElement>
  | ChildDom);

export type BindElementFunc = (input?: {
  element: HTMLElement;
}) => HTMLElement | Primitive;

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

interface TagsBase {
  readonly [key: string]: TagFunc<HTMLElement>;
}

interface Tags extends TagsBase {
  // Register known element types
  // Source: https://developer.mozilla.org/en-US/docs/Web/HTML/Element

  // Main root
  readonly html: TagFunc<HTMLHtmlElement>;

  // Document metadata
  readonly base: TagFunc<HTMLBaseElement>;
  readonly head: TagFunc<HTMLHeadElement>;
  readonly link: TagFunc<HTMLLinkElement>;
  readonly meta: TagFunc<HTMLMetaElement>;
  readonly style: TagFunc<HTMLStyleElement>;
  readonly title: TagFunc<HTMLTitleElement>;

  // Sectioning root
  readonly body: TagFunc<HTMLBodyElement>;

  // Content sectioning
  readonly h1: TagFunc<HTMLHeadingElement>;
  readonly h2: TagFunc<HTMLHeadingElement>;
  readonly h3: TagFunc<HTMLHeadingElement>;
  readonly h4: TagFunc<HTMLHeadingElement>;
  readonly h5: TagFunc<HTMLHeadingElement>;
  readonly h6: TagFunc<HTMLHeadingElement>;

  // Text content
  readonly blockquote: TagFunc<HTMLQuoteElement>;
  readonly div: TagFunc<HTMLDivElement>;
  readonly dl: TagFunc<HTMLDListElement>;
  readonly hr: TagFunc<HTMLHRElement>;
  readonly li: TagFunc<HTMLLIElement>;
  readonly menu: TagFunc<HTMLMenuElement>;
  readonly ol: TagFunc<HTMLOListElement>;
  readonly p: TagFunc<HTMLParagraphElement>;
  readonly pre: TagFunc<HTMLPreElement>;
  readonly ul: TagFunc<HTMLUListElement>;

  // Inline text semantics
  readonly a: TagFunc<HTMLAnchorElement>;
  readonly br: TagFunc<HTMLBRElement>;
  readonly data: TagFunc<HTMLDataElement>;
  readonly q: TagFunc<HTMLQuoteElement>;
  readonly span: TagFunc<HTMLSpanElement>;
  readonly time: TagFunc<HTMLTimeElement>;

  // Image and multimedia
  readonly area: TagFunc<HTMLAreaElement>;
  readonly audio: TagFunc<HTMLAudioElement>;
  readonly img: TagFunc<HTMLImageElement>;
  readonly map: TagFunc<HTMLMapElement>;
  readonly track: TagFunc<HTMLTrackElement>;
  readonly video: TagFunc<HTMLVideoElement>;

  // Embedded content
  readonly embed: TagFunc<HTMLEmbedElement>;
  readonly iframe: TagFunc<HTMLIFrameElement>;
  readonly object: TagFunc<HTMLObjectElement>;
  readonly picture: TagFunc<HTMLPictureElement>;
  readonly source: TagFunc<HTMLSourceElement>;

  // Scripting
  readonly canvas: TagFunc<HTMLCanvasElement>;
  readonly script: TagFunc<HTMLScriptElement>;

  // Demarcating edits
  readonly del: TagFunc<HTMLModElement>;
  readonly ins: TagFunc<HTMLModElement>;

  // Table content
  readonly caption: TagFunc<HTMLTableCaptionElement>;
  readonly col: TagFunc<HTMLTableColElement>;
  readonly colgroup: TagFunc<HTMLTableColElement>;
  readonly table: TagFunc<HTMLTableElement>;
  readonly tbody: TagFunc<HTMLTableSectionElement>;
  readonly td: TagFunc<HTMLTableCellElement>;
  readonly tfoot: TagFunc<HTMLTableSectionElement>;
  readonly th: TagFunc<HTMLTableCellElement>;
  readonly thead: TagFunc<HTMLTableSectionElement>;
  readonly tr: TagFunc<HTMLTableRowElement>;

  // Forms
  readonly button: TagFunc<HTMLButtonElement>;
  readonly datalist: TagFunc<HTMLDataListElement>;
  readonly fieldset: TagFunc<HTMLFieldSetElement>;
  readonly form: TagFunc<HTMLFormElement>;
  readonly input: TagFunc<HTMLInputElement>;
  readonly label: TagFunc<HTMLLabelElement>;
  readonly legend: TagFunc<HTMLLegendElement>;
  readonly meter: TagFunc<HTMLMeterElement>;
  readonly optgroup: TagFunc<HTMLOptGroupElement>;
  readonly option: TagFunc<HTMLOptionElement>;
  readonly output: TagFunc<HTMLOutputElement>;
  readonly progress: TagFunc<HTMLProgressElement>;
  readonly select: TagFunc<HTMLSelectElement>;
  readonly textarea: TagFunc<HTMLTextAreaElement>;

  // Interactive elements
  readonly details: TagFunc<HTMLDetailsElement>;
  readonly dialog: TagFunc<HTMLDialogElement>;

  // Web Components
  readonly slot: TagFunc<HTMLSlotElement>;
  readonly template: TagFunc<HTMLTemplateElement>;
}

declare function state<T>(initVal: T): State<T>;
declare function tagsNS(namespaceURI: string): TagsBase;
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
