import { 
    ATTR_CITE, 
    ATTR_DATE_TIME
} from "../../../../constants/Attributes";
import Component from "../../Component";
import ID from "../../../../meta/ID";

export default class Ins extends Component{
    
    constructor(parent?: ID) {
        super("ins", parent);
    }

    public cite(attr?: string): string | undefined {
        return this.setAttrAndReturn(ATTR_CITE, attr);
    }

    public dateTime(attr?: string): string | undefined {
        return this.setAttrAndReturn(ATTR_DATE_TIME, attr);
    }
}
