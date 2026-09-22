import { 
    ATTR_DISASBLED, 
    ATTR_LABEL 
} from "../../../../constants/Attributes";
import Component from "../../Component";
import ID from "../../../../meta/ID";

export default class OptGroup extends Component {
    
    constructor(parent?: ID) {
        super("optgroup", parent);
    }

    public disabled(attr?: string): string | undefined {
        return this.setAttrAndReturn(ATTR_DISASBLED, attr);
    }

    public label(attr?: string): string | undefined {
        return this.setAttrAndReturn(ATTR_LABEL, attr);
    }
}