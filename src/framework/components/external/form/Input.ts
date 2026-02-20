import { 
    ATTR_ACCEPT, 
    ATTR_ALT, 
    ATTR_AUTO_COMPLETE,
    ATTR_AUTO_FOCUS,
    ATTR_CHECKED,
    ATTR_DIR_NAME,
    ATTR_DISASBLED,
    ATTR_FORM,
    ATTR_FORMACTION,
    ATTR_HEIGHT,
    ATTR_LIST,
    ATTR_MAX,
    ATTR_MAX_LENGTH,
    ATTR_MIN,
    ATTR_MULTIPLE,
    ATTR_NAME,
    ATTR_PATTERN,
    ATTR_PLACEHOLDER,
    ATTR_POPOVER_TARGET,
    ATTR_POPOVER_TARGET_ACTION,
    ATTR_READ_ONLY,
    ATTR_REQUIRED,
    ATTR_SIZE,
    ATTR_SRC,
    ATTR_STEP,
    ATTR_TYPE,
    ATTR_VALUE,
    ATTR_WIDTH
} from "../../../constants/Attributes";
import Component from "../Component";

export default class Input extends Component{
    
    constructor() {
        super("input");
    }

    public accept(attr?: string): string | undefined {
        return this.setAttrAndReturn(ATTR_ACCEPT, attr);
    }

    public alt(attr?: string): string | undefined {
        return this.setAttrAndReturn(ATTR_ALT, attr);
    }

    public autoComplete(attr?: string): string | undefined {
        return this.setAttrAndReturn(ATTR_AUTO_COMPLETE, attr);
    }

    public autoFocus(attr?: string): string | undefined {
        return this.setAttrAndReturn(ATTR_AUTO_FOCUS, attr);
    }

    public checked(attr?: string): string | undefined {
        return this.setAttrAndReturn(ATTR_CHECKED, attr);
    }

    public dirname(attr?: string): string | undefined {
        return this.setAttrAndReturn(ATTR_DIR_NAME, attr);
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

    public height(attr?: string): string | undefined {
        return this.setAttrAndReturn(ATTR_HEIGHT, attr);
    }

    public list(attr?: string): string | undefined {
        return this.setAttrAndReturn(ATTR_LIST, attr);
    }

    public max(attr?: string): string | undefined {
        return this.setAttrAndReturn(ATTR_MAX, attr);
    }
    
    public maxLength(attr?: string): string | undefined {
        return this.setAttrAndReturn(ATTR_MAX_LENGTH, attr);
    }

    public min(attr?: string): string | undefined {
        return this.setAttrAndReturn(ATTR_MIN, attr);
    }
    
    public multiple(attr?: string): string | undefined {
        return this.setAttrAndReturn(ATTR_MULTIPLE, attr);
    }

    public name(attr?: string): string | undefined {
        return this.setAttrAndReturn(ATTR_NAME, attr);
    }

    public pattern(attr?: string): string | undefined {
        return this.setAttrAndReturn(ATTR_PATTERN, attr);
    }

    public placeholder(attr?: string): string | undefined {
        return this.setAttrAndReturn(ATTR_PLACEHOLDER, attr);
    }

    public popoverTarget(attr?: string): string | undefined {
        return this.setAttrAndReturn(ATTR_POPOVER_TARGET, attr);
    }

    public popoverTargetAction(attr?: string): string | undefined {
        return this.setAttrAndReturn(ATTR_POPOVER_TARGET_ACTION, attr);
    }

    public readonly(attr?: string): string | undefined {
        return this.setAttrAndReturn(ATTR_READ_ONLY, attr);
    }

    public required(attr?: string): string | undefined {
        return this.setAttrAndReturn(ATTR_REQUIRED, attr);
    }

    public size(attr?: string): string | undefined {
        return this.setAttrAndReturn(ATTR_SIZE, attr);
    }

    public src(attr?: string): string | undefined {
        return this.setAttrAndReturn(ATTR_SRC, attr);
    }

    public step(attr?: string): string | undefined {
        return this.setAttrAndReturn(ATTR_STEP, attr);
    }

    public type(attr?: string): string | undefined {
        return this.setAttrAndReturn(ATTR_TYPE, attr);
    }

    public value(attr?: string): string | undefined {
        return this.setAttrAndReturn(ATTR_VALUE, attr);
    }

    public width(attr?: string): string | undefined {
        return this.setAttrAndReturn(ATTR_WIDTH, attr);
    }
}
