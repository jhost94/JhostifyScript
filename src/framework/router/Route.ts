import Page from "../components/Page.js";
import { Navigatable } from "./Navigator.js";

class Route {

    constructor(private path: string, private page: Page) {

    }

    public url(): string {
        return this.path.startsWith('/') ?
            this.path
            : '/' + this.path;
    }

    public pathMatches(givenPath: string): boolean {
        const sanitizedPath = this.path.startsWith('/') ?
            this.path.substring(1)
            : this.path;
        const sanitizedGivenPath = givenPath.startsWith('/') ?
            givenPath.substring(1)
            : givenPath;

        //TODO: check regexes for variables
        return sanitizedPath == sanitizedGivenPath;
    }

    /**
     * Getters
     */

    public getPage(): Page {
        return this.page;
    }
}

export default Route;