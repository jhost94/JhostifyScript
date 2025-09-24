import ID from "../../../framework/meta/ID";
import Random from "../../../utils/Random";

export default class Component implements ID{
    
    constructor(protected name: string = '', protected template: string = '', private id: string = Random.randomUUID()) {

    }
    
    public getId(): string {
        return this.id;
    }

    public getTemplate(): string {
        return this.template;
    }

    public getName(): string {
        return this.name;
    }
}
