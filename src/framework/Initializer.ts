import Objects from "../utils/Objects.js";
import InitialConfiguration, { Configuration } from "./Configuration.js";
import Router from "./router/Router.js";
import PageRenderer from "./renderers/PageRenderer.js";
import PageBuilder from "./builders/PageBuilder.js";
import ComponentBuilder from "./builders/ComponentBuilder.js";
import InternalPage from "./page/internal/InternalPage.js";
import Logger from "./debug/Logger.js";
import Context, { ContextConfig } from "./Context.js";
import ElementRenderer from "./renderers/ElementRenderer.js";
import GenericException from "./exceptions/GenericException.js";
import ExceptionConstants from "./exceptions/ExceptionConstants.js";


export default class Initializer {
    private static configuration: InitialConfiguration;
    private static isRunning: boolean = false;
    private static router: Router;
    private static currentPageBeingRendered: string | null = null;
    

    public static configure(config: InitialConfiguration, router: Router, rootElement: Element): void {
        Logger.init(config.getConfig().logLevel);
        if (Objects.nonNull(this.configuration)) throw new GenericException(ExceptionConstants.CODE.BASE, "Initial configuration already done.");
        this.configuration = config;
        this.router = router;
        PageRenderer.setRootElement(rootElement);
        ElementRenderer.setRootElement(rootElement);
    }

    public static updateConfig(name: keyof Configuration, value: any): void {
        if (Objects.diferentType(this.configuration.get(name), value)) throw new GenericException(ExceptionConstants.CODE.BASE, "Diferent type of config value");
        this.configuration.set(name, value);
    }

    /**
     * Init initializes the application and creates a context.
     * This context is used everywhere on the app.
     * TODO:
     *      - Create said context.
     *      - Optimize context, it might be too heavy on bigger apps
     */
    public static init(): void {
        if (this.running()) throw new GenericException(ExceptionConstants.CODE.BASE, "Application already running");
        if (Objects.isNull(this.configuration)) throw new GenericException(ExceptionConstants.CODE.BASE, "Initial configuration not set");
        Context.init(this.buildContextConfig());
        this.addPagesByRoutes();
        Context.runStartupActions();
        this.renderCurrentPage();
    }

    public static running(): boolean {
        return this.isRunning;
    }

    public static config(): Configuration {
        return this.configuration.getConfig();
    }

    private static buildContextConfig(): ContextConfig {
        return {
            router: this.router, 
            pageRenderer: PageRenderer, 
            elementRenderer: ElementRenderer,
            componentBuilder: new ComponentBuilder(this.configuration.getElementBuilder()),
            pageBuilder: new PageBuilder(this.configuration.getElementBuilder()),
            elementBuilder: this.configuration.getElementBuilder(),
            defaultPageName:this.configuration.getConfig().defaultPageName
        };
    }

    private static renderCurrentPage(): void {
        Context.renderCurrentPage();
    } 

    private static addPagesByRoutes(): void {
        PageRenderer.page("/", this.configuration.get("defaultPage") as InternalPage);
        this.router.getInternalRoutes().getRoutes().forEach((v, k) => {
            PageRenderer.page(k, Context.getPageBuilder().build(v.getPage()));
        });
    }
}
