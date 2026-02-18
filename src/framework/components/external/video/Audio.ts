import Component, { ATTR_AUTO_PLAY, ATTR_CONTROLS } from "../Component";

export default class Source extends Component{
    
    constructor() {
        super("audio");
    }

    public autoPlay(attr?: string): string | undefined {
        if (attr) this._attributes.set(ATTR_AUTO_PLAY, attr);
        return this._attributes.get(ATTR_AUTO_PLAY);
    }

    public controls(attr?: string): string | undefined {
        if (attr) this._attributes.set(ATTR_CONTROLS, attr);
        return this._attributes.get(ATTR_CONTROLS);
    }
}
