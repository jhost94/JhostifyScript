import { 
    ATTR_MEDIA, 
    ATTR_SIZES, 
    ATTR_SRC,
    ATTR_SRC_SET,
    ATTR_TYPE
} from "../../../constants/Attributes";
import Component from "../Component";

export default class Source extends Component{
    
    constructor() {
        super("source");
    }

    public media(attr?: string): string | undefined {
        return this.setAttrAndReturn(ATTR_MEDIA, attr);
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

    public type(attr?: string): string | undefined {
        return this.setAttrAndReturn(ATTR_TYPE, attr);
    }
}