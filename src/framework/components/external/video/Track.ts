import Component from "../Component";

export default class Track extends Component{
    
    constructor() {
        super("track");
    }

    public default(attr?: string): string | undefined {
        if (attr) this._attributes.set(ATTR_DEFAULT, attr);
        return this._attributes.get(ATTR_DEFAULT);
    }
}

export const ATTR_DEFAULT: string = "default";