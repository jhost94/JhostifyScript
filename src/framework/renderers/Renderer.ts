
export default class Renderer {
    public static renderAt(element: Element, at: Element): void {
        at.appendChild(element);
    }

    public static rerenderAt(element: Element, at: Element): void {
        this.refreshAt(at);
        this.renderAt(element, at);
    }

    public static refreshAt(at: Element): void {
        const children = at.childNodes;
        children.forEach(e => at.removeChild(e));
    }
}
