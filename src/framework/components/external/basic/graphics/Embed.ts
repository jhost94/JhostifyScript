import { 
    EVENT_ON_ABORT, 
    EVENT_ON_CAN_PLAY,
    EVENT_ON_ERROR
} from "../../../../constants/OnEvents";
import { 
    ATTR_HEIGHT,
    ATTR_SRC,
    ATTR_TYPE,
    ATTR_WIDTH
} from "../../../../constants/Attributes";
import Component from "../../Component";

export default class Embed extends Component{
    
    constructor() {
        super("embed");
    }

    public height(attr?: string): string | undefined {
        return this.setAttrAndReturn(ATTR_HEIGHT, attr);
    }
    
    public src(attr?: string): string | undefined {
        return this.setAttrAndReturn(ATTR_SRC, attr);
    }

    public type(attr?: string): string | undefined {
        return this.setAttrAndReturn(ATTR_TYPE, attr);
    }

    public width(attr?: string): string | undefined {
        return this.setAttrAndReturn(ATTR_WIDTH, attr);
    }

    public onAbort(action: (e: any) => void): void {
        this._onEvents.set(EVENT_ON_ABORT, action);
    }

    public onCanPlay(action: (e: any) => void): void {
        this._onEvents.set(EVENT_ON_CAN_PLAY, action);
    }

    public onError(action: (e: any) => void): void {
        this._onEvents.set(EVENT_ON_ERROR, action);
    }
}