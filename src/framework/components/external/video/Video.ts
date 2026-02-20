import { EVENT_ON_ABORT } from "../../../constants/OnEvents";
import { 
    ATTR_AUTO_PLAY, 
    ATTR_CONTROLS,
    ATTR_HEIGHT,
    ATTR_LOOP,
    ATTR_MUTED,
    ATTR_POSTER,
    ATTR_PRELOAD,
    ATTR_SRC,
    ATTR_WIDTH
} from "../../../constants/Attributes";
import Component from "../Component";

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

    public poster(attr?: string): string | undefined {
        return this.setAttrAndReturn(ATTR_POSTER, attr);
    }
    
    public preload(attr?: string): string | undefined {
        return this.setAttrAndReturn(ATTR_PRELOAD, attr);
    }

    public src(attr?: string): string | undefined {
        return this.setAttrAndReturn(ATTR_SRC, attr);
    }

    public width(attr?: string): string | undefined {
        return this.setAttrAndReturn(ATTR_WIDTH, attr);
    }
}