import { 
    ATTR_COLSPAN, 
    ATTR_ROWSPAN,
    ATTR_SCOPE
} from "../../../constants/Attributes";
import Component from "../Component";

export default class Th extends Component{
    
    constructor() {
        super("th");
    }

    public colspan(attr?: string): string | undefined {
        return this.setAttrAndReturn(ATTR_COLSPAN, attr);
    }

    public rowspan(attr?: string): string | undefined {
        return this.setAttrAndReturn(ATTR_ROWSPAN, attr);
    }

    public scope(attr?: string): string | undefined {
        return this.setAttrAndReturn(ATTR_SCOPE, attr);
    }
}