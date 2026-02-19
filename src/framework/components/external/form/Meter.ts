import Component, { 
    ATTR_FORM, 
    ATTR_MAX,
    ATTR_MIN
} from "../Component";

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
}

export const ATTR_HIGH: string = "high";
export const ATTR_LOW: string = "low";