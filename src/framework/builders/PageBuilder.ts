import InternalCss from "../components/internal/InternalCss.js";
import Page from "../page/external/Page.js";
import InternalPage from "../page/internal/InternalPage.js";
import ElementVendor from "../requirements/ElementVendor.js";
import ComponentBuilder from "./ComponentBuilder.js";

class PageBuilder {
    constructor (private elementBuilder: ElementVendor, private componentBuilder: ComponentBuilder) {}

    public build(page: Page): InternalPage {
        const element: Element = page.build(this.elementBuilder.createElement(page.getName()));
        let cssParsed = page.getCssParsed();
        const components = page.children().get()
            .map(c => {
                const ic = this.componentBuilder.build(c);
                cssParsed += ic.getCss().getCss(true);
                return ic;
            });
        const css = this.elementBuilder.createElement("style");
        (css as HTMLElement).innerText = cssParsed;
        return new InternalPage(element, 
                                page.getName(), 
                                page.getId(), 
                                new InternalCss(css),
                                components, 
                                page.css(), 
                                page.getOnEvents(), 
                                page.getOnRender(), 
                                page.getBeforeRender(), 
                                page.getAfterRender());
    }
}

export default PageBuilder;