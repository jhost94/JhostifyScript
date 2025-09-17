import Objects from "src/utils/Objects.js";
import PageLocation from "./PageLocation.js";
import Route from "./Route.js";
import Routes from "./Routes.js";

export default class Router {
    private interval: number = 0;

    constructor(private navigation: History, 
                private navigator: Navigator, 
                private location: Location, 
                private internalRoutes: Routes = new Routes(), 
                private externalRoutes: Routes = new Routes()) {
    }

    public navigate(navigationOption: NavigationOption): void {
        if (!navigationOption.type) navigationOption.type = "INTERNAL";
        switch(navigationOption.type) {
            case "INTERNAL": 
                this.navigateInternal(navigationOption.id);
                break;
            case "EXTERNAL": 
                this.navigateExternal(navigationOption.id);
                break;
            default:
                throw `Unallowed NaviagtionType ${navigationOption.type}`
        }
    }

    public addInternalRoute(route: Route): void {
        this.internalRoutes.setRoute(route);
    }

    public addExternalRoute(id: string, route: Route): void {
        this.externalRoutes.setRoute(route);
    }

    public findRouteIdByPath(path: string): string | null{
        const internalRoute = this.findInternalRouteIdByPath(path);
        if (Objects.nonNull(internalRoute)) return internalRoute;
        return this.findExternalRouteIdByPath(path);
    }

    private findInternalRouteIdByPath(path: string): string | null {
        let route: string | null = null;
        this.internalRoutes.getRoutes().forEach((r, k) => {
            // Optimize, because this will always iterate over the entire map
            if (r.pathMatches(path) && Objects.isNull(route)) route = k; 
        });

        return route;
    }

    private findExternalRouteIdByPath(path: string): string | null{
        let route: string | null = null;
        this.internalRoutes.getRoutes().forEach((r, k) => {
            // Optimize, because this will always iterate over the entire map
            if (r.pathMatches(path) && Objects.isNull(route)) route = k;
        });

        return route;
    }
    
    private navigateInternal(id: string): void {
        const route = this.internalRoutes.getRoutes().get(id);
        if (!route) throw "This route does not exist. TODO FIX EXCEPTION";
        this.navigation.pushState({}, route?.getPage().getName(), route.url());
    }

    private navigateExternal(id: string): void {

    }
    

    /**
     * Getters
     */
    
    public getClipboard(): Clipboard {
        return this.navigator.clipboard;
    }

    public getCurrentUrl(): string {
        return this.location.href;
    }

    public async getClipboardText(): Promise<string> {
        try {
            return await this.navigator.clipboard.readText();
        } catch (error) {
            console.error(error);
            return "";
        }
    }

    public getBrowserLang(): string {
        return this.navigator.language;
    }

    public getBrowerLangs(): readonly string[] {
        return this.navigator.languages;
    }

    public getCurrentPageLocation(): PageLocation {
        return new PageLocation(this.location.origin, this.location.pathname.substring(1));
    }

    public getInternalRoutes(): Routes {
        return this.internalRoutes;
    }
    
    public getExternalRoutes(): Routes {
        return this.externalRoutes;
    }
}

export interface NavigationOption {
    type: NavigationType | undefined,
    id: string
}

export type NavigationType = "INTERNAL" | "EXTERNAL";
