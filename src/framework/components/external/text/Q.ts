import Component, { ATTR_CITE } from "../Component";

export default class Q extends Component{
    
    constructor() {
        super("q");
    }

    public cite(attr?: string): string | undefined {
        if (attr) this._attributes.set(ATTR_CITE, attr);
        return this._attributes.get(ATTR_CITE);
    }
}
