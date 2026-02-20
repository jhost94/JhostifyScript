import { EVENT_ON_ABORT } from "../../../constants/OnEvents";
import { 
    ATTR_AUTO_PLAY, 
    ATTR_CONTROLS,
    ATTR_LOOP,
    ATTR_MUTED,
    ATTR_PRELOAD,
    ATTR_SRC
} from "../../../constants/Attributes";
import Component from "../Component";

export default class Audio extends Component{
    
    constructor() {
        super("audio");
    }

    public autoPlay(attr?: string): string | undefined {
        return this.setAttrAndReturn(ATTR_AUTO_PLAY, attr);
    }

    public controls(attr?: string): string | undefined {
        return this.setAttrAndReturn(ATTR_CONTROLS, attr);
    }
    
    public loop(attr?: string): string | undefined {
        return this.setAttrAndReturn(ATTR_LOOP, attr);
    }
    
    public muted(attr?: string): string | undefined {
        return this.setAttrAndReturn(ATTR_MUTED, attr);
    }

    public preload(attr?: string): string | undefined {
        return this.setAttrAndReturn(ATTR_PRELOAD, attr);
    }

    public src(attr?: string): string | undefined {
        return this.setAttrAndReturn(ATTR_SRC, attr);
    }
}
