import { 
    EVENT_ON_CUE_CHANGE 
} from "src/framework/constants/OnEvents";
import { 
    ATTR_DEFAULT, 
    ATTR_KIND, 
    ATTR_LABEL, 
    ATTR_SRC,
    ATTR_SRC_LANG
} from "../../../../constants/Attributes";
import Component from "../../Component";

export default class Track extends Component{
    
    constructor() {
        super("track");
    }

    public default(attr?: string): string | undefined {
        return this.setAttrAndReturn(ATTR_DEFAULT, attr);
    }
    
    public kind(attr?: string): string | undefined {
        return this.setAttrAndReturn(ATTR_KIND, attr);
    }

    public label(attr?: string): string | undefined {
        return this.setAttrAndReturn(ATTR_LABEL, attr);
    }

    public src(attr?: string): string | undefined {
        return this.setAttrAndReturn(ATTR_SRC, attr);
    }

    public srcLang(attr?: string): string | undefined {
        return this.setAttrAndReturn(ATTR_SRC_LANG, attr);
    }

    public onCueCHange(action: (e: any) => void): void {
        this._onEvents.set(EVENT_ON_CUE_CHANGE, action);
    }
}
