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
    constructor(protected name: string, options?: ComponentOptions, protected id: string = Random.randomUUID()) {
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
        if (attr) this._attributes.set(ATTR_ACCESS_KEY, attr);
        return this._attributes.get(ATTR_ACCESS_KEY);
    }

    public cssClass(attr?: string): string | undefined {
        if (attr) this._attributes.set(ATTR_CLASS, attr);
        return this._attributes.get(ATTR_CLASS);
    }

    public contentEditable(attr?: string): string | undefined {
        if (attr) this._attributes.set(ATTR_CONTENT_EDITABLE, attr);
        return this._attributes.get(ATTR_CONTENT_EDITABLE);
    }
    
    public getId(): string {
        return this.id;
    }

    public getName(): string {
        return this.name;
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
