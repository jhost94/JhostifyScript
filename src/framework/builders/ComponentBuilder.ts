import Component from "../components/external/Component.js";
import InternalComponent from "../components/internal/InternalComponent.js";
import ElementVendor from "../requirements/ElementVendor.js";

export default class ComponentBuilder {

    constructor(private elementBuilder: ElementVendor) {}

    public build(component: Component): InternalComponent {
        const element = this.elementBuilder.createElement(component.getName());
        const components: InternalComponent[] = [];
        if (component.children() && component.children().length > 0) {
            components.push(...component.children().map(c => this.build(c)))
        }
        const content = component.content();
        const css = component.css();
        const color = component.color();
        const backgroundColor = component.backgroundColor();
        
        if (element instanceof HTMLElement) {
            const htmlElement = element as HTMLElement;
            if (content) htmlElement.innerText = content;
            if (color) htmlElement.style.color = color;
            if (backgroundColor) htmlElement.style.backgroundColor = backgroundColor;
        }
        return new InternalComponent(element, component.getName(), component.getId(), components);
    }
}
