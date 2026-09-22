import { 
    ATTR_MAX, 
    ATTR_VALUE 
} from "../../../../constants/Attributes";
import Component from "../../Component";
import ID from "../../../../meta/ID";

export default class Progress extends Component{
    
    constructor(parent?: ID) {
        super("progress", parent);
    }

    public max(attr?: string): string | undefined {
        return this.setAttrAndReturn(ATTR_MAX, attr);
    }

    public value(attr?: string): string | undefined {
        return this.setAttrAndReturn(ATTR_VALUE, attr);
    }
}