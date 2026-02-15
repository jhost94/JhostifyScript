import ID from "../../../framework/meta/ID";
import Random from "../../../utils/Random";
import { Color } from "./style/Color";

export default class Component implements ID{
    private _css: string | undefined;
    private _content: string | undefined;
    private _color: string | Color | undefined;
    private _backgroundColor: string | Color | undefined;
    private _children: Component[];

    constructor(protected name: string, options?: ComponentOptions, private id: string = Random.randomUUID()) {
        if (options) {
            this._children = options.children ?? [];
            this._css = options.css;
            this._content = options.content;
            this._color = options.color;
            this._backgroundColor = options.backgroundColor;
        } else {
            this._children = [];
        }
    }

    public css(css?: string): string | undefined {
        if (css) this._css = css;
        return this._css;
    }

    public content(content?: string): string | undefined {
        if (content) this._content = content;
        return this._content;
    }

    public color(color?: string | Color): string | Color | undefined {
        if (color) this._color = color;
        return this._color;
    }

    public backgroundColor(backgroundColor?: string | Color): string | Color | undefined {
        if (backgroundColor) this._backgroundColor = backgroundColor;
        return this._backgroundColor;
    }

    public children(children?: Component[]): Component[] {
        if (children) this._children = children;
        return this._children;
    }
    
    public getId(): string {
        return this.id;
    }

    public getName(): string {
        return this.name;
    }
}

export interface ComponentOptions {
    content: string | undefined;
    css: string | undefined;
    color: string | Color | undefined;
    backgroundColor: string | Color | undefined;
    children: Component[] | undefined;
}
