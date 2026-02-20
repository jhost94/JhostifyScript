import { 
    ATTR_DISASBLED, 
    ATTR_LABEL, 
    ATTR_SELECTED,
    ATTR_VALUE
} from "../../../constants/Attributes";
import Component from "../Component";

export default class Option extends Component{
    
    constructor() {
        super("option");
    }

    public disabled(attr?: string): string | undefined {
        return this.setAttrAndReturn(ATTR_DISASBLED, attr);
    }
    
    public label(attr?: string): string | undefined {
        return this.setAttrAndReturn(ATTR_LABEL, attr);
    }

    public selected(attr?: string): string | undefined {
        return this.setAttrAndReturn(ATTR_SELECTED, attr);
    }

    public value(attr?: string): string | undefined {
        return this.setAttrAndReturn(ATTR_VALUE, attr);
    }
}