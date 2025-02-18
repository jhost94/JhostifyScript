import Initializer from "./Initializer";
import Logger from "./debug/Logger";
import ElementRenderer from "./renderers/ElementRenderer";
import PageRenderer from "./renderers/PageRenderer";
import Router from "./router/Router";

class Context {
    private static isInitialized: boolean = false;
    private static contextRouter: Router;
    private static contextPageRenderer: PageRenderer;
    private static contextElementRenderer: ElementRenderer;
    private static contextSystem: ContextSystem;
    private static timesLoaded = 0;


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

    public static render(id: string): void {
        Initializer.render(id);
    }

    /**
     ******* DO NOT USE ******
     * 
     * This initializes the context, but should never be called outside of the Initializer class.
     * 
     * @param router 
     */
    static init(config: ContextConfig): void {
        // shouldn't be loading more than once, however it is.
        // try figure out why
        Logger.log('INFO', ["times inited context:", ++this.timesLoaded]);
        //if (this.isInitialized) throw new GenericException(ExceptionConstants.CODE.BASE, "Context already initialized, aborting");
        this.isInitialized = true;
        this.initSystem();
        this.contextRouter = config.router;
        this.contextPageRenderer = config.pageRenderer;
        this.contextElementRenderer = config.elementRenderer;
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
    }

    private static isContextLoaded(): void {
        if (!this.isInitialized) throw new GenericException(ExceptionConstants.CODE.BASE, "Context not initialized");
    }
}

interface ContextConfig {
    router: Router;
    pageRenderer: PageRenderer;
    elementRenderer: ElementRenderer;
}

interface ContextSystem {
    repeat: (miliseconds: number, action: () => void) => NodeJS.Timer;
    wait: (miliseconds: number, action: () => void) => NodeJS.Timer;
}

export default Context;