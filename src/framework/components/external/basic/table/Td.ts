import { 
    ATTR_COLSPAN, 
    ATTR_HEADERS,
    ATTR_ROWSPAN
} from "../../../../constants/Attributes";
import Component from "../../Component";
import ID from "../../../../meta/ID";

export default class Td extends Component{
    
    constructor(parent?: ID) {
        super("td", parent);
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