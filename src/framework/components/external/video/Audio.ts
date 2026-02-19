import Component, { 
    ATTR_AUTO_PLAY, 
    ATTR_CONTROLS, 
    ATTR_LOOP, 
    ATTR_MUTED,
    ATTR_ON_ABORT
} from "../Component";

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
    
    public loop(attr?: string): string | undefined {
        return this.setAttrAndReturn(ATTR_LOOP, attr);
    }
    
    public muted(attr?: string): string | undefined {
        return this.setAttrAndReturn(ATTR_MUTED, attr);
    }

    public onAbort(attr?: string): string | undefined {
        return this.setAttrAndReturn(ATTR_ON_ABORT, attr);
    }
}
