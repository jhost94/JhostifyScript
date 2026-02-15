import InternalPage from '../page/internal/InternalPage.js';
import DefaultValues from '../constants/DefaultValues.js';
import Logger from '../debug/Logger.js';
import Renderer from './Renderer.js';
import ComponentRenderer from './ComponentRenderer.js';

class PageRenderer {
    private static pages: Map<string, InternalPage> = new Map();
    private static defaultCondif: boolean = true;
    //The root element, the base for all the new elements to start from. Usually document.body, but could be reconfigured
    private static re: Element; 

    public static rootElement(): Element {
        return this.re;
    }

    public static setRootElement(el: Element): Element {
        this.re = el;
        return this.re;
    }

    public static page(id: string, page: InternalPage): InternalPage {
        this.pages.set(id, page);
        return this.pages.get(id) ?? page;
    }

    public static render(id: string = DefaultValues.DEFAULT_PAGE_ID): void {
        if (!this.pages.has(id)) throw "error";
        const page = this.pages.get(id);
        Logger.log('DEBUG', ["Rendering page: ", page]);
        Renderer.renderAt(page!.get(), this.re);
        page?.getComponents().forEach(c => ComponentRenderer.render(c, page));
        page?.getOnRender().forEach(a => a());
    }

    public static refresh(): void {
        Renderer.refreshAt(this.re);
    }

    public static rerender(id: string = DefaultValues.DEFAULT_PAGE_ID): void {
        this.refresh();
        this.render(id);
    }
}

export default PageRenderer;