import { EVENT_ON_ABORT } from "../../../constants/OnEvents";
import { 
    ATTR_HEIGHT,
    ATTR_SRC,
    ATTR_TYPE,
    ATTR_WIDTH
} from "../../../constants/Attributes";
import Component from "../Component";

export default class Embed extends Component{
    
    constructor() {
        super("embed");
    }

    public height(attr?: string): string | undefined {
        return this.setAttrAndReturn(ATTR_HEIGHT, attr);
    }
    
    public onAbort(attr?: string): string | undefined {
        return this.setAttrAndReturn(EVENT_ON_ABORT, attr);
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
}