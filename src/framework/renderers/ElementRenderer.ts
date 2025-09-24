import Component from "../components/external/Component";
import Context from "../Context";
import ID from "../meta/ID";
import Page from "../page/external/Page";
import Renderer from "./Renderer";

export default class ElementRenderer {
    private static re: Element;

    public static render(element: Element, at?: Component | Page | ID): void {
        console.log("at", at)
        if (at) {
            const el = Context.elementBuilder().getElementById(at.getId());
            if (!el) throw `Component ${at} is given but not registered.`;
            Renderer.renderAt(element, el);
        } else {
            Renderer.renderAt(element, this.re);
        }
    }

    public static refresh(): void {
        Renderer.refreshAt(this.re);
    }

    public static rerender(element: Element): void {
        Renderer.rerenderAt(element, this.re);
    }

    public static setRootElement(el: Element): Element {
        this.re = el;
        return this.re;
    }
}
