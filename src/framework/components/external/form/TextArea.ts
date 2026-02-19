import Component, { 
    ATTR_AUTO_FOCUS, 
    ATTR_DIR_NAME, 
    ATTR_DISASBLED,
    ATTR_FORM,
    ATTR_MAX_LENGTH,
    ATTR_NAME
} from "../Component";

export default class TextArea extends Component{
    
    constructor() {
        super("textarea");
    }

    public autoFocus(attr?: string): string | undefined {
        return this.setAttrAndReturn(ATTR_AUTO_FOCUS, attr);
    }

    public cols(attr?: string): string | undefined {
        return this.setAttrAndReturn(ATTR_COLS, attr);
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

    public maxLength(attr?: string): string | undefined {
        return this.setAttrAndReturn(ATTR_MAX_LENGTH, attr);
    }

    public name(attr?: string): string | undefined {
        return this.setAttrAndReturn(ATTR_NAME, attr);
    }
}

export const ATTR_COLS: string = "cols";