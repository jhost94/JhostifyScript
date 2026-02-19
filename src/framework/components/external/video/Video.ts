import Component, { 
    ATTR_AUTO_PLAY, 
    ATTR_CONTROLS, 
    ATTR_HEIGHT,
    ATTR_LOOP,
    ATTR_MUTED,
    ATTR_ON_ABORT
} from "../Component";

export default class Video extends Component{
    
    constructor() {
        super("video");
    }

    public autoPlay(attr?: string): string | undefined {
        return this.setAttrAndReturn(ATTR_AUTO_PLAY, attr);
    }

    public controls(attr?: string): string | undefined {
        return this.setAttrAndReturn(ATTR_CONTROLS, attr);
    }

    public height(attr?: string): string | undefined {
        return this.setAttrAndReturn(ATTR_HEIGHT, attr);
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