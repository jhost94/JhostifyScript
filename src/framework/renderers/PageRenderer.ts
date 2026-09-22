import InternalPage from '../page/internal/InternalPage.js';
import DefaultValues from '../constants/DefaultValues.js';
import Logger from '../debug/Logger.js';
import Renderer from './Renderer.js';
import ComponentRenderer from './ComponentRenderer.js';
import Context from '../Context.js';

export default class PageRenderer {
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
        const page = this.pages.get(id);
        if (!page) throw "error";
        Logger.log('DEBUG', ["Rendering page: ", page]);
        const css = page.getPageCss();
        if (css) Renderer.renderAt(css.get(), this.re);
        Renderer.renderAt(page.get(), this.re);
        page.children().forEach(c => ComponentRenderer.render(c, page));
        page.getOnRender().forEach(a => a());
        
        for(let i = 0; i < page.getAfterRender().length; i++){
            const action = page.getAfterRender().pop();
            if (!!action) {
                Context.system().waitFor(0, action);
            }
        }
    }

    public static refresh(): void {
        Renderer.refreshAt(this.re);
    }

    public static rerender(id: string = DefaultValues.DEFAULT_PAGE_ID): void {
        this.refresh();
        this.render(id);
    }
}
