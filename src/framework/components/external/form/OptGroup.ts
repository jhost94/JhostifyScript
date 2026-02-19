import Component, { 
    ATTR_DISASBLED, 
    ATTR_LABEL
} from "../Component";

export default class OptGroup extends Component{
    
    constructor() {
        super("optgroup");
    }

    public disabled(attr?: string): string | undefined {
        return this.setAttrAndReturn(ATTR_DISASBLED, attr);
    }

    public label(attr?: string): string | undefined {
        return this.setAttrAndReturn(ATTR_LABEL, attr);
    }
}