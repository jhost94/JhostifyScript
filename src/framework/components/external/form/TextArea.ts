import { 
    ATTR_AUTO_FOCUS, 
    ATTR_COLS,
    ATTR_DIR_NAME,
    ATTR_DISASBLED,
    ATTR_FORM,
    ATTR_MAX_LENGTH,
    ATTR_NAME,
    ATTR_PLACEHOLDER,
    ATTR_READ_ONLY,
    ATTR_REQUIRED,
    ATTR_ROWS,
    ATTR_WRAP
} from "../../../constants/Attributes";
import Component from "../Component";

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

    public placeholder(attr?: string): string | undefined {
        return this.setAttrAndReturn(ATTR_PLACEHOLDER, attr);
    }

    public readonly(attr?: string): string | undefined {
        return this.setAttrAndReturn(ATTR_READ_ONLY, attr);
    }

    public required(attr?: string): string | undefined {
        return this.setAttrAndReturn(ATTR_REQUIRED, attr);
    }

    public rows(attr?: string): string | undefined {
        return this.setAttrAndReturn(ATTR_ROWS, attr);
    }

    public wrap(attr?: string): string | undefined {
        return this.setAttrAndReturn(ATTR_WRAP, attr);
    }
}
