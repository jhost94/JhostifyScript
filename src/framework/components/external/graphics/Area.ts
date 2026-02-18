import Component, { ATTR_ALT } from "../Component";

export default class Area extends Component{
    
    constructor() {
        super("area");
    }

    public alt(attr?: string): string | undefined {
        if (attr) this._attributes.set(ATTR_ALT, attr);
        return this._attributes.get(ATTR_ALT);
    }

    public coords(attr?: string): string | undefined {
        if (attr) this._attributes.set(ATTR_COORDS, attr);
        return this._attributes.get(ATTR_COORDS);
    }
}

export const ATTR_COORDS: string = "coords";