import { 
    ATTR_AUTO_FOCUS, 
    ATTR_DISASBLED,
    ATTR_FORM,
    ATTR_MULTIPLE,
    ATTR_NAME,
    ATTR_REQUIRED,
    ATTR_SIZE
} from "../../../constants/Attributes";
import Component from "../Component";

export default class Select extends Component{
    
    constructor() {
        super("select");
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

    public multiple(attr?: string): string | undefined {
        return this.setAttrAndReturn(ATTR_MULTIPLE, attr);
    }

    public name(attr?: string): string | undefined {
        return this.setAttrAndReturn(ATTR_NAME, attr);
    }

    public required(attr?: string): string | undefined {
        return this.setAttrAndReturn(ATTR_REQUIRED, attr);
    }

    public size(attr?: string): string | undefined {
        return this.setAttrAndReturn(ATTR_SIZE, attr);
    }
}