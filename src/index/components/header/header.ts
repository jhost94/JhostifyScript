import Component from "../../../framework/components/Component.js";
import ElementVendor from "../../../framework/requirements/ElementVendor.js";
import Initializer from "src/framework/Initializer.js";
import InternalComponent from "src/framework/components/internal/InternalComponent.js";

function header(elementBuilder: ElementVendor): InternalComponent {
    const template = `
    <header>
        Header
    </header>
    `;

    const component = new Component('header', template);
    return Initializer.getComponentBuilder().build(component);
}

export default header