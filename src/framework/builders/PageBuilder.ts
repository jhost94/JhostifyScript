import Page from "../page/external/Page.js";
import InternalPage from "../page/internal/InternalPage.js";
import InternalCss from "../components/internal/InternalCss.js";
import ElementVendor from "../requirements/ElementVendor.js";
import ComponentBuilder from "./ComponentBuilder.js";

class PageBuilder {
    constructor (private elementBuilder: ElementVendor, private componentBuilder: ComponentBuilder) {}

    public build(page: Page): InternalPage {
        const element: Element = page.build(this.elementBuilder.createElement(page.getName()));
        let cssParsed = page.getCssParsed();
        const components = page.getComponents()
            .map(c => {
                const ic = this.componentBuilder.build(c);
                console.log("Getting css for: ", ic.getCss())
                cssParsed += ic.getCss().serialize().getCss();
                return ic;
            });
        const css = this.elementBuilder.createElement("style");
        (css as HTMLElement).innerText = cssParsed;
        return new InternalPage(element, page.getName(), components, page.getId(), page.getOnRender(), new InternalCss(css));
    }
}

export default PageBuilder;