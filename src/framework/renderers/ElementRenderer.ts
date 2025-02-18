import Renderer from "./Renderer";


class ElementRenderer {
    private static re: Element;

    // might change to internal element
    public static render(element: Element, at: Element): void {
        Renderer.renderAt(element, at);
    }

    public static refresh(at: Element): void {
        Renderer.refreshAt(at);
    }

    public static rerender(element: Element, at: Element): void {
        Renderer.rerenderAt(element, at);
    }
}

export default ElementRenderer;