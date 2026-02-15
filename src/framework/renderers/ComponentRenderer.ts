import InternalComponent from "../components/internal/InternalComponent";
import Context from "../Context";
import Logger from "../debug/Logger";
import ID from "../meta/ID";
import Renderer from "./Renderer";

export default class ComponentRenderer {
    private static re: Element;

    public static render(component: InternalComponent, at?: ID): void {
        if (at) {
            const el = Context.elementBuilder().getElementById(at.getId());
            if (!el) throw `Component ${at} is given but not registered.`;
            Logger.log('DEBUG', ["Rendering component: ", component, " at: ", el]);
            Renderer.renderAt(component.get(), el);
        } else {
            Logger.log('DEBUG', ["Rendering component: ", component, " at: ", this.re]);
            Renderer.renderAt(component.get(), this.re);
        }

        if (component.hasChildren()) {
            component.children().forEach(c => ComponentRenderer.render(c, component));
        }
    }

    public static refresh(): void {
        Renderer.refreshAt(this.re);
    }

    public static rerender(component: InternalComponent): void {
        Renderer.rerenderAt(component.get(), this.re);
    }

    public static setRootElement(el: Element): Element {
        this.re = el;
        return this.re;
    }
}