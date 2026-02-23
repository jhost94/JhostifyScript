import Component from "../../components/external/Component.js";
import ID from "../../../framework/meta/ID.js";
import Random from "../../../utils/Random.js";
import Css from "../../components/external/Css.js";

class Page implements ID {
    protected doOnRender: (() => void)[] = [];

    constructor(
        protected name: string = '', 
        protected components: Component[] = [], 
        protected css: Css = new Css(),
        private id: string = Random.randomUUID()
    ) {
        
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

    public getId(): string {
        return this.id;
    }

    public getCss(): Css {
        return this.css;
    }

    public getCssParsed(): string {
        return this.getCss().getCss();
    }
}

export default Page;