import { 
    ATTR_FORM, 
    ATTR_HIGH,
    ATTR_LOW,
    ATTR_MAX,
    ATTR_MIN,
    ATTR_OPTIMUM,
    ATTR_VALUE
} from "../../../constants/Attributes";
import Component from "../Component";

export default class Meter extends Component{
    
    constructor() {
        super("meter");
    }

    public form(attr?: string): string | undefined {
        return this.setAttrAndReturn(ATTR_FORM, attr);
    }

    public high(attr?: string): string | undefined {
        return this.setAttrAndReturn(ATTR_HIGH, attr);
    }

    public low(attr?: string): string | undefined {
        return this.setAttrAndReturn(ATTR_LOW, attr);
    }

    public max(attr?: string): string | undefined {
        return this.setAttrAndReturn(ATTR_MAX, attr);
    }

    public min(attr?: string): string | undefined {
        return this.setAttrAndReturn(ATTR_MIN, attr);
    }

    public optimum(attr?: string): string | undefined {
        return this.setAttrAndReturn(ATTR_OPTIMUM, attr);
    }

    public value(attr?: string): string | undefined {
        return this.setAttrAndReturn(ATTR_VALUE, attr);
    }
}
