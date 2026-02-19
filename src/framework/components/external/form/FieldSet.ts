import Component, { 
    ATTR_DISASBLED, 
    ATTR_FORM,
    ATTR_NAME
} from "../Component";

export default class FieldSet extends Component{
    
    constructor() {
        super("fieldset");
    }

    public disabled(attr?: string): string | undefined {
        if (attr) this._attributes.set(ATTR_DISASBLED, attr);
        return this._attributes.get(ATTR_DISASBLED);
    }

    public form(attr?: string): string | undefined {
        return this.setAttrAndReturn(ATTR_FORM, attr);
    }

    public name(attr?: string): string | undefined {
        return this.setAttrAndReturn(ATTR_NAME, attr);
    }
}