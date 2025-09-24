/**
 * This is going to be an internal only class, outside of the user's responsabilites, this is going to be created internally
 */
class InternalPage {
    constructor(private element: Element, private name: string, private id: string, private doOnRender: (() => void)[] = []) {
        element.id = id; //TODO: check if id exists or just override completely?
    }

    public get(): Element {
        return this.element;
    }

    public getOnRender(): (() => void)[] {
        return this.doOnRender;
    }
}

export default InternalPage;