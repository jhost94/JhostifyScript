import Component, { ATTR_AUTO_FOCUS } from "../Component";

export default class TextArea extends Component{
    
    constructor() {
        super("textarea");
    }

    public autoFocus(attr?: string): string | undefined {
        if (attr) this._attributes.set(ATTR_AUTO_FOCUS, attr);
        return this._attributes.get(ATTR_AUTO_FOCUS);
    }

    public cols(attr?: string): string | undefined {
        if (attr) this._attributes.set(ATTR_COLS, attr);
        return this._attributes.get(ATTR_COLS);
    }
}

export const ATTR_COLS: string = "cols";