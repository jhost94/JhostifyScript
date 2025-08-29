import Objects from "../utils/Objects.js";
import InitialConfiguration, { Configuration } from "./Configuration.js";
import Router from "./router/Router.js";
import PageRenderer from "./renderers/PageRenderer.js";
import PageBuilder from "./builders/PageBuilder.js";
import ComponentBuilder from "./builders/ComponentBuilder.js";
import InternalPage from "./components/internal/InternalPage.js";
import Logger from "./debug/Logger.js";
import Context from "./Context.js";
import ElementRenderer from "./renderers/ElementRenderer.js";
import GenericException from "./exceptions/GenericException.js";
import ExceptionConstants from "./exceptions/ExceptionConstants.js";

class Initializer {
    private static configuration: InitialConfiguration;
    private static isRunning: boolean = false;
    private static router: Router;
    private static currentPageBeingRendered: string | null = null;
    private static pageBuilder: PageBuilder;
    private static componentBuilder: ComponentBuilder;

    public static configure(config: InitialConfiguration, router: Router, rootElement: Element): void {
        if (Objects.nonNull(this.configuration)) throw new GenericException(ExceptionConstants.CODE.BASE, "Initial configuration already done.");
        this.configuration = config;
        this.router = router;
        this.componentBuilder = new ComponentBuilder(config.getElementBuilder());
        this.pageBuilder = new PageBuilder(config.getElementBuilder());
        PageRenderer.rootElement(rootElement);
        this.addPagesByRoutes();
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
        Logger.init(this.config().logLevel);
        Context.init({router: this.router, pageRenderer: PageRenderer, elementRenderer: ElementRenderer});
        this.renderCurrentPage();
    }

    public static running(): boolean {
        return this.isRunning;
    }

    public static config(): Configuration {
        return this.configuration.getConfig();
    }

    public static render(id: string): void {
        PageRenderer.rerender(id);
        this.currentPageBeingRendered = id;
    }

    public static getPageBuilder(): PageBuilder {
        return this.pageBuilder;
    }

    public static getComponentBuilder(): ComponentBuilder {
        return this.componentBuilder;
    }

    private static renderCurrentPage(): void {
        const currentPath = Initializer.router.getCurrentPageLocation().getPath();
        const routeId = Initializer.router.findRouteIdByPath(currentPath);
        Logger.log('DEBUG', ["route id", routeId?.length])
        if (routeId) {
            this.render(routeId);
        } else {
            this.render(this.configuration.getConfig().defaultPageName);
        }
    } 

    private static addPagesByRoutes(): void {
        PageRenderer.page("/", this.configuration.get("defaultPage") as InternalPage);
        this.router.getInternalRoutes().getRoutes().forEach((v, k) => {
            PageRenderer.page(k, Initializer.getPageBuilder().build(v.getPage()));
        });
    }
}

export default Initializer;