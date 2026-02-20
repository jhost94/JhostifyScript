import { 
    ATTR_CITE, 
    ATTR_DATE_TIME
} from "../../../constants/Attributes";
import Component from "../Component";

export default class Ins extends Component{
    
    constructor() {
        super("ins");
    }

    public cite(attr?: string): string | undefined {
        return this.setAttrAndReturn(ATTR_CITE, attr);
    }

    public dateTime(attr?: string): string | undefined {
        return this.setAttrAndReturn(ATTR_DATE_TIME, attr);
    }
}
