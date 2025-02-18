import Component from "../components/Component.js";
import InternalComponent from "../components/internal/InternalComponent.js";
import ElementVendor from "../requirements/ElementVendor.js";

class ComponentBuilder {

    constructor(private elementBuilder: ElementVendor) {}

    public build(component: Component): InternalComponent {
        const element: Element = this.elementBuilder.createElement(component.getName());
        const innerHTML = component.getTemplate(); //TODO: proccess the template into proper HTML
        element.innerHTML = innerHTML;
        return new InternalComponent(element, component.getName());
    }
}

export default ComponentBuilder;