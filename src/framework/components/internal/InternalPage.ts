/**
 * This is going to be an internal only class, outside of the user's responsabilites, this is going to be created internally
 */
class InternalPage {
    constructor(private element: Element, private name: string) {
    }

    public get(): Element {
        return this.element;
    }
}

export default InternalPage;