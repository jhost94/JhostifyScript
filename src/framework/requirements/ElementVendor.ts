export default interface ElementVendor {
    createElement(name: string, options?: any): Element;
    getElementById(elementId: string): HTMLElement | null;
}
