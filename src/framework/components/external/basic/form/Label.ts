import { 
    ATTR_FOR, 
    ATTR_FORM 
} from "../../../../constants/Attributes";
import Component from "../../Component";
import ID from "../../../../meta/ID";

export default class Label extends Component{
    
    constructor(parent?: ID) {
        super("label", parent);
    }

    public for(attr?: string): string | undefined {
        return this.setAttrAndReturn(ATTR_FOR, attr);
    }

    public form(attr?: string): string | undefined {
        return this.setAttrAndReturn(ATTR_FORM, attr);
    }
}