import { 
    ATTR_CITE, 
    ATTR_DATE_TIME 
} from "../../../constants/Attributes";
import Component from "../Component";

export default class Del extends Component{
    
    constructor() {
        super("del");
    }

    public cite(attr?: string): string | undefined {
        return this.setAttrAndReturn(ATTR_CITE, attr);
    }

    public dateTime(attr?: string): string | undefined {
        return this.setAttrAndReturn(ATTR_DATE_TIME, attr);
    }
}
