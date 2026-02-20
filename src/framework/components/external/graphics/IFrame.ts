import { 
    ATTR_HEIGHT, 
    ATTR_NAME, 
    ATTR_SANDBOX,
    ATTR_SRC,
    ATTR_SRC_DOC,
    ATTR_WIDTH
} from "../../../constants/Attributes";
import Component from "../Component";

export default class IFrame extends Component{
    
    constructor() {
        super("iframe");
    }

    public height(attr?: string): string | undefined {
        return this.setAttrAndReturn(ATTR_HEIGHT, attr);
    }

    public name(attr?: string): string | undefined {
        return this.setAttrAndReturn(ATTR_NAME, attr);
    }

    public sandbox(attr?: string): string | undefined {
        return this.setAttrAndReturn(ATTR_SANDBOX, attr);
    }

    public src(attr?: string): string | undefined {
        return this.setAttrAndReturn(ATTR_SRC, attr);
    }

    public srcDoc(attr?: string): string | undefined {
        return this.setAttrAndReturn(ATTR_SRC_DOC, attr);
    }

    public width(attr?: string): string | undefined {
        return this.setAttrAndReturn(ATTR_WIDTH, attr);
    }
}