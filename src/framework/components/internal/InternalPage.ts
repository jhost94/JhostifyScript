/**
 * This is going to be an internal only class, outside of the user's responsabilites, this is going to be created internally
 */
class InternalPage {
    constructor(private element: Element, private name: string, private doOnRender: (() => void)[] = []) {
    }

    public get(): Element {
        return this.element;
    }

    public getOnRender(): (() => void)[] {
        return this.doOnRender;
    }
}

export default InternalPage;