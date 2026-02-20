import { 
    ATTR_ACCEPT_CHARSET, 
    ATTR_ACTION, 
    ATTR_AUTO_COMPLETE,
    ATTR_ENC_TYPE,
    ATTR_METHOD,
    ATTR_NAME,
    ATTR_NO_VALIDATE,
    ATTR_REL,
    ATTR_TARGET
} from "../../../constants/Attributes";
import Component from "../Component";

export default class Form extends Component{
    
    constructor() {
        super("form");
    }

    public acceptCharset(attr?: string): string | undefined {
        return this.setAttrAndReturn(ATTR_ACCEPT_CHARSET, attr);
    }

    public action(attr?: string): string | undefined {
        return this.setAttrAndReturn(ATTR_ACTION, attr);
    }

    public autoComplete(attr?: string): string | undefined {
        return this.setAttrAndReturn(ATTR_AUTO_COMPLETE, attr);
    }

    public encType(attr?: string): string | undefined {
        return this.setAttrAndReturn(ATTR_ENC_TYPE, attr);
    }

    public method(attr?: string): string | undefined {
        return this.setAttrAndReturn(ATTR_METHOD, attr);
    }

    public name(attr?: string): string | undefined {
        return this.setAttrAndReturn(ATTR_NAME, attr);
    }
    
    public noValidate(attr?: string): string | undefined {
        return this.setAttrAndReturn(ATTR_NO_VALIDATE, attr);
    }

    public rel(attr?: string): string | undefined {
        return this.setAttrAndReturn(ATTR_REL, attr);
    }

    public target(attr?: string): string | undefined {
        return this.setAttrAndReturn(ATTR_TARGET, attr);
    }
}
