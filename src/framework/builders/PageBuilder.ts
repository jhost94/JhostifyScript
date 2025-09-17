import Page from "../components/Page.js";
import InternalPage from "../components/internal/InternalPage.js";
import ElementVendor from "../requirements/ElementVendor.js";

class PageBuilder {
    constructor (private elementBuilder: ElementVendor) {}

    public build(page: Page): InternalPage {
        const element: Element = this.elementBuilder.createElement(page.getName());
        const innerHTML = page.getTemplate(); //TODO: proccess the template into proper HTML
        element.innerHTML = innerHTML;
        return new InternalPage(element, page.getName(), page.getOnRender());
    }
}

export default PageBuilder;