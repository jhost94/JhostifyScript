import Component, { ATTR_AUTO_FOCUS } from "../Component";

export default class Button extends Component{
    
    constructor() {
        super("button");
    }

    public autoFocus(attr?: string): string | undefined {
        if (attr) this._attributes.set(ATTR_AUTO_FOCUS, attr);
        return this._attributes.get(ATTR_AUTO_FOCUS);
    }
}