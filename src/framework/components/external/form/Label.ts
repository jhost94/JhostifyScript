import Component, { 
    ATTR_FOR, 
    ATTR_FORM 
} from "../Component";

export default class Label extends Component{
    
    constructor() {
        super("label");
    }

    public for(attr?: string): string | undefined {
        return this.setAttrAndReturn(ATTR_FOR, attr);
    }

    public form(attr?: string): string | undefined {
        return this.setAttrAndReturn(ATTR_FORM, attr);
    }
}