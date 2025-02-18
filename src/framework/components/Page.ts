import Component from "./Component.js";

class Page {

    constructor(protected name: string = '', protected template: string = '', protected components: Component[] = []) {
    }

    public getTemplate(): string {
        return this.template;
    }

    public getComponents(): Component[] {
        return this.components;
    }

    public getName(): string {
        return this.name;
    }
}

export default Page;