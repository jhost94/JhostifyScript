import InitialConfiguration, { ConfigurationOptions } from "./framework/Configuration.js";
import Context from "./framework/Context.js";
import Initializer from "./framework/Initializer.js";
import Navigation from "./framework/router/Navigator.js";
import Route from "./framework/router/Route.js";
import Router from "./framework/router/Router.js";
import Routes from "./framework/router/Routes.js";
import LandingPage from "./index/pages/LandingPage.js";
import TestPage from "./index/pages/TestPage.js";

const id = setInterval(() => {if (docReady() && dependeciesReady()) stop()}, 0);

function docReady(): boolean {
    return document.readyState === 'interactive' || document.readyState == 'complete';
}

function stop() {
    clearInterval(id);
    render();
}

function dependeciesReady(): boolean {
    return requireReady();
}

function requireReady(): boolean {
    return require !== undefined/* && define !== undefined*/;
}

function render(): void {
    const body = document.body;

    const landingPageName = "landingPage"
    // const landingPage = new Page(landingPageName);
    const landingPage = new LandingPage();
    // Pages
    const testPage = new TestPage();
    // Routes
    // const testRoute = new Route("/test", testPage);
    const routes = new Routes();
    routes.setRoute(new Route('/test', testPage));
    routes.setRoute(new Route('/', landingPage));
    // Config
    const configOptions: ConfigurationOptions = {
        notFoundPage: landingPage,
        defaultPage: landingPage,
        // Do I need a page name? isn't that in the page itself?
        defaultPageName: landingPageName,
        logLevel: 'DEBUG'
    }
    const frameworkConfig = new InitialConfiguration(document, configOptions);
    const router = new Router(window.history, window.navigator, document.location, routes);
    
    Initializer.configure(frameworkConfig, router, body);
    
    //TODO: make sure pages is registered in PageRenderer class
    
    Initializer.init();
    Context.system().wait(1000, () => {
            Context.render(Initializer.config().defaultPageName);
        });
}

//TODO LIST:
// - REMOVE REQUIREJS AND INTRODUCE CUSTOM AMD LOADER
