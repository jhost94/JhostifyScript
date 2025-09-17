import Component from "./Component.js";

class Page {
    protected doOnRender: (() => void)[] = [];

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

    public getOnRender(): (() => void)[] {
        return this.doOnRender;
    }
}

export default Page;