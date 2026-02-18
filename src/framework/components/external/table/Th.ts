import Component, { ATTR_COLSPAN } from "../Component";

export default class Th extends Component{
    
    constructor() {
        super("th");
    }

    public colspan(attr?: string): string | undefined {
        if (attr) this._attributes.set(ATTR_COLSPAN, attr);
        return this._attributes.get(ATTR_COLSPAN);
    }
}