import Component, { ATTR_AUTO_COMPLETE } from "../Component";

export default class Form extends Component{
    
    constructor() {
        super("form");
    }

    public acceptCharset(attr?: string): string | undefined {
        if (attr) this._attributes.set(ATTR_ACCEPT_CHARSET, attr);
        return this._attributes.get(ATTR_ACCEPT_CHARSET);
    }

    public action(attr?: string): string | undefined {
        if (attr) this._attributes.set(ATTR_ACTION, attr);
        return this._attributes.get(ATTR_ACTION);
    }

    public autoComplete(attr?: string): string | undefined {
        if (attr) this._attributes.set(ATTR_AUTO_COMPLETE, attr);
        return this._attributes.get(ATTR_AUTO_COMPLETE);
    }
}


export const ATTR_ACCEPT_CHARSET: string = "accept-charset";
export const ATTR_ACTION: string = "action";