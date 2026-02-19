import Component, { 
    ATTR_FOR, 
    ATTR_FORM, 
    ATTR_NAME
} from "../Component";

export default class Output extends Component{
    
    constructor() {
        super("output");
    }

    public for(attr?: string): string | undefined {
        return this.setAttrAndReturn(ATTR_FOR, attr);
    }

    public form(attr?: string): string | undefined {
        return this.setAttrAndReturn(ATTR_FORM, attr);
    }

    public name(attr?: string): string | undefined {
        return this.setAttrAndReturn(ATTR_NAME, attr);
    }
}