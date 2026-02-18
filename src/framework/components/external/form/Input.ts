import Component, { 
    ATTR_ALT, 
    ATTR_AUTO_COMPLETE, 
    ATTR_AUTO_FOCUS
} from "../Component";

export default class Input extends Component{
    
    constructor() {
        super("input");
    }

    public accept(attr?: string): string | undefined {
        if (attr) this._attributes.set(ATTR_ACCEPT, attr);
        return this._attributes.get(ATTR_ACCEPT);
    }

    public alt(attr?: string): string | undefined {
        if (attr) this._attributes.set(ATTR_ALT, attr);
        return this._attributes.get(ATTR_ALT);
    }

    public autoComplete(attr?: string): string | undefined {
        if (attr) this._attributes.set(ATTR_AUTO_COMPLETE, attr);
        return this._attributes.get(ATTR_AUTO_COMPLETE);
    }

    public autoFocus(attr?: string): string | undefined {
        if (attr) this._attributes.set(ATTR_AUTO_FOCUS, attr);
        return this._attributes.get(ATTR_AUTO_FOCUS);
    }

    public checked(attr?: string): string | undefined {
        if (attr) this._attributes.set(ATTR_CHECKED, attr);
        return this._attributes.get(ATTR_CHECKED);
    }
}

export const ATTR_ACCEPT: string = "accept";
export const ATTR_CHECKED: string = "checked";