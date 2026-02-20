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
import { Color } from "../style/Color";
import Style from "../style/Style";
import { 
    EVENT_ON_BLUR 
} from "../../constants/OnEvents";

export default class Component implements ID {
    protected _attributes: Map<string, string>;
    protected _onEvents: Map<string, (e: any) => void>;
    protected _children: Component[];
    protected _style: Style;
    protected _content?: string;

    // TODO! IMPORTANT!!!! SOME TAGS HAVE UNIQUE ATTRIBUTES, MAKE THE BUILD AND RENDER TO BE COMPONENT DEFINED AND CREATE A SIMPLE WAY TO IMPLEMENT SO USER CAN IMPLEMENT AS EASY AS POSSIBLE!!!
    constructor(protected _name: string, options?: ComponentOptions, protected id: string = Random.randomUUID()) {
        if (options) {
            this._children = options.children ?? [];
            this._attributes = options.attributes ?? new Map();
            this._content = options.content;
            this._style = options.style ?? {};
            this._onEvents = options.onEvents ?? new Map();
        } else {
            this._children = [];
            this._attributes = new Map();
            this._style = {};
            this._onEvents = new Map();
        }
    }

    private setElementAttr(el: Element): Element {
        this._attributes.forEach((v, k) => {
            el.setAttribute(k, v);
        });

        return el;
    }

    //TODO: redo/fix this
    private setElementEvent(el: Element, scriptElement: Element): Element {
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

    protected setAttrAndReturn(key: string, attr?: string): string | undefined {
        if (attr) this._attributes.set(key, attr);
        return this._attributes.get(key);
    }

    public build(el: Element, scriptElement: Element): Element {
        el = this.setElementAttr(el);
        el = this.setElementEvent(el, scriptElement);
        return el;
    }

    public content(content?: string): string | undefined {
        if (content) this._content = content;
        return this._content;
    }

    public color(color?: string): string | undefined {
        if (color) this._style.color = color;
        return this._style.color;
    }

    public backgroundColor(backgroundColor?: string | Color): string | undefined {
        if (backgroundColor) this._style.backgroundColor = backgroundColor;
        return this._style.backgroundColor;
    }

    public children(children?: Component[]): Component[] {
        if (children) this._children = children;
        return this._children;
    }

    public accessKey(attr?: string): string | undefined {
        return this.setAttrAndReturn(ATTR_ACCESS_KEY, attr);
    }

    public cssClass(attr?: string): string | undefined {
        return this.setAttrAndReturn(ATTR_CLASS, attr);
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

    public style(attr?: string): string | undefined {
        return this.setAttrAndReturn(ATTR_STYLE, attr);
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
    
    public getId(): string {
        return this.id;
    }

    public getName(): string {
        return this._name;
    }
}

export interface ComponentOptions {
    content?: string;
    attributes?: Map<string, string>;
    children?: Component[];
    style?: Style;
    onEvents: Map<string, (e: any) => void>
}
