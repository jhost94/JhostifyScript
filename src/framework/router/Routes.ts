import Route from "./Route";


class Routes {

    private routes: Map<string, Route> = new Map;

    constructor() {

    }

    public setRoute(route: Route) {
        // TODO: get a better id for map
        this.routes.set(route.getPage().getName(), route);
    }

    public getRoutes(): Map<string, Route> {
        return this.routes;
    }
}

export default Routes;