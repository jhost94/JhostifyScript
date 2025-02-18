class Component {
    
    constructor(protected name: string = '', protected template: string = '') {

    }

    public getTemplate(): string {
        return this.template;
    }

    public getName(): string {
        return this.name;
    }
}

export default Component;