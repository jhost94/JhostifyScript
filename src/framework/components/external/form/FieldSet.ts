import { 
    ATTR_DISASBLED, 
    ATTR_FORM, 
    ATTR_NAME 
} from "../../../constants/Attributes";
import Component from "../Component";

export default class FieldSet extends Component{
    
    constructor() {
        super("fieldset");
    }

    public disabled(attr?: string): string | undefined {
        return this.setAttrAndReturn(ATTR_DISASBLED, attr);
    }

    public form(attr?: string): string | undefined {
        return this.setAttrAndReturn(ATTR_FORM, attr);
    }

    public name(attr?: string): string | undefined {
        return this.setAttrAndReturn(ATTR_NAME, attr);
    }
}