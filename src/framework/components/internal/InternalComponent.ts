/**
 * This is going to be an internal only class, outside of the user's responsabilites, this is going to be created internally
 */
export default class InternalComponent {
    constructor(private element: Element, private name: string, private id: string) {
        element.id = id;
    }

    public get(): Element {
        return this.element;
    }
}
