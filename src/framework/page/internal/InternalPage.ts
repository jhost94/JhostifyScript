import ID from "../../meta/ID";
import InternalComponent from "../../components/internal/InternalComponent";
import InternalCss from "../../components/internal/InternalCss";

/**
 * This is going to be an internal only class, outside of the user's responsabilites, this is going to be created internally
 */
export default class InternalPage implements ID{
    constructor(
        private element: Element, 
        private name: string, 
        private components: InternalComponent[], 
        private id: string, 
        private doOnRender: (() => void)[] = [],
        private css?: InternalCss
    ) {
        element.id = id; //TODO: check if id exists or just override completely?
    }

    public get(): Element {
        return this.element;
    }

    public getComponents(): InternalComponent[] {
        return this.components;
    }

    public getOnRender(): (() => void)[] {
        return this.doOnRender;
    }

    public getId(): string {
        return this.id;
    }

    public getCss(): InternalCss | undefined {
        return this.css;
    }
}
