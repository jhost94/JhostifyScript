export default interface ElementVendor {
    createElement(name: string, options?: ElementCreationOptions): Element;
    getElementById(elementId: string): HTMLElement | null;
    getElementsByTagName(qualifiedName: string): HTMLCollectionOf<Element>;
}
