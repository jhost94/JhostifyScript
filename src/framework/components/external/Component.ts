import { 
    ATTR_ACCESS_KEY,
    ATTR_CLASS,
    ATTR_CONTENT_EDITABLE,
    ATTR_DIR,
    ATTR_DRAGGABLE,
    ATTR_ENTER_KEY_HINT,
    ATTR_HIDDEN,
    ATTR_INERT,
    ATTR_INPUT_MODE, 
    ATTR_LANG,
    ATTR_POPOVER,
    ATTR_SPELL_CHECK,
    ATTR_STYLE,
    ATTR_TAB_INDEX,
    ATTR_TITLE,
    ATTR_TRANSLATE
} from "../../constants/Attributes";
import ID from "../../../framework/meta/ID";
import Random from "../../../utils/Random";
import Style from "../style/Style";
import { 
    EVENT_ON_BLUR, 
    EVENT_ON_CHANGE, 
    EVENT_ON_CLICK,
    EVENT_ON_CONTEXT_MENU,
    EVENT_ON_COPY,
    EVENT_ON_CUT,
    EVENT_ON_DOUBLE_CLICK,
    EVENT_ON_DRAG,
    EVENT_ON_DRAG_END,
    EVENT_ON_DRAG_ENTER,
    EVENT_ON_DRAG_LEAVE,
    EVENT_ON_DRAG_OVER,
    EVENT_ON_DRAG_START,
    EVENT_ON_DROP,
    EVENT_ON_FOCUS,
    EVENT_ON_INPUT,
    EVENT_ON_INVALID,
    EVENT_ON_KEY_DOWN,
    EVENT_ON_KEY_PRESS,
    EVENT_ON_KEY_UP,
    EVENT_ON_MOUSE_DOWN,
    EVENT_ON_MOUSE_MOVE,
    EVENT_ON_MOUSE_OUT,
    EVENT_ON_MOUSE_OVER,
    EVENT_ON_MOUSE_UP,
    EVENT_ON_MOUSE_WHEEL,
    EVENT_ON_PASTE,
    EVENT_ON_SCROLL,
    EVENT_ON_SELECT,
    EVENT_ON_WHEEL
} from "../../constants/OnEvents";
import { OnEventType } from "./OnEvent";
import Css from "../style/css/Css";
import ComponentRenderer from "../../renderers/ComponentRenderer";
import ObservableValue from "../../../utils/observable/ObservableValue";
import Context from "../../Context";
import ObservableList from "../../../utils/observable/ObservableList";

export default class Component implements ID {
    protected _attributes: ObservableValue<Map<string, string>>;
    protected _onEvents: ObservableValue<Map<OnEventType, (e: any) => {} | void>>;
    protected _children: ObservableList<Component>;
    protected _css: ObservableValue<Css>;
    protected _content: ObservableValue<string>;
    protected doBeforeRender: (() => void)[] = [];
    protected doOnRender: (() => void)[] = [];
    protected doAfterRender: (() => void)[] = [];

    // TODO! IMPORTANT!!!! SOME TAGS HAVE UNIQUE ATTRIBUTES, MAKE THE BUILD AND RENDER TO BE COMPONENT DEFINED AND CREATE A SIMPLE WAY TO IMPLEMENT SO USER CAN IMPLEMENT AS EASY AS POSSIBLE!!!
    constructor(protected _name: string, protected _parent?: ID, options?: ComponentOptions, protected id: string = Random.randomUUID()) {
        if (options) {
            this._children = ObservableList.fromList(options.children ?? []);
            this._attributes = ObservableValue.from(options.attributes ?? new Map());
            this._content =  ObservableValue.from(options.content ?? "");
            this._onEvents = ObservableValue.from(options.onEvents ?? new Map());
            this._css = ObservableValue.from(options.css ?? new Css(''));
        } else {
            this._children = ObservableList.fromList([] as Component[]);
            this._attributes = ObservableValue.from(new Map());
            this._onEvents = ObservableValue.from(new Map());
            this._css = ObservableValue.from(new Css(''));
            this._content =  ObservableValue.from("");
        }
        this.doAfterRender.push(() => this.doSubscriptions());
    }

    private setElementAttr(el: Element): Element {
        this._attributes.get().forEach((v, k) => {
            el.setAttribute(k, v);
        });

        return el;
    }

    //TODO: redo/fix this
    private setElementEvent(el: Element): Element {
        // const se = (scriptElement as HTMLElement);
        // let it = se.innerText;
        // this._onEvents.forEach((v, k) => {
        //     const fnName = k + this.getId();
        //     el.setAttribute(k, `${fnName}(event)`);
        //     it = `${it}
        //     function ${fnName}(e) {
        //         ${v}.call(this, e);
        //     }`;
        // });
        // se.innerText = it;
        // console.log(scriptElement)
        return el;
    }

    private doSubscriptions(): void {
        this._content.subscribe(_ => ComponentRenderer.renderExternalComponent(this, "content"));
        this._attributes.subscribe(_ => ComponentRenderer.renderExternalComponent(this, "attributes"));
        this._onEvents.subscribe(_ => ComponentRenderer.renderExternalComponent(this, "events"));
        this._css.subscribe(_ => ComponentRenderer.renderExternalComponent(this, "css"));
        this._children.subscribe(cs => cs.forEach(c => ComponentRenderer.renderExternalComponent(c, "all")));
    }

    protected setAttrAndReturn(key: string, attr?: string): string | undefined {
        if (attr) {
            this._attributes.get().set(key, attr);
            this._attributes.notify();
        }
        return this._attributes.get().get(key);
    }

    protected setEvent(key: OnEventType, ev: (e: any) => {} | void): void {
        this._onEvents.get().set(key, ev);
        this._onEvents.notify();
    }

    protected uniqueCssClass(className: string): string {
        return `${className}_${this.getId()}`;
    }

    public build(el: Element): Element {
        el = this.setElementAttr(el);
        el = this.setElementEvent(el);
        return el;
    }

    public getOnRender(): (() => void)[] {
        return this.doOnRender;
    }

    public getBeforeRender(): (() => void)[] {
        return this.doBeforeRender;
    }

    public getAfterRender(): (() => void)[] {
        return this.doAfterRender;
    }

    public content(content?: string): string | undefined {
        if (content) this._content.set(content);
        return this._content.get();
    }

    public children(children?: Component[]): ObservableList<Component> {
        if (children) this._children.set(children);
        return this._children;
    }

    public accessKey(attr?: string): string | undefined {
        return this.setAttrAndReturn(ATTR_ACCESS_KEY, attr);
    }

    public cssClass(attr?: string): string | undefined {
        return this.setAttrAndReturn(ATTR_CLASS, attr);
    }

    public css(css?: Css): Css {
        if (css) {
            this._css.set(css);
        }
        return this._css.get();
    }

    public contentEditable(attr?: string): string | undefined {
        return this.setAttrAndReturn(ATTR_CONTENT_EDITABLE, attr);
    }

    public dir(attr?: string): string | undefined {
        return this.setAttrAndReturn(ATTR_DIR, attr);
    }

    public draggable(attr?: string): string | undefined {
        return this.setAttrAndReturn(ATTR_DRAGGABLE, attr);
    }

    public enterKeyHint(attr?: string): string | undefined {
        return this.setAttrAndReturn(ATTR_ENTER_KEY_HINT, attr);
    }

    public hidden(attr?: string): string | undefined {
        return this.setAttrAndReturn(ATTR_HIDDEN, attr);
    }

    public inert(attr?: string): string | undefined {
        return this.setAttrAndReturn(ATTR_INERT, attr);
    }

    public inputMode(attr?: string): string | undefined {
        return this.setAttrAndReturn(ATTR_INPUT_MODE, attr);
    }
    
    public lang(attr?: string): string | undefined {
        return this.setAttrAndReturn(ATTR_LANG, attr);
    }

    public popover(attr?: string): string | undefined {
        return this.setAttrAndReturn(ATTR_POPOVER, attr);
    }

    public spellcheck(attr?: string): string | undefined {
        return this.setAttrAndReturn(ATTR_SPELL_CHECK, attr);
    }

    public style(attr?: Style | string): string | undefined {
        if (!!attr && typeof attr === 'object') {
            const str = Object.entries(attr)
                .map(kv => `${kv[0]}: ${kv[1]}`)
                .reduce((acc, cur) => `${acc} ${cur}`);
            return this.setAttrAndReturn(ATTR_STYLE, str);
        }
        return this.setAttrAndReturn(ATTR_STYLE, attr)
    }

    public tabIndex(attr?: string): string | undefined {
        return this.setAttrAndReturn(ATTR_TAB_INDEX, attr);
    }

    public title(attr?: string): string | undefined {
        return this.setAttrAndReturn(ATTR_TITLE, attr);
    }

    public translate(attr?: string): string | undefined {
        return this.setAttrAndReturn(ATTR_TRANSLATE, attr);
    }

    public onBlur(action: (e: any) => void): void {
        this.setEvent(EVENT_ON_BLUR, action);
    }

    public onChange(action: (e: any) => void): void {
        this.setEvent(EVENT_ON_CHANGE, action);
    }

    public onClick(action: (e: any) => void): void {
        this.setEvent(EVENT_ON_CLICK, action);
    }

    public onContextMenu(action: (e: any) => void): void {
        this.setEvent(EVENT_ON_CONTEXT_MENU, action);
    }

    public onCopy(action: (e: any) => void): void {
        this.setEvent(EVENT_ON_COPY, action);
    }

    public onCut(action: (e: any) => void): void {
        this.setEvent(EVENT_ON_CUT, action);
    }

    public onDoubleClick(action: (e: any) => void): void {
        this.setEvent(EVENT_ON_DOUBLE_CLICK, action);
    }

    public onDblClick(action: (e: any) => void): void {
        this.onDoubleClick(action);
    }

    public onDrag(action: (e: any) => void): void {
        this.setEvent(EVENT_ON_DRAG, action);
    }

    public onDragEnd(action: (e: any) => void): void {
        this.setEvent(EVENT_ON_DRAG_END, action);
    }

    public onDragEnter(action: (e: any) => void): void {
        this.setEvent(EVENT_ON_DRAG_ENTER, action);
    }

    public onDragLeave(action: (e: any) => void): void {
        this.setEvent(EVENT_ON_DRAG_LEAVE, action);
    }

    public onDragOver(action: (e: any) => void): void {
        this.setEvent(EVENT_ON_DRAG_OVER, action);
    }

    public onDragStart(action: (e: any) => void): void {
        this.setEvent(EVENT_ON_DRAG_START, action);
    }

    public onDrop(action: (e: any) => void): void {
        this.setEvent(EVENT_ON_DROP, action);
    }

    public onFocus(action: (e: any) => void): void {
        this.setEvent(EVENT_ON_FOCUS, action);
    }

    public onInput(action: (e: any) => void): void {
        this.setEvent(EVENT_ON_INPUT, action);
    }

    public onInvalid(action: (e: any) => void): void {
        this.setEvent(EVENT_ON_INVALID, action);
    }

    public onKeyDown(action: (e: any) => void): void {
        this.setEvent(EVENT_ON_KEY_DOWN, action);
    }

    public onKeyPress(action: (e: any) => void): void {
        this.setEvent(EVENT_ON_KEY_PRESS, action);
    }

    public onKeyUp(action: (e: any) => void): void {
        this.setEvent(EVENT_ON_KEY_UP, action);
    }

    public onMouseDown(action: (e: any) => void): void {
        this.setEvent(EVENT_ON_MOUSE_DOWN, action);
    }

    public onMouseMove(action: (e: any) => void): void {
        this.setEvent(EVENT_ON_MOUSE_MOVE, action);
    }

    public onMouseOut(action: (e: any) => void): void {
        this.setEvent(EVENT_ON_MOUSE_OUT, action);
    }

    public onMouseOver(action: (e: any) => void): void {
        this.setEvent(EVENT_ON_MOUSE_OVER, action);
    }

    public onMouseUp(action: (e: any) => void): void {
        this.setEvent(EVENT_ON_MOUSE_UP, action);
    }

    public onMouseWheel(action: (e: any) => void): void {
        this.setEvent(EVENT_ON_MOUSE_WHEEL, action);
    }

    public onPaste(action: (e: any) => void): void {
        this.setEvent(EVENT_ON_PASTE, action);
    }

    public onScroll(action: (e: any) => void): void {
        this.setEvent(EVENT_ON_SCROLL, action);
    }

    public onSelect(action: (e: any) => void): void {
        this.setEvent(EVENT_ON_SELECT, action);
    }

    public onWheel(action: (e: any) => void): void {
        this.setEvent(EVENT_ON_WHEEL, action);
    }
    
    public getId(): string {
        return this.id;
    }

    public getParent(): ID | undefined {
        return this._parent;
    }

    public getName(): string {
        return this._name;
    }

    public getOnEvents(): Map<OnEventType, (e: any) => void> {
        return this._onEvents.get();
    }

    public async loadChildrenAsync(body: Promise<any> | Promise<[any]>, 
                                    mapper: (b: any) => Component, 
                                    showLoading: boolean = false, 
                                    loadingBody?: Component | any): Promise<void> {
        if (showLoading) {
            if (!loadingBody) throw "If showLoading is set to true, loadingBody is required";
            if (loadingBody instanceof Component) {
                this.children([loadingBody]);
            } else {
                this.children([mapper(loadingBody)]);
            }
        }

        const cb = await body;
        if (Array.isArray(cb)) {
            this.children(cb.map((c: any) => mapper(c)));
        } else {
            this.children([mapper(cb)]);
        }
        ComponentRenderer.renderChildren(this);
    }
}

export interface ComponentOptions {
    content?: string;
    attributes?: Map<string, string>;
    children?: Component[];
    style?: Style;
    css?: Css;
    onEvents: Map<OnEventType, (e: any) => void>
}
