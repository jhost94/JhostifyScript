import { 
    ATTR_AUTO_FOCUS, 
    ATTR_DISASBLED, 
    ATTR_FORM, 
    ATTR_FORMACTION, 
    ATTR_NAME, 
    ATTR_POPOVER_TARGET,
    ATTR_POPOVER_TARGET_ACTION,
    ATTR_TYPE,
    ATTR_VALUE
} from "../../../constants/Attributes";
import Component from "../Component";

export default class Button extends Component{
    
    constructor() {
        super("button");
    }

    public autoFocus(attr?: string): string | undefined {
        return this.setAttrAndReturn(ATTR_AUTO_FOCUS, attr);
    }

    public disabled(attr?: string): string | undefined {
        return this.setAttrAndReturn(ATTR_DISASBLED, attr);
    }

    public form(attr?: string): string | undefined {
        return this.setAttrAndReturn(ATTR_FORM, attr);
    }

    public formaction(attr?: string): string | undefined {
        return this.setAttrAndReturn(ATTR_FORMACTION, attr);
    }
    
    public name(attr?: string): string | undefined {
        return this.setAttrAndReturn(ATTR_NAME, attr);
    }

    public popoverTarget(attr?: string): string | undefined {
        return this.setAttrAndReturn(ATTR_POPOVER_TARGET, attr);
    }

    public popoverTargetAction(attr?: string): string | undefined {
        return this.setAttrAndReturn(ATTR_POPOVER_TARGET_ACTION, attr);
    }

    public type(attr?: string): string | undefined {
        return this.setAttrAndReturn(ATTR_TYPE, attr);
    }

    public value(attr?: string): string | undefined {
        return this.setAttrAndReturn(ATTR_VALUE, attr);
    }
}
