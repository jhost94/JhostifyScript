import Component from "../../components/external/Component.js";
import ID from "../../../framework/meta/ID.js";
import Random from "../../../utils/Random.js";
import Css from "../../components/external/Css.js";
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
} from "../../constants/Attributes.js";

class Page implements ID {
    protected doOnRender: (() => void)[] = [];
    protected _attributes: Map<string, string>;

    constructor(
        protected name: string, 
        protected components: Component[] = [], 
        protected css: Css = new Css('', {isScss: false, isPage: true}),
        private id: string = Random.randomUUID()
    ) {
        this._attributes = new Map();
    }

    private setElementAttr(el: Element): Element {
        this._attributes.forEach((v, k) => {
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

    protected setAttrAndReturn(key: string, attr?: string): string | undefined {
        if (attr) this._attributes.set(key, attr);
        return this._attributes.get(key);
    }

    public build(el: Element): Element {
        el = this.setElementAttr(el);
        el = this.setElementEvent(el);
        return el;
    }

    public getComponents(): Component[] {
        return this.components;
    }

    public getName(): string {
        return this.name;
    }

    public getOnRender(): (() => void)[] {
        return this.doOnRender;
    }

    public getId(): string {
        return this.id;
    }

    public getCss(): Css {
        return this.css;
    }

    public getCssParsed(): string {
        return this.getCss().getCss();
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
}

export default Page;