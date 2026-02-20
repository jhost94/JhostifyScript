import { EVENT_ON_ABORT } from "../../../constants/OnEvents";
import { 
    ATTR_ALT, 
    ATTR_HEIGHT,
    ATTR_IS_MAP,
    ATTR_SIZES,
    ATTR_SRC,
    ATTR_SRC_SET,
    ATTR_USE_MAP,
    ATTR_WIDTH
} from "../../../constants/Attributes";
import Component from "../Component";

export default class Img extends Component{
    
    constructor() {
        super("img");
    }

    public alt(attr?: string): string | undefined {
        return this.setAttrAndReturn(ATTR_ALT, attr);
    }

    public height(attr?: string): string | undefined {
        return this.setAttrAndReturn(ATTR_HEIGHT, attr);
    }

    public ismap(attr?: string): string | undefined {
        return this.setAttrAndReturn(ATTR_IS_MAP, attr);
    }

    public sizes(attr?: string): string | undefined {
        return this.setAttrAndReturn(ATTR_SIZES, attr);
    }

    public src(attr?: string): string | undefined {
        return this.setAttrAndReturn(ATTR_SRC, attr);
    }

    public srcSet(attr?: string): string | undefined {
        return this.setAttrAndReturn(ATTR_SRC_SET, attr);
    }

    public useMap(attr?: string): string | undefined {
        return this.setAttrAndReturn(ATTR_USE_MAP, attr);
    }

    public width(attr?: string): string | undefined {
        return this.setAttrAndReturn(ATTR_WIDTH, attr);
    }
}
