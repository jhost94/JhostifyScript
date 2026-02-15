import Page from "../page/external/Page.js";
import InternalPage from "../page/internal/InternalPage.js";
import ElementVendor from "../requirements/ElementVendor.js";
import ComponentBuilder from "./ComponentBuilder.js";

class PageBuilder {
    constructor (private elementBuilder: ElementVendor, private componentBuilder: ComponentBuilder) {}

    public build(page: Page): InternalPage {
        const element: Element = this.elementBuilder.createElement(page.getName());
        const components = page.getComponents()
            .map(c => this.componentBuilder.build(c));
        return new InternalPage(element, page.getName(), components, page.getId(), page.getOnRender());
    }
}

export default PageBuilder;