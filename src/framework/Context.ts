import ComponentBuilder from "./builders/ComponentBuilder";
import PageBuilder from "./builders/PageBuilder";
import Component from "./components/external/Component";
import EventConstants from "./constants/EventConstants";
import ExceptionConstants from "./exceptions/ExceptionConstants";
import GenericException from "./exceptions/GenericException";
import ElementRenderer from "./renderers/ElementRenderer";
import PageRenderer from "./renderers/PageRenderer";
import ElementVendor from "./requirements/ElementVendor";
import Router, { NavigationType } from "./router/Router";
import ID from "./meta/ID";
import Page from "./page/external/Page";

export default class Context {
    private static isInitialized: boolean = false;
    private static contextRouter: Router;
    private static contextPageRenderer: PageRenderer;
    private static contextElementRenderer: ElementRenderer;
    private static contextSystem: ContextSystem;
    private static pageBuilder: PageBuilder;
    private static componentBuilder: ComponentBuilder;
    private static _elementBuilder: ElementVendor;
    private static startUpActions: (() => void)[] = [];
    private static defaultPageName: string;


    public static router(): Router {
        this.isContextLoaded();
        return this.contextRouter;
    }

    public static pageRenderer(): PageRenderer {
        this.isContextLoaded();
        return this.contextPageRenderer;
    }

    public static elementRenderer(): ElementRenderer {
        this.isContextLoaded();
        return this.contextElementRenderer;
    }

    public static system(): ContextSystem {
        this.isContextLoaded();
        return this.contextSystem;
    }

    public static render(id: string, force?: boolean): void {
        if (force) PageRenderer.rerender(id);
        else PageRenderer.render(id);
    }

    public static renderPage(id: string): void {
        this.render(id, true);
    }

    public static renderComponent(component: Component, at?: Component | Page | ID): void {
        const internalComponent = this.componentBuilder.build(component);
        ElementRenderer.render(internalComponent.get(), at);
    }

    public static getPageBuilder(): PageBuilder {
        return this.pageBuilder;
    }
    
    public static getComponentBuilder(): ComponentBuilder {
        return this.componentBuilder;
    }

    public static rootElement(): Element {
        return PageRenderer.rootElement();
    }

    public static elementBuilder(): ElementVendor {
        return this._elementBuilder;
    }

    //TODO: Temporary, create a proper solution
    public static registerStartupAction(action: () => void): void {
        this.startUpActions.push(action);
    }

    public static navigate(id: string, navigationType?: NavigationType) {
        this.router().navigate({id, type: navigationType});
        
    }

    /**
     ******* DO NOT USE ******
     * 
     * This initializes the context, but should never be called outside of the Initializer class.
     * 
     * @param router 
     */
    static init(config: ContextConfig): void {
        //if (this.isInitialized) throw new GenericException(ExceptionConstants.CODE.BASE, "Context already initialized, aborting");
        this.isInitialized = true;
        this.initSystem();
        this.contextRouter = config.router;
        this.contextPageRenderer = config.pageRenderer;
        this.contextElementRenderer = config.elementRenderer;
        this._elementBuilder = config.elementBuilder;
        this.pageBuilder = new PageBuilder(config.elementBuilder);
        this.componentBuilder = new ComponentBuilder(config.elementBuilder);
        this.defaultPageName = config.defaultPageName;
    }

    public static runStartupActions(): void {
        this.startUpActions.forEach(a => a());
    }

    private static initSystem(): void {
        this.contextSystem = {
            repeat: function(miliseconds: number, action: () => void): NodeJS.Timer {
                return setInterval(action, miliseconds);
            },
            wait: function(miliseconds: number, action: () => void): NodeJS.Timer {
                return setTimeout(action, miliseconds);
            }
        };

        this.rootElement().addEventListener(EventConstants.LOCATION_CHANGE, ev => this.renderCurrentPage());
    }

    //TODO: FIX
    //at the moment it's just adding to the current page. fix it, but keep the functionality for the future.
    public static renderCurrentPage(): void {
        const currentPath = this.router().getCurrentPageLocation().getPath();
        const routeId = this.router().findRouteIdByPath(currentPath);
        console.log("rendering current page", currentPath, routeId);
        if (routeId) {
            this.renderPage(routeId);
        } else {
            this.renderPage(this.defaultPageName);
        }
    } 

    private static isContextLoaded(): void {
        if (!this.isInitialized) throw new GenericException(ExceptionConstants.CODE.BASE, "Context not initialized");
    }
}

export interface ContextConfig {
    router: Router;
    pageRenderer: PageRenderer;
    elementRenderer: ElementRenderer;
    pageBuilder: PageBuilder;
    componentBuilder: ComponentBuilder;
    elementBuilder: ElementVendor;
    defaultPageName: string;
}

interface ContextSystem {
    repeat: (miliseconds: number, action: () => void) => NodeJS.Timer;
    wait: (miliseconds: number, action: () => void) => NodeJS.Timer;
}
