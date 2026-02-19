import ID from "../../../framework/meta/ID";
import Random from "../../../utils/Random";
import { Color } from "../style/Color";
import Style from "../style/Style";

export default class Component implements ID {
    protected _attributes: Map<string, string>;
    protected _children: Component[];
    protected _style: Style;
    protected _content?: string;

    // TODO! IMPORTANT!!!! SOME TAGS HAVE UNIQUE ATTRIBUTES, MAKE THE BUILD AND RENDER TO BE COMPONENT DEFINED AND CREATE A SIMPLE WAY TO IMPLEMENT SO USER CAN IMPLEMENT AS EASY AS POSSIBLE!!!
    constructor(protected _name: string, options?: ComponentOptions, protected id: string = Random.randomUUID()) {
        if (options) {
            this._children = options.children ?? [];
            this._attributes = options.attributes ?? new Map();
            this._content = options.content;
            this._style = options.style;
        } else {
            this._children = [];
            this._attributes = new Map();
            this._style = {};
        }
    }

    protected setAttrAndReturn(key: string, attr?: string): string | undefined {
        if (attr) this._attributes.set(key, attr);
        return this._attributes.get(key);
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

    public onBlur(attr?: string): string | undefined {
        return this.setAttrAndReturn(ATTR_ON_BLUR, attr);
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
    style: Style
}

export const ATTR_ACCESS_KEY: string = "accesskey";
export const ATTR_ALT: string = "alt";
export const ATTR_AUTO_COMPLETE: string = "autocomplete";
export const ATTR_AUTO_FOCUS: string = "autofocus";
export const ATTR_AUTO_PLAY: string = "autoplay";
export const ATTR_CITE: string = "cite";
export const ATTR_CLASS: string = "class";
export const ATTR_COLSPAN: string = "colspan";
export const ATTR_CONTENT_EDITABLE: string = "contenteditable";
export const ATTR_CONTROLS: string = "controls";
export const ATTR_DATE_TIME: string = "datetime";
export const ATTR_DIR: string = "dir";
export const ATTR_DIR_NAME: string = "dirname";
export const ATTR_DISASBLED: string = "disabled";
export const ATTR_DOWNLOAD: string = "download";
export const ATTR_DRAGGABLE: string = "draggable";
export const ATTR_ENTER_KEY_HINT: string = "enterkeyhint";
export const ATTR_FOR: string = "for";
export const ATTR_FORM: string = "form";
export const ATTR_FORMACTION: string = "formaction";
export const ATTR_HEADERS: string = "headers";
export const ATTR_HEIGHT: string = "height";
export const ATTR_HIDDEN: string = "hidden";
export const ATTR_HREF: string = "href";
export const ATTR_HREF_LANG: string = "hreflang";
export const ATTR_INERT: string = "inert";
export const ATTR_INPUT_MODE: string = "inputmode";
export const ATTR_LABEL: string = "label";
export const ATTR_LANG: string = "lang";
export const ATTR_LOOP: string = "loop";
export const ATTR_MAX: string = "max";
export const ATTR_MAX_LENGTH: string = "maxlength";
export const ATTR_MEDIA: string = "media";
export const ATTR_MIN: string = "min";
export const ATTR_MULTIPLE: string = "multiple";
export const ATTR_MUTED: string = "muted";
export const ATTR_NAME: string = "name";
export const ATTR_ON_ABORT: string = "onabort";
export const ATTR_ON_BLUR: string = "onblur";
