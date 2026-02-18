import Component, { ATTR_ALT } from "../Component";

export default class Img extends Component{
    
    constructor() {
        super("img");
    }

    public alt(attr?: string): string | undefined {
        if (attr) this._attributes.set(ATTR_ALT, attr);
        return this._attributes.get(ATTR_ALT);
    }
}
