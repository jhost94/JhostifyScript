import Component, { 
    ATTR_ALT, 
    ATTR_AUTO_COMPLETE, 
    ATTR_AUTO_FOCUS,
    ATTR_DIR_NAME,
    ATTR_DISASBLED,
    ATTR_FORM,
    ATTR_FORMACTION,
    ATTR_HEIGHT,
    ATTR_MAX,
    ATTR_MAX_LENGTH,
    ATTR_MIN,
    ATTR_MULTIPLE,
    ATTR_NAME
} from "../Component";

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
}

export const ATTR_ACCEPT: string = "accept";
export const ATTR_CHECKED: string = "checked";
export const ATTR_LIST: string = "list";
