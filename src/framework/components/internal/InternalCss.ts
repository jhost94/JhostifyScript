
export default class Css {

    constructor(
        private internalElement: Element
    ) {
    }

    public get(): Element {
        return this.internalElement;
    }
}