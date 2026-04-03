import ID from "../../meta/ID";
import Css from "../external/Css";

/**
 * This is going to be an internal only class, outside of the user's responsabilites, this is going to be created internally
 */
export default class InternalComponent implements ID {

    constructor(private element: Element, private name: string, private id: string, private components: InternalComponent[] = [], private css: Css) {
        element.id = id;
    }

    public get(): Element {
        return this.element;
    }

    public getId(): string {
        return this.id;
    }

    public hasChildren(): boolean {
        return this.components.length > 0;
    }

    public children(): InternalComponent[] {
        return this.components;
    }

    public getCss(): Css {
        return this.css;
    }
}
