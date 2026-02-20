import { 
    ATTR_COLSPAN, 
    ATTR_HEADERS,
    ATTR_ROWSPAN
} from "../../../constants/Attributes";
import Component from "../Component";

export default class Td extends Component{
    
    constructor() {
        super("td");
    }

    public colspan(attr?: string): string | undefined {
        return this.setAttrAndReturn(ATTR_COLSPAN, attr);
    }

    public headers(attr?: string): string | undefined {
        return this.setAttrAndReturn(ATTR_HEADERS, attr);
    }

    public rowspan(attr?: string): string | undefined {
        return this.setAttrAndReturn(ATTR_ROWSPAN, attr);
    }
}