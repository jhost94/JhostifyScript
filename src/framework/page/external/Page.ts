import Component from "../../components/external/Component.js";
import ID from "../../../framework/meta/ID.js";
import Random from "../../../utils/Random.js";

class Page implements ID {
    protected doOnRender: (() => void)[] = [];

    constructor(protected name: string = '', protected components: Component[] = [], private id: string = Random.randomUUID()) {
        
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
}

export default Page;