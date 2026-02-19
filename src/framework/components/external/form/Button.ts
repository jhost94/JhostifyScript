import Component, { 
    ATTR_AUTO_FOCUS, 
    ATTR_DISASBLED, 
    ATTR_FORM,
    ATTR_FORMACTION,
    ATTR_NAME
} from "../Component";

export default class Button extends Component{
    
    constructor() {
        super("button");
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

    public formaction(attr?: string): string | undefined {
        return this.setAttrAndReturn(ATTR_FORMACTION, attr);
    }
    
    public name(attr?: string): string | undefined {
        return this.setAttrAndReturn(ATTR_NAME, attr);
    }
}